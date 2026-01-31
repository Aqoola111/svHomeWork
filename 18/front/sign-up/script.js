const usernameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const confirmPasswordInput = document.getElementById('confirm-password')
const errorMessage = document.getElementById('error-message')
const signUpForm = document.getElementById('sign-up-form')
const signUpButton = document.getElementById('sign-up-button')

signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  errorMessage.textContent = ''
  const username = usernameInput.value.trim()
  const email = emailInput.value.trim()
  const password = passwordInput.value
  const confirmPassword = confirmPasswordInput.value

  if (username.length < 4) {
    errorMessage.textContent = 'Username must be at least 4 characters long.'
    return
  }

  if (username.length > 8) {
    errorMessage.textContent = 'Username must be at most 8 characters long.'
    return
  }

  if (!email.includes('@')) {
    errorMessage.textContent = 'Please enter a valid email address.'
    return
  }

  if (password.length < 5 || password.length > 10 || !password.includes('$')) {
    errorMessage.textContent =
      'Password must be 5-10 characters long and include a "$" symbol.'
    return
  }

  if (password !== confirmPassword) {
    errorMessage.textContent = 'Passwords do not match.'
    return
  }

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: username,
        email: email,
        password: password,
      }),
    })

    if (response.ok) {
      window.location.href = `/home/index.html?user=${username}`
    } else {
      alert('Error')
    }
  } catch (error) {
    console.error('Error', error)
    alert('Error')
  }
})
