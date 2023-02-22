const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({message: 'cannot find a product with the tag youre looking for'})
        return;
      }
      res.json(dbTagData);
    })
    .catch(e => {
      console.log(e)
      res.status(500).json(e)
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },

    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({message: 'cannot find a category/product with that id'})
        return;
      }
      res.json(dbTagData);
    })
    .catch(e => {
      console.log(e)
      res.status(500).json(e)
    });
});


router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
