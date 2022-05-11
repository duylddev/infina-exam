import { parse } from '@fast-csv/parse'
import { Upload } from 'graphql-upload'
import { maxBy, minBy, orderBy, round } from 'lodash'
import { IResult, IRow, IStockGrowthRate } from '../interface'

export async function maxMinGrowthRateStock(files: { listStockCSVFile: Upload }) {
  return new Promise<IResult>((rs, rj) => {
    let listStock: IStockGrowthRate[] = []

    const onRowData = (row: IRow) => {
      const { code, last_price, previous_closed } = row

      listStock.push({
        code,
        growth: ((parseFloat(last_price) - parseFloat(previous_closed)) / parseFloat(previous_closed)) * 100
      })
    }

    const onEnd = () => {
      listStock = orderBy(listStock, 'code')
      const maxGrowthStock = maxBy(listStock, 'growth')
      const minGrowthStock = minBy(listStock, 'growth')

      rs({
        max: formatStock(maxGrowthStock),
        min: formatStock(minGrowthStock)
      })
    }

    files.listStockCSVFile.file
      .createReadStream()
      .pipe(parse({ headers: true }))
      .on('data', row => onRowData(row))
      .on('end', onEnd)
      .on('error', err => rj(err))
  })
}

function formatStock(stock: IStockGrowthRate) {
  return {
    ...stock,
    growth: round(stock.growth, 2)
  }
}
