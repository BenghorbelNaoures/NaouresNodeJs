var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const Localisation= new Schema({

   
    type:{
        type: String,
        default: "Point"
    },

    coordinates: {
        type: [Number],
        index: "2dsphere"
    },

    isActive:{
        type: Boolean,
        default: true,
    },
    
  

});

module.exports = Localisation;