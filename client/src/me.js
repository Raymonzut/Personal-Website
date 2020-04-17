module.exports = {
  age: age,
}

function age() {
  let birthdate = new Date(2002, 8, 29)
  let now = new Date()

  let age = now.getFullYear() - birthdate.getFullYear()

  if (now.getMonth() < birthdate.getMonth()) {
    age--
  }
  if (
    birthdate.getMonth() === now.getMonth() &&
    now.getDate() < birthdate.getDate()
  ) {
    age--
  }
  return age
}
