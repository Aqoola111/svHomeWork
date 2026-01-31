const username = new URLSearchParams(window.location.search).get('user')
const userNameField = document.getElementById('user-name')

if (username && userNameField) {
  userNameField.textContent = `Welcome, ${username}!`
}
