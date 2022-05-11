import { buildSchema } from 'graphql'

export const schema = buildSchema(`
    scalar FileUpload

    type StockGrowthRate {
      code: String!
      growth: Float!
    }

    type Result {
      max: StockGrowthRate!
      min: StockGrowthRate!
    }

    type Query {
        maxMinGrowthRateStock(listStockCSVFile: FileUpload): Result!
    }
`)
