const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3000

app.use(express.json())

app.use(express.static(path.join(__dirname, '../front')))

// 3. Главная страница (маршрут по умолчанию)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/main/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

app.post('/signup', (req, res) => {
  const { userName, email, password } = req.body
  console.log(req.body)

  if (!userName || !email || !password) {
    return res.status(400).send('Error')
  }

  const userData = `Username: ${userName}, Email: ${email}, Password: ${password}\n`
  fs.appendFile(path.join(__dirname, 'users.txt'), userData, (err) => {
    if (err) {
      console.error('Error writing to file:', err)
      return res.status(500).send('Error')
    }
    res.status(200).send('Success')
  })
})
