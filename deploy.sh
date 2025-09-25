#!/bin/bash
# filepath: /var/www/cloudloom/deploy.sh

# =========================================================================
# 项目自动化部署脚本（带颜色日志）
# 每次 git push 都会自动触发
# =========================================================================

# 定义颜色代码
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. 配置项目路径和目录
PROJECT_NAME="cloudloom"
DEPLOY_ROOT="/var/www/${PROJECT_NAME}"
RELEASES_DIR="${DEPLOY_ROOT}/releases"
CURRENT_SYMLINK="${DEPLOY_ROOT}/current"

# 2. 部署前的准备工作
echo -e "${GREEN}==================================================================${NC}"
echo -e "${GREEN}Starting deployment for ${PROJECT_NAME} at $(date)${NC}"
echo -e "${GREEN}==================================================================${NC}"

# 生成唯一的版本名（使用时间戳）
RELEASE_NAME=$(date +"%Y%m%d%H%M%S")
RELEASE_PATH="${RELEASES_DIR}/${RELEASE_NAME}"

# 创建新版本目录
mkdir -p "${RELEASE_PATH}"

if [ ! -d "${RELEASE_PATH}" ]; then
  echo -e "${RED}Error: Failed to create release directory. Aborting deployment.${NC}"
  exit 1
fi

# 3. 拉取代码到新版本目录
echo -e "${GREEN}Archiving latest code into new release directory: ${RELEASE_PATH}${NC}"
git archive --format=tar main | tar -xf - -C "${RELEASE_PATH}"

# 4. 进入新版本目录，安装依赖并构建项目
echo -e "${GREEN}Switching to release path and building the project...${NC}"
cd "${RELEASE_PATH}"
cp /var/www/cloudloom/.env.production "${RELEASE_PATH}/.env.production"
echo -e "${GREEN} .env.production copied to release path.${NC}"

npm install

npx vue-tsc --noEmit --skipLibCheck
npx vite build --mode production

if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed. Aborting deployment.${NC}"
  exit 1
fi

# 5. 切换软链接，完成零停机部署
echo -e "${GREEN}Building successful. Switching to new release...${NC}"
ln -nfs "${RELEASE_PATH}/dist" "${CURRENT_SYMLINK}"

# 修复文件权限，确保 Nginx 可以访问
echo -e "${GREEN}Fixing file ownership and permissions...${NC}"
chown -R www:www "${RELEASE_PATH}"
chown -h www:www "${CURRENT_SYMLINK}"

# 6. 清理旧版本，只保留最新5个
echo -e "${GREEN}Cleaning up old releases...${NC}"
ls -t "${RELEASES_DIR}" | tail -n +6 | xargs -I {} rm -rf "${RELEASES_DIR}/{}"

echo -e "${GREEN}==================================================================${NC}"
echo -e "${GREEN}Deployment successful! New version is live.${NC}"
echo -e "${GREEN}==================================================================${NC}"

exit 0