const express=require('express')

const router=express.Router()
const auth=require('../../middleware/auth')

const Item=require('../../models/item')

// @route GET api/items
// @desc GET all items
// @access  public


router.get('/', (req,res)=>{
    Item.find()
    .sort({date: -1})
    .then(items=> res.json(items))
})


// @route POST api/items/:id
// @desc POST an item
// @access  private


router.post('/', auth,(req,res)=>{
    console.log(req.body.name)
    Item.create(req.body)
    .then((newItem)=>{res.status(201).json({new_item: newItem})})
    .catch(error=>res.status(500).json({error:error}))
})


// @route DELETE api/items/:id
// @desc DELETE an item
// @access  private

router.delete('/:id', auth, (req,res)=>{
    console.log(req.body.name)
    Item.findByIdAndDelete(req.params.id)
    .then((deletedItem)=>{res.status(201).json({deleted_Item: deletedItem})})
    .catch(error=>res.status(500).json({error:error}))
})

// @route UPDATE api/items/:id
// @desc UPDATE an item
// @access  private

router.patch('/:id', auth, function(req, res) {
    Item.findById(req.params.id)
      .then(function(uitem) {
        if(uitem) {
          // Pass the result of Mongoose's `.update` method to the next `.then`
          return uitem.update(req.body);
        } else {
          // If we couldn't find a document with the matching ID
          res.status(404).json({
            error: {
              name: 'DocumentNotFoundError',
              message: 'The provided ID doesn\'t match any documents'
            }
          });
        }
      })
      .then(function() {
        // If the update succeeded, return 204 and no JSON
        res.status(204).end();
      })
      // Catch any errors that might occur
      .catch(function(error) {
        res.status(500).json({ error: error });
      });
  });

module.exports=router;