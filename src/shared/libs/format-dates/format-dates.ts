export function formatDate(inputDate: string | number | Date, format: string) {
  const date = new Date(inputDate)
  const day = date.getDate().toString().padStart(2, '0') // День
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Месяц (нумерация начинается с 0)
  const year = date.getFullYear().toString() // Год

  format = format.replace('dd', day)
  format = format.replace('mm', month)
  format = format.replace('yyyy', year)

  return format
}
