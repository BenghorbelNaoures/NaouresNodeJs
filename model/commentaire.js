var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Commentaire= new Schema({

    description: String,	
    dateCom: {type:Date,default:Date.now},		
    image: String,			
    message: String,	
    isActive: Boolean,
    note : String, 
    user:String,

    produit: {

      type: Schema.Types.ObjectId,
      ref: "produit"  
    },

});

module.exports = mongoose.model('commentaire',Commentaire);