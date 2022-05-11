export interface IRow {
  code: string
  last_price: string
  previous_closed: string
}

export interface IStockGrowthRate {
  code: string
  growth: number
}

export interface IResult {
  max: IStockGrowthRate
  min: IStockGrowthRate
}
