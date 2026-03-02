// Theme toggle functionality
export const THEME_KEY = 'adc-media-theme'
export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light'
}

// Get saved theme from localStorage or system preference
export function getSavedTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY)
  if (savedTheme) {
    return savedTheme
  }

  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return THEMES.LIGHT
  }

  return THEMES.DARK
}

// Apply theme to document
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(THEME_KEY, theme)
}

// Toggle between themes
export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || THEMES.DARK
  const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
  applyTheme(newTheme)
  return newTheme
}

// Initialize theme on page load
export function initTheme() {
  const theme = getSavedTheme()
  applyTheme(theme)
}

// Initialize theme toggle button
export function initThemeToggle() {
  const themeToggleButton = document.getElementById('theme-toggle')

  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      toggleTheme()
    })
  }
}

// Auto-initialize theme when DOM is loaded
if (typeof document !== 'undefined') {
  // Apply theme immediately to prevent flash
  initTheme()

  // Initialize toggle button when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle)
  } else {
    initThemeToggle()
  }
}
