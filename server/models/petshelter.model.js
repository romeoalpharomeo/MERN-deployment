const mongoose = require('mongoose'); 

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        minLength: [3, "Name must be at least 3 characters."]
    },
    type: {
        type: String,
        required: [true, "Type is required."],
        minLength: [3, "Type must be at least 3 characters."]
    },
    description: {
        type: String,
        required: [true, "Description is required."],
        minlength: [3, "Description must be at least 3 characters."]
    },
    skillOne: {
        type: String,
    },
    skillTwo: {
        type: String,
    },
    skillThree: {
        type: String,
    },

}, { timestamps:true } );

module.exports.Pet = mongoose.model("Pet", PetSchema);