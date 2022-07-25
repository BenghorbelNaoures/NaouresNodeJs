var express = require('express');
var produit = require('../model/produit');
var CategoryProduct = require('../model/categorieProduit');

const ejs=require("ejs");
const path=require("path");
const app_qr =express();
const bp=require('body-parser');
const qrcode=require('qrcode');

var router = express.Router();

const multer = require("multer");
const app = require('../app');

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

/* GET product listing. */
router.get('/', function(req, res) {
  //res.send('from produit ');
  produit.find((err, data)=> {
      res.json(data);
  })
});

router.get('/get/:id', async(req, res) =>{
    const { id } = req.params;
    res.json( await produit.findById(id));
});

//modif 24/07/2022
router.post('/ajoutProduit', upload.single('image'),async(req,res)=>{
    //var id = req.params['id']; 
    //const categoryProduct = await CategoryProduct.findById(id);
    //const { nomProd }=req.body;
    //const image='http://localhost:3000/uploads/'+req.file.filename;
    var f= new produit({            
        nomProd: req.body.nomProd,			
        prix: req.body.prix,	    	    
        image:'http://localhost:3000/uploads/'+req.file.filename,
        description: req.body.description,	    
        quantiteProd: req.body.quantiteProd,
        //categorieProduit : categoryProduct,    
        categorieProduit : req.body.categorieProduit,         
        isActive: true              
      });                                                  
      f.save();
      res.send(f);
      console.log("produit ajouté avec succes ");
      console.log(f);       

});

router.post('/ajouProduit/:id', upload.single('image'),async(req,res)=>{
    var id = req.params['id']; 
    const categoryProduct = await CategoryProduct.findById(id);
    //const { nomProd }=req.body;
    //const image='http://localhost:3000/uploads/'+req.file.filename;
    var f= new produit({            
        nomProd: req.body.nomProd,			
        prix: req.body.prix,	    	    
        image:'http://localhost:3000/uploads/'+req.file.filename,
        description: req.body.description,	    
        quantiteProd: req.body.quantiteProd,
        //categorieProduit : categoryProduct,    
        categorieProduit : req.body.categorieProduit,         
        isActive: true              
      });                                                  
      f.save();
      res.send(f);
      console.log("produit ajouté avec succes ");
      console.log(f);       

});

//end 

/* POST  product . */
router.post('/addProduct/:id', upload.single('image'),async(req,res)=>
{   
    //console.log("req.file>>>>>>>>>>>>"+req.file);       
    //console.log("req.body.image>>>>>>>>>>>>>"+req.file.filename);
    //const { id } = req.params;
    var id = req.params['id']; 
    const categoryProduct = await CategoryProduct.findById(id);
    var f= new produit({
        nomProd: req.body.nomProd,			
        prix: req.body.prix,		    
        image:req.file.filename,
        description: req.body.description,	    
        quantiteProd: req.body.quantiteProd,
        //categorieProduit : categoryProduct,
        categorieProduit : req.body.categorieProduit,  
        isActive: true
      });
      //f.image= req.body.filename;
      //var f2= new produit({...req.body });
      f.save();
      res.send(f);
      console.log("produit ajouté avec succes ");
      console.log(f);

});             
/* POST  product . */
router.post('/add/:id',async(req,res)=>
{   console.log(">>>>>>>>>");
    console.log(req.body);
    upload.single('image');             
    //verifyCategoryIdentity;
    //const categoryProduct = req.categorieProduit; 
    const { id } = req.params;
    console.log(">>>>>>>>>");
    categoryProduct=await CategoryProduct.findById(id);
    console.log(">>>>>>>>>"+categoryProduct);
    var f= new produit({
    //  dateRecp : req.body.dateRecp
    //dateAjout: {type:Date,default:Date.now},	
    nomProd: req.body.nomProd,			
    image : req.file.filename,
    prix: req.body.prix,		
    description: req.body.description,	
    quantiteProd: req.body.quantiteProd,
    //categorieProduit : categoryProduct,
    categorieProduit : req.body.categorieProduit,  
	isActive: req.body.isActive
  });
  console.log("avant");

  f.save();
  res.send("Ajout effectué avec succes")
  console.log("produit ajouté avec succes ");
  console.log(f);
});

router.put('/update/:_id', async(req, res) =>{
  
    console.log(req.params);
    let data = await produit.updateOne(
      req.params, 
      {$set:req.body}
    );
    res.send(data);
  
    });

router.delete('/delete/:id', async(req, res) =>{
    const { id } = req.params;
    await produit.findByIdAndDelete(id);
    console.log({ id });
    //res.redirect("/produit")              
    res.send("Suppression effectué avec succes")
});
///////////////////////////////////////////////GENERATION QR CODE
app_qr.use(express.json());
app_qr.set('view engine','ejs');
app_qr.use(express.urlencoded({extended:false}));
app_qr.use(bp.json());
/* Generate qrcode. */
router.get('/GenerateQrCode', (req, res, next) =>{
   // res.send('hello');
   res.render('qrCode.ejs');
  });
  router.post('/scan', (req, res, next) =>{
    const input_text=req.body.text;
    //console.log(input_text);
    qrcode.toDataURL(input_text,(err, src)=>{
        res.render('scan.ejs', {
            qr_code:src
        }); 
    })
    //res.render('qrCode.ejs');
   });


module.exports = router;