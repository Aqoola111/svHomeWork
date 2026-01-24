let students = [
  { id: 1, first: 'Dan', last: 'Cohen', city: 'Tel Aviv' },
  { id: 2, first: 'Noa', last: 'Levi', city: 'Haifa' },
  { id: 3, first: 'Moshe', last: 'Peretz', city: 'Jerusalem' },
  { id: 4, first: 'Maya', last: 'Rosen', city: 'Ashdod' },
  { id: 5, first: 'Itai', last: 'Zaliger', city: 'Tel Aviv' },
  { id: 6, first: 'Omer', last: 'Dayan', city: 'Ramat Gan' },
  { id: 7, first: 'Shahar', last: 'Barak', city: 'Bat Yam' },
  { id: 8, first: 'Roni', last: 'Saban', city: 'Herzliya' },
  { id: 9, first: 'Liron', last: 'Koren', city: 'Afula' },
  { id: 10, first: 'Amit', last: 'Gutman', city: 'Netanya' },
  { id: 11, first: 'Tomer', last: 'Zelcer', city: 'Tel Aviv' },
  { id: 12, first: 'Maor', last: 'Edri', city: 'Beersheba' },
  { id: 13, first: 'Eilon', last: 'Hayun', city: 'Modiin' },
  { id: 14, first: 'Roy', last: 'Ben Hur', city: 'Petah Tikva' },
  { id: 15, first: 'Yahli', last: 'Zehavi', city: 'Rehovot' },
]

let nextId = 16

function renderTable() {
  const tbody = document.getElementById('studentTable')
  tbody.innerHTML = ''

  students.forEach((s) => {
    const row = document.createElement('tr')

    row.innerHTML = `
            <td>${s.id}</td>
            <td>${s.first}</td>
            <td>${s.last}</td>
            <td>${s.city}</td>
            <td><button class="delete-btn" onclick="deleteStudent(${s.id})">Delete</button></td>
        `

    tbody.appendChild(row)
  })
}

function addStudent() {
  const first = document.getElementById('firstName').value.trim()
  const last = document.getElementById('lastName').value.trim()
  const city = document.getElementById('city').value.trim()

  if (!first || !last || !city) return

  students.push({ id: nextId++, first, last, city })
  renderTable()

  document.getElementById('firstName').value = ''
  document.getElementById('lastName').value = ''
  document.getElementById('city').value = ''
}

function deleteStudent(id) {
  students = students.filter((s) => s.id !== id)
  renderTable()
}

renderTable()
