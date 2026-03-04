export function openSearchModal() {
  const event = new CustomEvent('openSearchModal')
  window.dispatchEvent(event)
}

export function initSearchButton() {
  const searchButton = document.getElementById('search-button')

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      openSearchModal()
    })
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchButton)
  } else {
    initSearchButton()
  }
}
