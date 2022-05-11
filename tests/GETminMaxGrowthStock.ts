import { expect } from 'chai'
import { get } from 'lodash'
import * as supertest from 'supertest'

const request = supertest('http://localhost:3001')

describe('GET Min Growth Stock', () => {
  it('Fixed CSV File', done => {
    request
      .post('/')
      .field('operations', '{"query":"query maxMinGrowthRateStock($listStockCSVFile:FileUpload!) {\\n  maxMinGrowthRateStock(listStockCSVFile: $listStockCSVFile){min\\n{code\\ngrowth}}\\n}"}')
      .field('map', `{"file": ["variables.listStockCSVFile"]}`)
      .attach('file', 'tests/infinaTestData.csv')
      .set('Accept', 'application/json')
      .end((err, rs) => {
        if (err) return done(err)

        expect(get(rs.body, 'data.maxMinGrowthRateStock.min.code')).to.equal('AAA')
        expect(get(rs.body, 'data.maxMinGrowthRateStock.min.growth')).to.equal(-5.26)
        done()
      })
  })
})
