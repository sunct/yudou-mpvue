// let date = new Date();

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

function formatDate (date, type = 1) {
  const year = date.getFullYear()
  let month
  let day
  let t1
  switch (type) {
    case 1:
      month = date.getMonth() + 1
      day = date.getDate()
      t1 = [year, month, day]
      break
    case 2:
      month = date.getMonth() + 1
      day = date.getDate()
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      t1 = [year, month, day].map(formatNumber).join('-')
      break
  }

  return t1
}
function ChangeDateFormat (date, type = 1) {
  let t1
  switch (type) {
    case 1:
      let year = date[0]
      let month = date[1]
      let day = date[2]
      // console.log(year, month, day)
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      // console.log(year, month, day)
      t1 = [year, month, day].map(formatNumber).join('-')
      break
  }
  return t1
}

export default {
  formatNumber,
  formatTime,
  formatDate,
  ChangeDateFormat
}
