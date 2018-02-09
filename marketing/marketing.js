let partOfDay = function (timeString, today) {
  /* given a 24-hour time HH, HHMM or HH:MM,
    return the part of day (morning, afternoon, evening, night)
     if today is true, return (this morning, this afternoon, this evening, tonight)
  */
  if (timeString === undefined || timeString === null) {
    timeString = (new Date()).getHours().toString()
  }
  if (today === undefined) {
    today = false
  }

  let hours = new Date().getHours()
  var partOfDay = ''
  if (hours < 12) {
    partOfDay = 'morning'
  } else if (hours < 13) {
    partOfDay = 'noon'
  } else if (hours < 16) {
    partOfDay = 'afternoon'
  } else if (hours < 17) {
    partOfDay = 'tea'
  } else if (hours < 22) {
    partOfDay = 'evening'
  } else {
    partOfDay = 'night'
  }

  if (today) {
    if (partOfDay === 'night') {
      partOfDay = 'tonight'
    } else {
      partOfDay = 'this ' + partOfDay
    }
  }

  return partOfDay
}

const day = new Date()
const part = partOfDay(day.getTime().toString())
let partMessage = null
let random = Math.floor(Math.random() * 2) + 1

switch (part) {
  case 'afternoon':
    partMessage = window.loc.goodAfter
    break
  case 'noon':
    partMessage = window.loc['noon' + random]
    break
  case 'tea':
    partMessage = window.loc.tea
    break
  case 'morning':
    partMessage = window.loc['goodMorn' + random]
    break
  case 'evening':
    partMessage = window.loc['goodEve' + random]
    break
  case 'night':
    partMessage = window.loc.goodNight
    break
  default:
    partMessage = window.loc.hello
}

document.querySelector('h1').innerText = partMessage

console.info(window.native)