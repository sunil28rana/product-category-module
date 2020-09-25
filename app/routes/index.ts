import { Router } from "express"
import { addProduct, getProducts, updateProduct } from "../controllers/product.controller"
import { getCategories, addCategory } from "../controllers/category.controller"

const router: Router = Router()

// Categories
router.get("/get-categories", getCategories)
router.post("/add-category", addCategory)

// Products
router.get("/get-products", getProducts)
router.post("/add-product", addProduct)
router.put("/update-product/:id", updateProduct)


export default router