import { Request, Response } from "express"
import Product from "../models/product.model"
import { IProduct } from "../types/product.type"

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    // const categories: string | null
    const { query } = req
    let queryObj: object = {}
    if (Array.isArray(query['categories'])) {
      queryObj = { 'categories': { $all: query['categories'] } }
    } else {
      queryObj = query
    }
    const products: IProduct[] = await Product.find(queryObj).populate('categories')
    res.status(200).json({ status: true, data: products })
  } catch (error) {
    const errorObj = {
      status: false,
      message: error.message
    }
    if (error.name == 'ValidationError') {
      res.status(400).json(errorObj)
    } else {
      res.status(500).json(errorObj)
    }
  }
}

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: IProduct = new Product(req.body)
    const newProduct: IProduct = await product.save()
    res.status(201).json({ message: "Product added succesfully!", data: newProduct })
  } catch (error) {
    const errorObj = {
      status: false,
      message: error.message
    }
    if (error.name == 'ValidationError') {
      res.status(400).json(errorObj)
    } else {
      res.status(500).json(errorObj)
    }
  }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req
    const updateProduct: IProduct | null = await Product.findByIdAndUpdate(
      { _id: id },
      body,
      {
        new: true
      }
    )

    if (!updateProduct) {
      res.status(404).json({
        'message': `Product with id ${id} is not found!`
      })
    }

    res.status(200).json({ message: "Product updated succesfully!", data: updateProduct })
  } catch (error) {
    if (error.name == 'ValidationError') {
      res.status(400).json(error)
    } else {
      res.status(500).json(error)
    }
  }
}
