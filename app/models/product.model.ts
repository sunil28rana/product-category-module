import { model, Schema } from "mongoose"
import { IProduct } from "../types/product.type"

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categories: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
        validate: {
            validator: async (id: Schema.Types.ObjectId): Promise<any> => {
                const category = await model('Category').findById(id)
                return true ? category != null : false
            },
            message: `Category doesn't exist`
        }
    }],
    shortDescription: {
        type: String,
        required: true,
    },
    longDescription: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    price: {
        type: Number,
        required: true,
    }, 
    seo: {
        metaTitle: {
            type: String,
        },
        metaKeywords: {
            type: String,
        },
        metaDescription: {
            type: String,
        },
        slug: {
            type: String,
        },
    }
  },
  { timestamps: true }
)

export default model<IProduct>("Product", productSchema)