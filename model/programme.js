var mongoose = require('mongoose');
const localisation = require('./localisation');

var Schema = mongoose.Schema;

var Programme= new Schema({

    nomProg: String,		
    description: String,		
    saison:	String,		
    dateOuverture: Date,		
    dateFermeture: Date,		
    regle: String,		
    image: String,		
    
    especeAnimales: [{
            type: Schema.Types.ObjectId,
            ref: "especeAnimales"
    }],
    isActive:{
        type: Boolean,
        default: true,
    },

    geolocation: localisation,

});

module.exports = mongoose.model('programme',Programme);