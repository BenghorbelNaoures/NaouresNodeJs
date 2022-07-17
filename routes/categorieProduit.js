var express = require('express');
var categorieProduit = require('../model/categorieProduit');
var router = express.Router();
/* GET product category listing. */
router.get('/', function(req, res) {
  //res.send('from categorieProduit ');
  categorieProduit.find((err, data)=> {
      res.json(data);
  })
});

//get one product category by id
router.get('/get/:id', async(req, res) =>{
  const { id } = req.params;
  res.json( await categorieProduit.findById(id));
});


/* PSOT  product category  . */
router.post('/add',function(req,res)
{
  console.log(req.body);
  var f= new categorieProduit({
    libelle: req.body.libelle,		
    isActive: req.body.isActive	
  });
  f.save();
  res.send(f)
  console.log("Categorie produit ajouté avec succes ");
  console.log(f);
});

router.delete('/delete/:id', async(req, res) =>{
    const { id } = req.params;
    await categorieProduit.findByIdAndDelete(id);
    console.log({ id });
    //res.redirect("/produit")
    res.send("Suppression effectué avec succes")
});
router.put('/update/:_id', async(req, res) =>{
  
  console.log(req.params);
  let data = await categorieProduit.updateOne(
    req.params, 
    {$set:req.body}
  );
  res.send(data);

  });

module.exports = router;