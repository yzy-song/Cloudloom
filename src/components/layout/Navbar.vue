<!--
 * @Author: yzy
 * @Date: 2025-08-29 09:09:22
 * @LastEditors: yzy
 * @LastEditTime: 2025-09-05 17:30:00
 * @Description: 导航栏，增加二级菜单功能，并美化菜单风格
-->
<template>
  <!-- The <template> tag can have multiple root elements in Vue 3 -->
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
      headerClass,
      { '-translate-y-full': isScrollingDown && isScrolled && !mobileMenuOpen },
    ]"
  >
    <div class="w-full px-4 h-full md:max-w-screen-xl md:mx-auto md:px-6 lg:px-8">
      <div class="flex items-center justify-between h-full">
        <!-- Logo -->
        <router-link to="/" class="flex items-center group">
          <svg class="w-10 h-10 mr-2" :class="logoColorClass" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
          </svg>
          <span :class="['font-serif font-bold tracking-widest transition-colors duration-300', logoTextColorClass]">
            {{ t('brand.name') }}
          </span>
        </router-link>

        <!-- Desktop Navigation Menu -->
        <nav class="hidden md:flex items-center space-x-10">
          <template v-for="item in navItems" :key="item.label">
            <!-- Item with children (Dropdown) -->
            <div v-if="item.children" class="relative group">
              <button
                :class="[
                  'font-semibold text-sm tracking-wider relative group transition-colors duration-300 flex items-center',
                  linkTextColorClass,
                ]"
              >
                <span>{{ t(item.label) }}</span>
                <ChevronDownIcon class="w-4 h-4 ml-1" />
              </button>
              <!-- Dropdown Panel -->
              <div
                :class="[
                  'absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 origin-top rounded-md py-2 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300',
                  dropdownPanelClass,
                ]"
              >
                <router-link
                  v-for="child in item.children"
                  :key="child.path"
                  :to="child.path"
                  :class="['block px-4 py-2 text-sm transition-colors duration-200', dropdownLinkClass]"
                >
                  {{ t(child.label) }}
                </router-link>
              </div>
            </div>

            <!-- Item without children -->
            <router-link
              v-else
              :to="item.path"
              :class="['font-semibold text-sm tracking-wider relative group transition-colors duration-300', linkTextColorClass]"
            >
              <span>{{ t(item.label) }}</span>
              <span
                :class="[
                  'absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-full',
                  underlineColorClass,
                ]"
              ></span>
              <span
                v-if="activePath === item.path"
                :class="['absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-full rounded-full', underlineColorClass]"
              ></span>
            </router-link>
          </template>
        </nav>

        <!-- Right-side Icons -->
        <div class="hidden md:flex items-center space-x-6">
          <button :class="iconColorClass" :aria-label="t('navbar.search')">
            <MagnifyingGlassIcon class="h-6 w-6" />
          </button>
          <router-link to="/cart" :class="iconColorClass" :aria-label="t('navbar.cart')"><ShoppingCartIcon class="h-6 w-6" /></router-link>

          <!-- Language Switcher -->
          <div class="relative" ref="langMenuContainer">
            <button @click="isLangMenuOpen = !isLangMenuOpen" :class="iconColorClass" class="flex items-center">
              <GlobeAltIcon class="h-6 w-6" />
              <span class="ml-2 font-semibold text-sm">{{ locale === 'zh' ? '中' : 'EN' }}</span>
            </button>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="isLangMenuOpen"
                class="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <button
                  v-for="lang in availableLanguages"
                  :key="lang.code"
                  @click="switchLanguage(lang.code)"
                  :class="[
                    'w-full text-left px-4 py-2 text-sm',
                    locale === lang.code ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100',
                  ]"
                >
                  {{ lang.name }}
                </button>
              </div>
            </transition>
          </div>
          <!-- User Menu Dropdown -->
          <div v-if="authStore.isAuthenticated && authStore.user" class="relative" ref="userMenuContainer">
            <button @click="isUserMenuOpen = !isUserMenuOpen" id="user-menu-button" :aria-label="t('navbar.userMenu')">
              <img
                class="h-9 w-9 rounded-full object-cover border-2 transition-colors duration-300"
                :class="isScrolled || !isHomePage ? 'border-gray-300' : 'border-white/50'"
                :src="userAvatar"
                :alt="t('navbar.userAvatar')"
              />
            </button>

            <!-- Dropdown Panel -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="isUserMenuOpen"
                class="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="px-4 py-3 border-b border-gray-200">
                  <p class="text-sm font-semibold text-gray-800">
                    {{ authStore.user?.nickName || '' }}
                  </p>
                  <p class="text-sm text-gray-500 truncate">{{ authStore.user?.email }}</p>
                </div>
                <div class="py-1">
                  <router-link
                    v-for="item in userMenuItems"
                    :key="item.name"
                    :to="item.path"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    @click="isUserMenuOpen = false"
                  >
                    <component :is="item.icon" class="w-5 h-5 mr-3 text-gray-500" />
                    {{ t(item.name) }}
                  </router-link>
                </div>
                <div class="py-1 border-t border-gray-200">
                  <button @click="logout" class="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <ArrowLeftOnRectangleIcon class="w-5 h-5 mr-3 text-gray-500" />
                    {{ t('navbar.logout') }}
                  </button>
                </div>
              </div>
            </transition>
          </div>
          <router-link v-else to="/login" :class="loginLinkClass"
            ><UserCircleIcon class="h-6 w-6 mr-1" /><span>{{ t('navbar.login') }}</span></router-link
          >
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="mobile-menu-toggle" :class="[{ open: mobileMenuOpen }, iconColorClass]">
            <span class="bar"></span><span class="bar"></span><span class="bar"></span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile menu panel -->
  <transition name="mobile-menu-fade">
    <div v-show="mobileMenuOpen" class="fixed inset-0 z-[60] bg-white/95 backdrop-blur-lg flex flex-col p-6 md:hidden">
      <!-- 顶部：用户信息+购物车+登录/登出 + 关闭按钮 -->
      <div class="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <!-- 用户信息和操作区 -->
        <div class="flex items-center">
          <!-- 移动端用户信息区 -->
          <img
            v-if="authStore.isAuthenticated && authStore.user"
            class="h-12 w-12 rounded-full object-cover mr-3 border-2 border-gray-300"
            :src="authStore.user.avatarUrl || 'https://source.unsplash.com/100x100/?portrait'"
            :alt="t('navbar.userAvatar')"
          />
          <div>
            <span v-if="authStore.isAuthenticated && authStore.user" class="font-bold text-lg text-gray-800">
              {{ authStore.user.nickName }}
            </span>
            <router-link
              v-if="authStore.isAuthenticated && authStore.user"
              to="/profile"
              @click="mobileMenuOpen = false"
              class="text-sm text-gray-500 hover:underline block"
            >
              {{ t('navbar.viewProfile') }}
            </router-link>
            <router-link v-else to="/login" @click="mobileMenuOpen = false" class="flex items-center text-gray-800 font-semibold text-lg">
              <UserCircleIcon class="h-10 w-10 mr-2" />{{ t('navbar.login') }}
            </router-link>
          </div>
          <!-- 购物车图标 -->
          <router-link to="/cart" @click="mobileMenuOpen = false" class="p-2 ml-4" :aria-label="t('navbar.cart')">
            <ShoppingCartIcon class="h-8 w-8 text-gray-700" />
          </router-link>
        </div>
        <!-- 关闭按钮始终在右侧 -->
        <button @click="mobileMenuOpen = false" class="text-gray-700 z-50 p-2 -mr-2 ml-4">
          <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 主菜单内容 -->
      <div class="w-full max-w-sm mx-auto flex flex-col h-full">
        <!-- Navigation Links -->
        <nav class="flex-grow">
          <template v-for="item in navItems" :key="item.label">
            <div v-if="item.children">
              <!-- <p class="font-bold text-xl text-gray-500 py-3 w-full text-center block rounded-lg">
                {{ t(item.label) }}
              </p> -->
              <router-link
                v-for="child in item.children"
                :key="child.path"
                :to="child.path"
                class="font-bold text-2xl text-gray-800 py-4 w-full text-center block hover:bg-gray-100 transition-colors duration-200 rounded-lg"
                @click="mobileMenuOpen = false"
              >
                {{ t(child.label) }}
              </router-link>
            </div>
            <router-link
              v-else
              :to="item.path"
              class="font-bold text-2xl text-gray-800 py-4 w-full text-center block hover:bg-gray-100 transition-colors duration-200 rounded-lg"
              @click="mobileMenuOpen = false"
            >
              {{ t(item.label) }}
            </router-link>
          </template>
        </nav>

        <!-- 登出按钮（仅登录时显示） -->
        <button
          v-if="authStore.isAuthenticated"
          @click="logout"
          class="ml-4 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
        >
          {{ t('navbar.logout') }}
        </button>

        <!-- Language Switcher (Mobile) -->
        <div class="w-full pt-6 mb-6">
          <div class="flex items-center justify-center bg-gray-100 rounded-full p-1">
            <button
              v-for="lang in availableLanguages"
              :key="`mobile-${lang.code}`"
              @click="switchLanguage(lang.code)"
              :class="[
                'w-1/2 py-2 text-center font-semibold rounded-full transition-colors duration-300',
                locale === lang.code ? 'bg-[#C0392B] text-white shadow' : 'text-gray-600 hover:bg-gray-200',
              ]"
            >
              {{ lang.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted, onMounted } from 'vue';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ArchiveBoxIcon,
  ArrowLeftOnRectangleIcon,
  GlobeAltIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useScroll, useScrollDirection } from '@/composables/useScroll';
