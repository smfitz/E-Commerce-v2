const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

router.get("/", (req, res) => {
  Tag.findAll({
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({
          message: "cannot find a product with the tag youre looking for",
        });
        return;
      }
      res.json(dbTagData);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json(e);
    });
});

router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },

    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res
          .status(404)
          .json({ message: "cannot find a category/product with that id" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json(e);
    });
});

router.put("/", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: "could not find a tag with your id" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json(e);
    });
});

router.post("/:id", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((e) => {
      console.log(e);
      res.status(500).json(e);
    });
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res.status(404).json({ message: "could not find a tag with your id" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json(e);
    });
});

module.exports = router;
