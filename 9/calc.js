const btnEqual = document.getElementById('btn-equal')
const inputField = document.getElementById('display')
const numberButtons = document.querySelectorAll('.btn')
const operatorButtons = document.querySelectorAll('.btn-operator')
const clearButton = document.querySelector('.clear')

let firstOperand = ''
let operator = ''
let waitingForSecondOperand = false

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (waitingForSecondOperand) {
      inputField.value = button.textContent
      waitingForSecondOperand = false
    } else {
      inputField.value += button.textContent
    }
  })
})

clearButton.addEventListener('click', () => {
  inputField.value = ''
  firstOperand = ''
  operator = ''
  waitingForSecondOperand = false
})

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (firstOperand && operator && !waitingForSecondOperand) {
      const result = calculate(firstOperand, inputField.value, operator)
      inputField.value = result
      firstOperand = result
    } else {
      firstOperand = inputField.value
    }

    operator = button.textContent
    waitingForSecondOperand = true
  })
})

btnEqual.addEventListener('click', () => {
  if (firstOperand && operator) {
    const result = calculate(firstOperand, inputField.value, operator)
    inputField.value = result
    firstOperand = ''
    operator = ''
    waitingForSecondOperand = false
  }
})

function calculate(first, second, op) {
  const a = parseFloat(first)
  const b = parseFloat(second)

  switch (op) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '×':
      return a * b
    case '÷':
      return b !== 0 ? a / b : 'Error'
    default:
      return second
  }
}
