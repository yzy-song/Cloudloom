import { ref, watch, onMounted } from 'vue'

// Define a reactive variable to hold the dark mode state.
// We initialize it to false (light mode) by default.
const isDarkMode = ref(false)

/**
 * A Vue composable for managing the application's theme (dark/light mode).
 * It handles theme initialization, toggling, and persistence in localStorage.
 */
export function useTheme() {
  /**
   * Updates the DOM by adding or removing the 'dark' class from the <html> element.
   * This function is the key to making TailwindCSS's dark mode variants work.
   * @param {boolean} isDark - Whether to apply the dark theme.
   */
  const updateThemeClass = (isDark: boolean) => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  /**
   * Toggles the theme between dark and light mode.
   * It updates the reactive state, saves the preference to localStorage,
   * and applies the corresponding class to the DOM.
   */
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    updateThemeClass(isDarkMode.value)
  }

  // This onMounted hook runs once when the component using this composable is mounted.
  // It's perfect for setting the initial theme based on user's saved preference or system settings.
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme) {
      // If a theme is saved in localStorage, use that.
      isDarkMode.value = savedTheme === 'dark'
    } else {
      // Otherwise, check the user's OS/browser preference.
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    // Apply the initial theme class to the <html> element.
    updateThemeClass(isDarkMode.value)
  })

  // Watch for changes in the isDarkMode ref.
  // Although we already call updateThemeClass in toggleDarkMode,
  // this watcher ensures that if the state is changed from elsewhere,
  // the DOM will still be updated correctly.
  watch(isDarkMode, (newValue) => {
    updateThemeClass(newValue)
  })

  return {
    isDarkMode,
    toggleDarkMode,
  }
}
