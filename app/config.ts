import * as dotenv from "dotenv"

dotenv.config()

let path
switch (process.env.NODE_ENV) {
    case "test":
        path = `${__dirname}/../.env.test`
        break
    default:
        path = `${__dirname}/../.env.development`
}

dotenv.config({ path: path })

// export const DATABASE_URI: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
export const DATABASE_URI: string = `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`
export const PORT: string | number = process.env.PORT || 3000

console.log(process.env.MONGO_DB)