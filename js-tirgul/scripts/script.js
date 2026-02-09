let tasksCount = 0
let username = 'Jhonny'
let isLoggedIn = false
const API_URL = 'https://jsonplaceholder.typicode.com/todos'
const API_CLASS = 'api-task'
let loadingData = true

const greet = () =>
  isLoggedIn
    ? console.log(`Welcome back ${username}`)
    : console.log('Not logged in')

const logTasksCount = (withSwitch = false) => {
  if (withSwitch) {
    switch (true) {
      case tasksCount === 0:
        console.log('No tasks yet')
        break
      case tasksCount > 0 && tasksCount < 5:
        console.log('Few tasks')
        break
      case tasksCount >= 5:
        console.log('Many tasks')
        break
    }
  } else {
    if (tasksCount === 0) console.log('No tasks yet')
    if (tasksCount > 0 && tasksCount < 5) console.log('Few tasks')
    if (tasksCount >= 5) console.log('Many tasks')
  }
}

console.log(tasksCount)
console.log(`Hello ${username}`)
greet()
tasksCount = 5
console.log(tasksCount)
logTasksCount()

const showError = (message) => {
  const errorElement = document.querySelector('#error-message')
  errorElement.textContent = message
  setTimeout(() => {
    errorElement.textContent = ''
  }, 3000)
}

const objectTasks = JSON.parse(localStorage.getItem('tasks')) || []

try {
  objectTasks.forEach((task) => {
    if (task.completed) console.log(`Completed: ${task.title}`)
  })
} catch (error) {
  console.error('Error accessing tasks:', error)
}

const convertApiDataToLocalTasks = (tasks) => {
  if (!tasks || tasks === undefined || tasks.length === 0) {
    console.log('No tasks to convert')
    return []
  }
  const localTasks = tasks.map((task) => {
    return {
      title: task.title,
      completed: task.completed,
      fromApi: true,
    }
  })
  return localTasks
}

const saveToLocalStorage = (tasks) =>
  localStorage.setItem('tasks', JSON.stringify(tasks))

const updateTaskInLocalStorage = (taskName) => {
  const localTasks = JSON.parse(localStorage.getItem('tasks'))
  const task = localTasks.find((t) => t.title === taskName)
  if (task) {
    task.completed = !task.completed
    localStorage.setItem('tasks', JSON.stringify(localTasks))
  }
}

const addTask = (taskName, completed) => {
  const localTasks = JSON.parse(localStorage.getItem('tasks')) || []
  const newTask = {
    title: taskName,
    completed: completed,
  }
  localTasks.push(newTask)
  objectTasks.push(newTask)
  localStorage.setItem('tasks', JSON.stringify(localTasks))
}

const tasksBox = document.querySelector('.tasks-box')
const taskList = document.createElement('ul')

const renderTasks = () => {
  try {
    taskList.innerHTML = ''
    objectTasks.forEach((task) => {
      const taskItem = document.createElement('li')
      taskItem.id = `${task.title}`
      taskItem.classList.add('task-item')
      task.completed
        ? taskItem.classList.add('completed')
        : taskItem.classList.remove('completed')
      if (task.fromApi) taskItem.classList.add(API_CLASS)

      taskItem.textContent =
        task.title + (task.completed ? ' (Completed)' : ' Not Completed')
      taskList.appendChild(taskItem)
    })
    tasksBox.prepend(taskList)
  } catch (error) {
    showError('Error rendering tasks: ' + error.message)
  }
}

const addTaskBtn = document.querySelector('#add-task-btn')
addTaskBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const newTaskTitle = prompt('Enter task title')
  if (newTaskTitle) {
    addTask(newTaskTitle, false)
  }
  renderTasks()
})

const clearTasksBtn = document.querySelector('#clear-tasks-btn')
clearTasksBtn.addEventListener('click', (e) => {
  e.preventDefault()
  objectTasks.length = 0
  renderTasks()
})

taskList.addEventListener('click', (e) => {
  const classes = e.target.classList
  if (classes.contains('task-item')) {
    const taskTitle = e.target.id
    const task = objectTasks.find((t) => t.title === taskTitle)
    if (!task) return
    task.completed = !task.completed
    if (!classes.contains(API_CLASS)) updateTaskInLocalStorage(taskTitle)
    renderTasks()
  }
})

const deleteFromLocalStorageBtn = document.querySelector('#clear-local-storage')
deleteFromLocalStorageBtn.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.removeItem('tasks')
  objectTasks.length = 0
  renderTasks()
})

const fetchData = async () => {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    if (!data) return []
    return data
  } catch (error) {
    showError('Error Fetching tasks: ' + error.message)
  }
}

const addFetchedData = async (toLocalStorage = false) => {
  try {
    const loader = document.querySelector('.loader')
    loadingData = true
    if (loader) loader.classList.add('active')
    addTaskBtn.disabled = true
    const data = await fetchData()

    if (data) {
      const shuffled = data.sort(() => 0.5 - Math.random())
      const splicedData = shuffled.slice(0, 5)
      const convertedData = convertApiDataToLocalTasks(splicedData)
      if (!toLocalStorage) {
        objectTasks.push(...convertedData)
      } else {
        convertedData.forEach((task) => {
          addTask(task.title, task.completed)
        })
      }

      setTimeout(() => {
        console.log('Tasks from API loaded and rendered!')
      }, 2000)
    }

    loadingData = false
    addTaskBtn.disabled = false
    if (loader) loader.classList.remove('active')
  } catch (error) {
    showError('Failed to load data')
    loadingData = false
    addTaskBtn.disabled = false
  }
}

const fetchButton = document.querySelector('#fetch-tasks-btn')

fetchButton.addEventListener('click', async (e) => {
  e.preventDefault()
  await addFetchedData(true)
  renderTasks()
})

const init = async () => {
  renderTasks()
  await addFetchedData(false)
  renderTasks()
}

init()

console.log('1. התחלה סינכרונית')
setTimeout(() => {
  console.log('2. setTimeout אסינכרוני (שתי שניות)')
}, 2000)
fetch(API_URL).then(() => {
  console.log('3. Fetch אסינכרוני (מהרשת)')
})
console.log('4. סוף סינכרוני')
