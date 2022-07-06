var express = require('express');
var programme = require('../model/programme');
var especeAnimales = require('../model/especeAnimales');
var router = express.Router();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
/* GET  programme listing. */
router.get('/', function(req, res) {
  //res.send('from programme ');
  programme.find((err, data)=> {
      res.json(data);
  })
});
/* GET  programme à proximité listing. */
router.get('/proximite', function(req, res) {
    //res.send('from programme ');
    // programme.geoNear(
    //     {type:'point', coordiantes : [parseFloat(req.query.lng),parseFloat(req.query.lat)]},
    //     {maxDistance:100000, spherical:true}    
    // ).then(function(programmes)
    // {
    //     res.json(programmes);
    // }
    // );
    programme.aggregate(
        [{ $geoNear: { near: {type: 'Point', coordinates: [parseFloat(req.query.lng),
             parseFloat(req.query.lat)]},
              spherical: true, maxDistance: 100000, distanceField: "dist.calculated" } }]
              ).then(function(results)
              { if(results.length>0)
                {
                    res.send(results);
                    console.log("first");
                 } 
                else 
                {
                    res.status(404).json({error:"pas de programme a proximité"});
                    console.log("second");
                }
            
            });
    
  });

/* GET API data*/
router.get('/weather', async (req,res)=>{
   var lng=parseFloat(req.query.lng);
   var lat =parseFloat(req.query.lat)
const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=58a80b5addaf01f5751aad9d315d8dab`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    res.json(json);
});

/* Post   programme  . */ 
router.post('/add',function(req,res)
{
  console.log(req.body);
  var f= new programme({
   		
    nomProg: req.body.nomProg,		
    description: req.body.description,
    saison:	req.body.saison,		
    dateOuverture: req.body.dateOuverture,		
    dateFermeture: req.body.dateFermeture,		
    regle: req.body.regle,		
    image: req.body.image,	
    especeAnimales: req.body.especeAnimales,
    geolocation : req.body.geolocation  


  });
 // console.log("avant");

  f.save();
  res.send("Ajout effectué avec succes")
  console.log("programme ajouté avec succes ");
  console.log(f);
});

router.delete('/delete/:id', async(req, res) =>{
    try {
    const { id } = req.params;
    await programme.findByIdAndDelete(id);
    console.log({ id });
    //res.redirect("/programme")
    res.send("Suppression effectué avec succes")
}
catch{res.status(404).send({error:"programme not found"})}
});

router.get('/:id', async(req, res) =>{
    try {
    const { id } = req.params;
    const p= await programme.findById(id);
    console.log({ id });
    //res.redirect("/programme")
    res.json(p);
    res.json("programme found")
}
catch{res.status(404).send({error:"programme not found"})}
});

router.patch('/update/:id', async function(req,res)
{
    try {
    const { id } = req.params;
   var p = await programme.findById(id);
     
   Object.assign(p,req.body);
   p.save();
  console.log(req.body);



 
  res.status(200).send("modification effectué avec succes")
  console.log("programme modifié avec succes ");
  console.log(p);
}
catch{
    res.status(404).json({error:"programme not found"})
}
});

  
module.exports = router;