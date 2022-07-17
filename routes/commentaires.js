var express = require('express');
var commentaire = require('../model/commentaire');
var router = express.Router();

const multer = require("multer");
const Produit = require('../model/produit');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + "_" + file.originalname;
        cb(null, newFileName);
    }
}); 

const upload = multer({ storage });

/* GET comments listing. */
router.get('/', function(req, res) {
    //res.send('from produit ');
    commentaire.find((err, data)=> {
        res.json(data);
    })
  }); 
   
  //get one comment by id
  router.get('/get/:id', async(req, res) =>{
    const { id } = req.params;
    res.json( await commentaire.findById(id));
});


/* PSOT  comment  . */
router.post('/add',upload.single('image'),async(req,res)=>
{
    var id = req.headers['id']; 
    const produit = await Produit.findById(id);
    var f= new commentaire({
    description: req.body.description,	
    image: req.file.filename,			
    message: req.body.message,	
    isActive: req.body.isActive,
    note : req.body.note,
    produit:produit
  });
  f.save();
  res.send(f)
  console.log("commentaire  ajouté avec succes ");
  console.log(f);
});
router.put('/update/:_id', async(req, res) =>{
  
    console.log(req.params);
    let data = await commentaire.updateOne(
      req.params, 
      {$set:req.body}
    );
    res.send(data);
  
    });

router.delete('/delete/:id', async(req, res) =>{
    const { id } = req.params;
    await commentaire.findByIdAndDelete(id);
    console.log({ id });
    //res.redirect("/commentaire")
    res.send("Suppression effectué avec succes")
});

module.exports = router;