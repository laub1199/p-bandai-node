export enum Regions {
  HK = 'hk',
  MO = 'mo',
  SG = 'sg',
  TW = 'tw',
  US = 'us',
  JP = 'jp',
}

export interface IProduct {
  name: string
  price: string
  image: string
  link: string
}

export interface INewArrival extends IProduct {
  releaseDate: Date | null
}

export interface IDeadline extends IProduct {
  deadline: Date | null
}
