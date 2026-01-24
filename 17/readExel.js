const XLSX = require('xlsx')
const workbook = XLSX.readFile('grades.xlsx')
const sheet = workbook.Sheets[workbook.SheetNames[0]]
const data = XLSX.utils.sheet_to_json(sheet)

let sum = 0
data.forEach((element) => {
  sum += element.Grade
})
const average = sum / data.length
console.log(`Average Grade: ${average}`)