import { useAuthStore } from '@/stores/auth.store';

const { t, locale } = useI18n();
const route = useRoute();
const authStore = useAuthStore();

const { isScrolled } = useScroll(50);
const { isScrollingDown } = useScrollDirection();
const mobileMenuOpen = ref(false);
const isUserMenuOpen = ref(false);
const isLangMenuOpen = ref(false);
const userMenuContainer = ref<HTMLElement | null>(null);
const langMenuContainer = ref<HTMLElement | null>(null);

const navItems = [
  { label: 'navbar.home', path: '/' },
  { label: 'navbar.gallery', path: '/gallery' },
  { label: 'navbar.photos', path: '/photos' },
  { label: 'navbar.knowledge', path: '/knowledge' },
  {
    label: 'navbar.about',
    children: [
      { label: 'navbar.aboutUs', path: '/about' },
      { label: 'navbar.collaboration', path: '/collaboration' },
      { label: 'navbar.survey', path: '/survey-page' },
    ],
  },
];

const userMenuItems = [
  { name: 'navbar.profile', path: '/profile', icon: UserCircleIcon },
  { name: 'navbar.orders', path: '/orders', icon: ArchiveBoxIcon },
];

// Default avatar image URL
const defaultAvatar = '/images/avatar/dafault.jpeg';

