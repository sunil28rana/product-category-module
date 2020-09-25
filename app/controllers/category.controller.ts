import { Response, Request } from "express"
import { ICategory } from "../types/category.type";
import Category from "../models/category.model";

export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories: ICategory[] = await Category.find().populate('products').populate('childCategories');
        res.status(200).json({ status: true, data: categories })
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

export const addCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('body is', req.body)
        const category: ICategory = new Category(req.body)
        const newCategory = await category.save()
        res.status(201).json({ message: "Category added succesfully!", data: newCategory })
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