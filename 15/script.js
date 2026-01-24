const signUpForm = document.getElementById('sign-up-form')
const loginForm = document.getElementById('login-form')
const errorMessageSignUp = document.getElementById('sign-up-error')
const errorMessageLogin = document.getElementById('login-error')
const toLoginButton = document.getElementById('to-login-button')
const logoutButton = document.getElementById('logout-button')
const generatePlanButton = document.getElementById('generate-plan-button')

getUsersFromLocalStorage = () => {
  const users = JSON.parse(localStorage.getItem('users'))
  return users ? users : []
}

userExistsInLocalStorage = (email, username) => {
  const users = getUsersFromLocalStorage()
  return users.some(
    (user) => user.email === email || user.username === username,
  )
}

addUserToLocalStorage = (user) => {
  const users = getUsersFromLocalStorage()
  users.push(user)
  localStorage.setItem('users', JSON.stringify(users))
}

showSection = (sectionId) => {
  const sections = document.querySelectorAll('section')
  sections.forEach((section) => {
    section.style.display = section.id === sectionId ? 'block' : 'none'
  })
}

signUpForm.addEventListener('submit', (event) => {
  event.preventDefault()
  errorMessageSignUp.textContent = ''
  const username = document.getElementById('username').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const goal = document.getElementById('goal').value

  if (userExistsInLocalStorage(email, username)) {
    errorMessageSignUp.textContent =
      'User with this email or username already exists.'
    return
  }

  if (username.includes(' ')) {
    errorMessageSignUp.textContent = 'Username should not contain spaces.'
    return
  }

  if (password.length < 6) {
    errorMessageSignUp.textContent =
      'Password must be at least 6 characters long.'
    return
  }

  const newUser = {
    id: Date.now(),
    username: username,
    email: email,
    password: password,
    goal: goal,
    createdAt: new Date().toISOString(),
  }

  addUserToLocalStorage(newUser)
  showSection('login-section')
})

loginForm.addEventListener('submit', (event) => {
  event.preventDefault()
  errorMessageLogin.textContent = ''
  const username = document.getElementById('username-login').value
  const email = document.getElementById('email-login').value
  const password = document.getElementById('password-login').value
  const rememberMe = document.getElementById('remember-me').checked

  if (!email && !username) {
    errorMessageLogin.textContent = 'Please enter your username or email'
    return
  }
  const users = getUsersFromLocalStorage()

  const loggedInUser = users.find((user) => {
    return (
      (user.email === email || user.username === username) &&
      user.password === password
    )
  })

  if (!loggedInUser) {
    errorMessageLogin.textContent = 'Invalid username/email or password.'
    return
  }

  const safeUser = {
    username: loggedInUser.username,
    email: loggedInUser.email,
    goal: loggedInUser.goal,
  }

  if (rememberMe) {
    localStorage.setItem('rememberedUser', JSON.stringify(safeUser))
  }

  sessionStorage.setItem('loggedInUser', JSON.stringify(safeUser))
  showSection('dashboard-section')
  initDashboard()
})

toLoginButton.addEventListener('click', () => {
  showSection('login-section')
})

initDashboard = () => {
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
  if (!loggedInUser) {
    showSection('login-section')
    return
  }

  const dashboardWelcome = document.getElementById('dashboard-welcome')
  const dashboardGoal = document.getElementById('dashboard-goal')

  dashboardWelcome.textContent = `Welcome ${loggedInUser.username} to Ai Buddy`
  dashboardGoal.textContent = `Your goal is: ${loggedInUser.goal}`
}

logoutButton.addEventListener('click', () => {
  sessionStorage.removeItem('loggedInUser')
  localStorage.removeItem('rememberedUser')
  showSection('login-section')
})

generatePlanButton.addEventListener('click', () => {
  const planContainer = document.querySelector('.plan-container')
  const user = JSON.parse(sessionStorage.getItem('loggedInUser'))

  if (!user) return

  const smartTips = {
    Js: 'Focus on Async/Await and Array methods – they are the backbone of modern web apps.',
    React:
      'Master Functional Components and Hooks (useEffect is your best friend!).',
    Bagrut:
      'Review past exam papers and focus on time management during the test.',
    Acedemic:
      'Prioritize deep understanding of core principles over rote memorization.',
  }

  const tip = smartTips[user.goal] || 'Keep consistent and practice every day!'

  planContainer.innerHTML = `
    <div class="ai-response">
      <h3>Personalized Plan for ${user.username}</h3>
      <p><strong>AI Advice:</strong> ${tip}</p>
      <ul>
        <li><strong>Phase 1:</strong> Foundations of ${user.goal}</li>
        <li><strong>Phase 2:</strong> Intensive Practice & Problem Solving</li>
        <li><strong>Phase 3:</strong> Final Review and Mock Testing</li>
      </ul>
    </div>`
})

window.onload = () => {
  const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
  const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'))

  if (rememberedUser || loggedInUser) {
    sessionStorage.setItem('loggedInUser', JSON.stringify(rememberedUser))
    showSection('dashboard-section')
    initDashboard()
  } else {
    showSection('sign-up-section')
  }
}