const userAvatar = computed(() =>
  authStore.user?.avatarUrl && authStore.user.avatarUrl.trim() !== '' ? authStore.user.avatarUrl : defaultAvatar
);

const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
];

const isHomePage = computed(() => route.path === '/');
const activePath = computed(() => route.path);
const isLight = computed(() => isHomePage.value && !isScrolled.value);

const headerClass = computed(() => (isLight.value ? 'h-28 bg-transparent' : 'h-20 bg-white/80 backdrop-blur-lg shadow-md'));
const logoColorClass = computed(() => (isLight.value ? 'text-white' : 'text-[#C0392B]'));
const logoTextColorClass = computed(() => (isLight.value ? 'text-3xl text-white' : 'text-2xl text-gray-800'));
const linkTextColorClass = computed(() => (isLight.value ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-[#C0392B]'));
const underlineColorClass = computed(() => (isLight.value ? 'bg-white' : 'bg-[#C0392B]'));
const iconColorClass = computed(() => (isLight.value ? 'text-white' : 'text-gray-700 hover:text-[#C0392B]'));
const loginLinkClass = computed(() => [
  'flex items-center font-semibold text-sm transition-colors duration-300',
  isLight.value ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-[#C0392B]',
]);

// NEW: Computed classes for dropdown menu styling
const dropdownPanelClass = computed(() =>
  isLight.value ? 'bg-black/30 backdrop-blur-md ring-1 ring-white/20' : 'bg-white ring-1 ring-black ring-opacity-5 shadow-lg'
);

const dropdownLinkClass = computed(() =>
  isLight.value ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100 hover:text-[#C0392B]'
);

const logout = () => {
  isUserMenuOpen.value = false;
  authStore.logout();
};

const switchLanguage = (langCode: string) => {
  locale.value = langCode;
  isLangMenuOpen.value = false;
  mobileMenuOpen.value = false; // Also close mobile menu if open
};

// --- Dropdown Click-outside Logic ---
const createClickOutsideHandler = (menuState: typeof isUserMenuOpen, container: typeof userMenuContainer) => {
  return (event: MouseEvent) => {
    if (container.value && !container.value.contains(event.target as Node)) {
      menuState.value = false;
    }
  };
};

const userMenuClickOutsideHandler = createClickOutsideHandler(isUserMenuOpen, userMenuContainer);
const langMenuClickOutsideHandler = createClickOutsideHandler(isLangMenuOpen, langMenuContainer);

watch(isUserMenuOpen, isOpen => {
  if (isOpen) {
    document.addEventListener('click', userMenuClickOutsideHandler);
  } else {
    document.removeEventListener('click', userMenuClickOutsideHandler);
  }
});

watch(isLangMenuOpen, isOpen => {
  if (isOpen) {
    document.addEventListener('click', langMenuClickOutsideHandler);
  } else {
    document.removeEventListener('click', langMenuClickOutsideHandler);
  }
});

// --- Body Overflow & Language Persistence ---
watch(mobileMenuOpen, newValue => {
  if (newValue) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
});

watch(locale, newLocale => {
  localStorage.setItem('user-lang', newLocale);
  document.documentElement.lang = newLocale;
});

onMounted(() => {
  const savedLang = localStorage.getItem('user-lang');
  if (savedLang && ['en', 'zh'].includes(savedLang)) {
    locale.value = savedLang;
  }
});

onUnmounted(() => {
  document.body.classList.remove('overflow-hidden');
  document.removeEventListener('click', userMenuClickOutsideHandler);
  document.removeEventListener('click', langMenuClickOutsideHandler);
});
</script>

<style>
.mobile-menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem; /* 32px */
  height: 2rem; /* 32px */
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  box-sizing: border-box;
  z-index: 10;
}

.mobile-menu-toggle .bar {
  width: 100%;
  height: 3px; /* Bar thickness */
  background-color: currentColor;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  /* Set transform-origin to the center for smoother rotation */
  transform-origin: center;
}

/* When the 'open' class is added */
.mobile-menu-toggle.open .bar:nth-child(1) {
  /* Move down by 9.5px and rotate */
  transform: translateY(9.5px) rotate(45deg);
}

.mobile-menu-toggle.open .bar:nth-child(2) {
  /* Fade out the middle bar */
  opacity: 0;
}

.mobile-menu-toggle.open .bar:nth-child(3) {
  /* Move up by 9.5px and rotate in the opposite direction */
  transform: translateY(-9.5px) rotate(-45deg);
}

/* Mobile menu panel transition */
.mobile-menu-fade-enter-active,
.mobile-menu-fade-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-menu-fade-enter-from,
.mobile-menu-fade-leave-to {
  opacity: 0;
}
</style>
