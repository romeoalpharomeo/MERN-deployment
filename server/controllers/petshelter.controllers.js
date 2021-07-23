const {Pet} = require('../models/petshelter.model');

module.exports.index = (req,res) => {
    res.json({
        message: "Hello Workd"
    })
}

module.exports.findAllPets = (req, res) => {
    console.log("Finding the products...")
    Pet.find()
        .then(allPets => res.json({ pets: allPets }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.createPet = (req, res) => {
    const { name, type, description, skillOne, skillTwo, skillThree } = req.body;
    Pet.create({
        name,
        type,
        description,
        skillOne,
        skillTwo,
        skillThree,
    })
        .then(pet=>res.json(pet))
        .catch(err=>res.json(err))
}

module.exports.findSinglePet = (req, res) => {
    Pet.findOne({ _id: req.params._id })
        .then(oneSinglePet => res.json({ pet: oneSinglePet }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.updateExistingPet = (req, res) => {
    Pet.findOneAndUpdate(
        { _id: req.params._id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedPet => res.json({ pet: updatedPet }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.deletePet = (req, res) => {
    Pet.deleteOne({ _id: req.params._id })
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}