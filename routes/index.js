const express = require("express");
const router = express.Router();
const db = require('../models');
//scrape from header for our post
router.use(express.urlencoded({extended: false}));
router.use(express.json());


router.get("/", (req, res) => {
  res.render("index");
});

// GET /todos
router.get('/todos', async(req, res) => {
  //get all of our todos
  let records = await db.todos.findAll();

  res.json({data: records})

})

// GET /todos/:id
router.get('/todos/:id', async(req, res) => {
  let id = req.params.id; 

  let todo = await db.todos.findByPk(id);

  res.json({data: todo})
})

// POST /todos
router.post('/todos/new', async (req, res) => {
  try{
    let description = req.body.description;
    let result = await db.todos.create({description: description});

    let records = await db.todos.findAll();
    res.json({data: records})
  }
  catch(error){
    res.send('error')
  }

})

// PUT /todos/:id  updating
router.put('/todo/:id', async (req, res) => {

  try{
    //grab the id off of the url
    let id = req.params.id;
    let description = req.body.description;

    let updates = await db.todos.update({description: description}, {where: {id: id}});

    let records = await db.todos.findAll();

    res.json({data: records})

  }
  catch(error){
    res.send(error)
  }
  
})

// DELETE /todos/:id

router.delete('/todos/delete/:id', async (req, res) => {
    try{
        let id = req.params.id;
        let results = await db.todos.destroy({where: {id: id}})
        let records = await db.todos.findAll();

        res.json({data: records});

    }
    catch(error){

      res.send(error)
    }

})

module.exports = router;
