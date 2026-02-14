async function sendRequest(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const result = await response.json()
    alert(result.message)
  } catch (error) {
    console.error('Error:', error)
    alert('שגיאה בתקשורת עם השרת')
  }
}

function addEmployee() {
  const data = {
    name: document.getElementById('name').value,
    department: document.getElementById('dept').value,
    age: Number(document.getElementById('age').value),
    salary: Number(document.getElementById('salary').value),
  }
  if (!data.name || !data.age) return alert('נא למלא את כל השדות')
  sendRequest('/add', data)
}

function deleteOlder() {
  const age = Number(document.getElementById('ageLimit').value)
  if (!age) return alert('נא להזין גיל')
  sendRequest('/delete-older', { age })
}

function updateDept() {
  const oldName = document.getElementById('oldDept').value
  const newName = document.getElementById('newDept').value
  if (!oldName || !newName) return alert('נא להזין שם ישן וחדש')
  sendRequest('/update-dept', { oldName, newName })
}
