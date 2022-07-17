var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorieProduit= new Schema({
		
    libelle: String,		
    isActive: Boolean,	
    
},
{
  timestamps : true
});

module.exports = mongoose.model('categorieProduit',CategorieProduit);