/*
 * @Author: yzy
 * @Date: 2025-08-16 13:26:27
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-16 14:26:10
 * @Description: 增强版移动访问助手，解决IP获取问题（ES模块版本）
 */

// 使用 ES 模块导入语法替换 require()
import qrcode from 'qrcode-terminal'
import os from 'os'
import { exec } from 'child_process'

// 获取有效本地 IP 地址（修复版本）
function getLocalIP() {
  const interfaces = os.networkInterfaces()
  const validIPs = []

  // 收集所有有效 IPv4 地址
  for (const name of Object.keys(interfaces)) {
    // 跳过虚拟接口和回环接口
    if (name.includes('Virtual') || name.includes('Loopback')) continue

    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        validIPs.push({
          address: iface.address,
          interface: name,
          isWifi: name.toLowerCase().includes('wi-fi') || name.toLowerCase().includes('wlan'),
        })
      }
    }
  }

  // 优先选择 WiFi 接口
  const wifiIP = validIPs.find((ip) => ip.isWifi)
  if (wifiIP) return wifiIP.address

  // 其次选择以太网接口
  const ethernetIP = validIPs.find(
    (ip) =>
      ip.interface.toLowerCase().includes('eth') || ip.interface.toLowerCase().includes('ethernet'),
  )
  if (ethernetIP) return ethernetIP.address

  // 最后返回第一个找到的 IP
  if (validIPs.length > 0) return validIPs[0].address

  return 'localhost'
}

// 获取当前端口号（从环境变量或进程参数中）
function getPort() {
  // 尝试从环境变量获取
  if (process.env.PORT) return parseInt(process.env.PORT)

  // 尝试从进程参数获取
  const portArg = process.argv.find((arg) => arg.startsWith('--port='))
  if (portArg) return parseInt(portArg.split('=')[1])

  // 默认端口
  return 5173
}

// 检测 IP 是否可访问
function checkIPAccess(ip, callback) {
  const pingCommand = process.platform === 'win32' ? `ping -n 1 ${ip}` : `ping -c 1 ${ip}`

  exec(pingCommand, (error) => {
    callback(!error)
  })
}

// 显示网络诊断信息
function showNetworkDiagnostics(ip) {
  console.log('\n🔧 网络诊断:')

  // 显示所有网络接口
  console.log('📶 网络接口:')
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    interfaces[name].forEach((iface) => {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`  - ${name}: ${iface.address} (${iface.internal ? '内部' : '外部'})`)
      }
    })
  }

  // 检查防火墙状态
  if (process.platform === 'win32') {
    exec('netsh advfirewall firewall show rule name=all', (error, stdout) => {
      const blocked = stdout.includes('阻止')
      console.log(`🔥 防火墙状态: ${blocked ? '⚠️ 可能有阻止规则' : '✅ 未检测到阻止规则'}`)
    })
  } else {
    console.log(
      `🔥 防火墙状态: ${process.platform === 'darwin' ? '✅ macOS 通常允许本地访问' : '✅ Linux 通常允许本地访问'}`,
    )
  }

  // 检查 IP 可访问性
  checkIPAccess(ip, (accessible) => {
    console.log(`📡 IP 可访问性: ${accessible ? '✅ 可访问' : '❌ 不可访问 (可能被防火墙阻止)'}`)

    if (!accessible) {
      console.log('\n💡 解决方案:')
      console.log('1. 确保电脑和手机连接同一 Wi-Fi 网络')
      console.log('2. 暂时禁用防火墙测试')
      console.log('3. 检查路由器是否启用了"客户端隔离"功能')
      console.log('4. 尝试使用下面的替代地址:')

      // 显示替代地址
      const altIPs = []
      for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
          if (iface.family === 'IPv4' && !iface.internal && iface.address !== ip) {
            altIPs.push(`http://${iface.address}:${port}`)
          }
        }
      }

      if (altIPs.length > 0) {
        altIPs.forEach((altUrl) => console.log(`   - ${altUrl}`))
      } else {
        console.log('   (未找到其他可用 IP 地址)')
      }
    }
  })
}

const ip = getLocalIP()
const port = getPort()
const url = `http://${ip}:${port}`

console.log('\n📱 手机访问地址:')
console.log(`\x1b[32m${url}\x1b[0m`) // 绿色显示URL
console.log(`\x1b[33m确保手机和电脑连接同一Wi-Fi网络\x1b[0m`)

console.log('\n🔍 扫描二维码在手机访问:')
qrcode.generate(url, { small: true })

// 显示网络诊断信息
showNetworkDiagnostics(ip)

// 添加退出提示
console.log('\n🛑 按 Ctrl+C 停止服务')
