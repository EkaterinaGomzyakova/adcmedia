export function initScrollToTop() {
  const scrollButton = document.getElementById('scroll-to-top')

  if (scrollButton) {
    scrollButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollToTop)
  } else {
    initScrollToTop()
  }
}
