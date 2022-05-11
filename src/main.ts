import * as express from 'express'
import * as dotenv from 'dotenv'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLUpload, graphqlUploadExpress } from 'graphql-upload'
import { maxMinGrowthRateStock } from './resolvers/maxMinGrowthStock'
import { schema } from './schema'

dotenv.config()

const app = express()
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`)
})

const root = {
  FileUpload: GraphQLUpload,

  maxMinGrowthRateStock
}

app
  .use(
    graphqlUploadExpress({
      maxFileSize: 10000000, // 10 MB
      maxFiles: 20
    })
  )
  .use(
    '/',
    graphqlHTTP({
      schema,
      rootValue: root
    })
  )
