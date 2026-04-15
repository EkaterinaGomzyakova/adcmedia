// Quotes carousel functionality
document.addEventListener('DOMContentLoaded', () => {
  const quoteBlock = document.querySelector('.SO_QuoteBlock')
  if (!quoteBlock) return

  const cards = Array.from(quoteBlock.querySelectorAll('.O_QuoteCard'))
  const buttons = Array.from(quoteBlock.querySelectorAll('.A_ButtonCircle'))

  if (cards.length === 0) return

  let currentIndex = 0

  const updateCards = () => {
    cards.forEach((card, index) => {
      card.classList.remove('active', 'left', 'right')
      card.style.zIndex = 1

      if (index === currentIndex) {
        // Активная карточка - в центре
        card.classList.add('active')
        card.style.zIndex = 3
      } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
        // Предыдущая карточка - слева
        card.classList.add('left')
        card.style.zIndex = 2
      } else if (index === (currentIndex - 2 + cards.length) % cards.length) {
        // Еще одна слева
        card.classList.add('left')
        card.style.zIndex = 2
      } else if (index === (currentIndex + 1) % cards.length) {
        // Следующая карточка - справа
        card.classList.add('right')
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

  // Первые две кнопки - prev (стрелки влево), последняя - next (стрелка вправо)
  if (buttons[0]) buttons[0].addEventListener('click', goToPrev)
  if (buttons[1]) buttons[1].addEventListener('click', goToPrev)
  if (buttons[2]) buttons[2].addEventListener('click', goToNext)

  // Initialize
  updateCards()
})
