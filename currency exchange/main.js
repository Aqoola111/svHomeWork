const dropList = document.querySelectorAll('.drop-list select')
const convertButton = document.querySelector('.convert-button')
const amountInput = document.querySelector('.amount')
const resultBox = document.querySelector('.result')
const swapIcon = document.querySelector('.swap-icon')
const themeToggle = document.getElementById('themeToggle')
const fromFlag = document.querySelector('.from-flag')
const toFlag = document.querySelector('.to-flag')

// Fill currency lists
dropList.forEach((select, i) => {
  for (const code in country_list) {
    const selected =
      (i === 0 && code === 'NIS') || (i === 1 && code === 'USD')
        ? 'selected'
        : ''
    const option = `<option value="${code}" ${selected}>${code}</option>`
    select.insertAdjacentHTML('beforeend', option)
  }
  updateFlag(select)
  select.addEventListener('change', (e) => updateFlag(e.target))
})

// Swap currencies
swapIcon.addEventListener('click', () => {
  const fromSelect = document.querySelector('.from')
  const toSelect = document.querySelector('.to')
  ;[fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value]
  updateFlag(fromSelect)
  updateFlag(toSelect)
})

// Convert
convertButton.addEventListener('click', (e) => {
  e.preventDefault()
  const from = document.querySelector('.from').value
  const to = document.querySelector('.to').value
  const amount = parseFloat(amountInput.value)

  if (isNaN(amount) || amount <= 0) {
    resultBox.textContent = 'Please enter a valid amount.'
    return
  }

  const fromRate = exchange_rates[from]
  const toRate = exchange_rates[to]
  if (!fromRate || !toRate) {
    resultBox.textContent = 'Currency not supported.'
    return
  }

  const converted = (amount * fromRate) / toRate
  resultBox.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`
})

// Update flag
function updateFlag(select) {
  const code = select.value
  const flagURL = `https://flagcdn.com/48x36/${country_list[
    code
  ].toLowerCase()}.png`
  if (select.classList.contains('from')) fromFlag.src = flagURL
  else toFlag.src = flagURL
}

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  themeToggle.textContent = document.body.classList.contains('dark')
    ? '☀️'
    : '🌙'
})
