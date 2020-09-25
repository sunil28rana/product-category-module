import { model, Schema } from "mongoose"
import { ICategory } from "../types/category.type"

const categorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    products: [{
        type: Schema.Types.ObjectId, 
        ref: 'Product',
        validate: {
          validator: async (id: Schema.Types.ObjectId): Promise<any> => {
            const category = await model('Product').findById(id)
            return true ? category != null : false
          },
          message: `Product doesn't exist`
        }
    }],
    childCategories: [{
        type: Schema.Types.ObjectId, 
        ref: 'Category',
        validate: {
          validator: async (id: Schema.Types.ObjectId): Promise<any> => {
            const category = await model('Category').findById(id)
            return true ? category != null : false
          },
          message: `Category doesn't exist`
        }
    }],
    status: {
        type: Boolean,
        required: true,
        default: true
    }
  },
  { timestamps: true }
)

export default model<ICategory>("Category", categorySchema)