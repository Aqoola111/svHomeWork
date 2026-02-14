const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

const DB_URL =
  'mongodb+srv://david:UCY3nGUEp2tKh46o@cluster0.evpjp7f.mongodb.net/?appName=Cluster0'

mongoose
  .connect(DB_URL)
  .then(() => console.log('✅ Connected'))
  .catch((err) => console.error('❌ Error on connection:', err))

const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  age: Number,
  salary: Number,
})

const Employee = mongoose.model('Employee', employeeSchema)

app.use(express.json())
app.use(express.static(__dirname))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.post('/add', async (req, res) => {
  try {
    const emp = new Employee(req.body)
    await emp.save()
    res.send({ message: 'Employee created successfully' })
  } catch (error) {
    res.send({
      message: 'Error creating employee',
    })
  }
})

app.post('/delete-older', async (req, res) => {
  const { age } = req.body
  try {
    const result = await Employee.deleteMany({ age: { $gt: age } })
    res.send({ message: `Deleted ${result.deletedCount} employees ` })
  } catch (error) {
    res.send({ message: 'Error deleting employees' })
  }
})

app.post('/update-dept', async (req, res) => {
  const { oldName, newName } = req.body
  try {
    const result = await Employee.updateMany(
      { department: oldName },
      { department: newName },
    )
    res.send({
      message: `Updated department to Employees: ${result.modifiedCount}`,
    })
  } catch (error) {
    res.send({ message: 'Error updating department' })
  }
})

app.listen(3000, () => console.log('Server: http://localhost:3000'))
