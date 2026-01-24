// מערכים

function getMinMax(arr) {
  let min = arr[0],
    max = arr[0]
  for (let num of arr) {
    if (num < min) min = num
    if (num > max) max = num
  }
  return [min, max]
}

function getCommon(arr1, arr2) {
  const result = []
  for (let x of arr1) {
    for (let y of arr2) {
      if (x === y && !result.includes(x)) result.push(x)
    }
  }
  return result
}

function countNumber(arr, num) {
  let count = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === num) count++
  }
  return count
}

// Arrow function

const greaterThanFive = (arr) => {
  for (let n of arr) if (n > 5) return true
  return false
}

const firstEqualsLast = (arr) => arr[0] === arr[arr.length - 1]

const checkBig = (arr) => (arr[arr.length - 1] > arr[0] ? 'אמיתי' : 'שקר')
