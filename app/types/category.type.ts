import { Document } from "mongoose"
import { IProduct } from "./product.type";

export interface ICategory extends Document {
    name: string
    products: IProduct[]
    childCategories: ICategory[]
    status: boolean
}
