var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Commentaire= new Schema({

    description: String,	
    dateCom: {type:Date,default:Date.now},		
    image: String,			
    message: String,	
    isActive: Boolean
});

module.exports = mongoose.model('commentaire',Commentaire);