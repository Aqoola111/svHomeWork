const startButton = document.getElementById('start-button')
const usernameInput = document.getElementById('username-input')
const errorMessage = document.getElementById('err-message')

startButton.addEventListener('click', (event) => {
  event.preventDefault()
  errorMessage.textContent = ''
  const username = usernameInput.value.trim()

  if (username.length >= 2) {
    window.location.href = 'sign-up/index.html'
  } else {
    errorMessage.textContent = 'Username must be at least 2 characters long.'
  }
})
