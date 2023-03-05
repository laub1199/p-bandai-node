import { Regions } from './types'
import axios, { AxiosInstance } from 'axios'
import * as cheerio from 'cheerio'

const pBandaiUrls = {
  sg: 'https://p-bandai.com',
  hk: 'https://p-bandai.com',
  mo: 'https://p-bandai.com',
  tw: 'https://p-bandai.com',
  us: 'https://p-bandai.com',
  jp: 'https://p-bandai.jp',
}

const pBandaiSuffix = {
  sg: '/sg',
  hk: '/hk',
  mo: '/hk',
  tw: '/tw',
  us: '/us',
  jp: '',
}

export class PBandai {
  private readonly region: Regions
  private readonly baseUrl: string
  private readonly urlSuffix: string
  private apiInstance: AxiosInstance

  constructor(region: Regions) {
    this.region = region
    this.baseUrl = pBandaiUrls[region]
    this.urlSuffix = pBandaiSuffix[region]
    this.apiInstance = axios.create({
      baseURL: `${this.baseUrl}${this.urlSuffix}`,
    })
  }

  private async getWebData(): Promise<cheerio.CheerioAPI> {
    const web = await this.apiInstance.get('')

    return cheerio.load(web.data)
  }

  public async getNewArrivals(): Promise<any> {
    const $ = await this.getWebData()

    const newArrivalSection = $('.o-grid--newarrival')

    const newArrivalItems = newArrivalSection.find('a.m-card').map((i, el) => {
      return {
        name: $(el).find('.m-card__name').text(),
        price: $(el).find('.m-card__price').text(),
        image: $(el).find('img').attr('src'),
        link: `${this.baseUrl}${$(el).attr('href')}`,
        releaseDate: $(el).find('.m-card__release').text(),
      }
    })

    return newArrivalItems.get()
  }
}
