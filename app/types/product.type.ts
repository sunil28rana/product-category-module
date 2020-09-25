import { Document, Schema } from "mongoose"

export interface ISeo extends Document {
    metaTitle: string
    metaKeyword: string
    metaDescription: string
    slug: string
  }

export interface IProduct extends Document {
    name: string
    categorieIds: Array<Schema.Types.ObjectId>
    shortDescription: string
    longDescription: string
    status: boolean
    price: number
    seo?: ISeo
}
