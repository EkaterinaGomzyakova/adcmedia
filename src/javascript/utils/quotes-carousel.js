// Quotes carousel functionality
document.addEventListener('DOMContentLoaded', () => {
  const quoteBlock = document.querySelector('.SO_QuoteBlock')
  if (!quoteBlock) return

  const cards = Array.from(quoteBlock.querySelectorAll('.O_QuoteCard'))
  const buttons = quoteBlock.querySelectorAll('.A_ButtonCircle')
  const prevButton = buttons[0]
  const nextButton = buttons[1]

  if (cards.length === 0) return

  let currentIndex = 0

  const updateCards = () => {
    cards.forEach((card, index) => {
      card.classList.remove('active')
      card.style.zIndex = 1

      if (index === currentIndex) {
        card.classList.add('active')
        card.style.zIndex = 3
      } else if (
        index === (currentIndex + 1) % cards.length ||
        index === (currentIndex - 1 + cards.length) % cards.length
      ) {
        card.style.zIndex = 2
      }
    })
  }

  const goToNext = () => {
    currentIndex = (currentIndex + 1) % cards.length
    updateCards()
  }

  const goToPrev = () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length
    updateCards()
  }

  if (prevButton) prevButton.addEventListener('click', goToPrev)
  if (nextButton) nextButton.addEventListener('click', goToNext)

  // Initialize
  updateCards()
})
