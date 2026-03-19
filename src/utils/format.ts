export const formatDateTime = (localDate:string, localTime:string) => {
  if (!localDate) return ""
  if (localTime) return `${localDate} ${localTime}`
  return localDate
}
