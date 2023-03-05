export const dateTimeFormatter = (date: string): Date => {
  // date should be in format: 'MM.DD HH:MM'
  const dateArray = date.split(' ')

  const month = dateArray[0].split('.')[0].padStart(2, '0')
  const day = dateArray[0].split('.')[1].padStart(2, '0')

  const hour = dateArray[1].split(':')[0]
  const minute = dateArray[1].split(':')[1]

  const year = new Date().getFullYear()

  return new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`)
}

export const dateFormatter = (date: string): Date => {
  // date should be in format: 'DD.MM.YYYY'
  const dateArray = date.split('.')
  const year = dateArray[2]
  const month = dateArray[1].padStart(2, '0')
  const day = dateArray[0].padStart(2, '0')

  return new Date(`${year}-${month}-${day}T00:00:00Z`)
}

export const pBandaiUrls = {
  sg: 'https://p-bandai.com',
  hk: 'https://p-bandai.com',
  mo: 'https://p-bandai.com',
  tw: 'https://p-bandai.com',
  us: 'https://p-bandai.com',
  jp: 'https://p-bandai.jp',
}

export const pBandaiSuffix = {
  sg: '/sg',
  hk: '/hk',
  mo: '/hk',
  tw: '/tw',
  us: '/us',
  jp: '',
}
