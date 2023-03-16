export const timeDiff = (time1, time2) => {
  const diff = Math.abs(time1 - time2)
  const second = Math.floor(diff / 1000)
  const minute = Math.floor(second / 60)
  const hour = Math.floor(minute / 60)
  const day = Math.floor(hour / 24)
  const month = Math.floor(day / 30)

  return {
    month,
    day,
    hour,
    minute,
    second,
  }
}

export const timeFormat = (timeObj) => {
  const format = Object.keys(timeObj).filter((key) => timeObj[key])
  const diff = format[0]

  if (!format.length) return 'now'
  return `${timeObj[diff]} ${diff}${diff ? 's' : ''} ago`
}
