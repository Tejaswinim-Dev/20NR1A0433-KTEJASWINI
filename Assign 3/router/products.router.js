const express = require("express")
const router = express.Router()

const productCtrl = require("../controllers/products-promise.ctrl")
const UserTokenMiddleware = require("../middlewares/user-token.middleware")
const productValidator = require("../validators/product.validator")


router.get("/pagination",productCtrl.getByPagination)
router.get("/", productCtrl.getAll)
router.get("/:productId", productCtrl.getById)  
router.post("/",productValidator, productCtrl.add)
router.put("/:productId",UserTokenMiddleware, productCtrl.update)
router.delete("/:productId",UserTokenMiddleware, productCtrl.delete)
router.patch("/:productId",UserTokenMiddleware,productCtrl.patch)

module.exports = router