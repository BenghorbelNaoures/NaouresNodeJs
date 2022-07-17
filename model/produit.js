var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Produit= new Schema({

    nomProd: String,		
    dateAjout: {type:Date,default:Date.now},	
    image: String,		
    prix: Number,		
    description: String,	
    quantiteProd: Number,	
	  isActive: Boolean,
    categorieProduit: {

      type: mongoose.Types.ObjectId,
      ref: "categorieProduit"  
    }

},
{
  timestamps : true
});

module.exports = mongoose.model('produit',Produit);