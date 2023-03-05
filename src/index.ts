import { IDeadline, INewArrival, Regions } from './types'
import axios, { AxiosInstance } from 'axios'
import * as cheerio from 'cheerio'
import { dateFormatter, pBandaiSuffix, pBandaiUrls } from './utils'

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

  public async getNewArrivals(numberOfItems?: number): Promise<INewArrival[]> {
    const $ = await this.getWebData()

    const newArrivalSection = $('.o-grid--newarrival')

    const newArrivalItems = newArrivalSection.find('a.m-card').map((i, el) => {
      const name = $(el).find('.m-card__name').text()
      const price = $(el).find('.m-card__price').text()
      const image = $(el).find('img').attr('src')
      const link = `${this.baseUrl}${$(el).attr('href')}`
      const releaseDate = $(el).find('.m-card__release').text()

      return {
        name,
        price,
        image,
        link,
        releaseDate: releaseDate ? dateFormatter(releaseDate) : null,
      }
    })

    const data = newArrivalItems.get()

    return data.slice(0, numberOfItems ? numberOfItems : data.length) as INewArrival[]
  }

  public async getDeadlines(numberOfItems?: number): Promise<IDeadline[]> {
    const $ = await this.getWebData()

    const deadlineSection = $('.o-grid--deadline')

    const deadlineItems = deadlineSection.find('a.m-card').map((i, el) => {
      const name = $(el).find('.m-card__name').text()
      const price = $(el).find('.m-card__price').text()
      const image = $(el).find('img').attr('src')
      const link = `${this.baseUrl}${$(el).attr('href')}`
      const deadline = $(el).find('.m-card__deadline').text()

      return {
        name,
        price,
        image,
        link,
        deadline: deadline ? dateFormatter(deadline) : null,
      }
    })

    const data = deadlineItems.get()

    return data.slice(0, numberOfItems ? numberOfItems : data.length) as IDeadline[]
  }
}