const router = require("express").Router();
const e = require("express");
const { Category, Product } = require("../../models");

router.get("/", (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "nothing matched you request" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json(e);
    });
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res
          .status(404)
          .json({ message: "cannot find a category/product with that id" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json(e);
    });
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((e) => {
      console.log(e);
      res.status(500).json(e);
    });
});

router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res
          .status(404)
          .json({ message: "could not find a category with this id" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json(e);
    });
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res
          .status(404)
          .json({ message: "could not find a category with that ID" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json(e);
    });
});

module.exports = router;
