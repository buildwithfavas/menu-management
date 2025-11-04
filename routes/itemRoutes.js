const express = require("express");
const router = express.Router();
const controller = require("../controllers/itemController");

router.post("/", controller.createItem);
router.get("/", controller.getItems);
router.get("/category/:categoryId", controller.getItemsByCategory);
router.get("/subcategory/:subCategoryId", controller.getItemsBySubCategory);
router.get("/search", controller.searchItems); //?name=namehere (Query Parameter)
router.get("/:idOrName", controller.getItem);
router.put("/:id", controller.updateItem);

module.exports = router;
