const PetController = require('../controllers/petshelter.controllers');


module.exports = function(app){
    app.get('/api', PetController.index);
    app.get('/api/allPets', PetController.findAllPets);
    app.post('/api/createPet', PetController.createPet);
    app.get('/api/pet/:_id', PetController.findSinglePet);
    app.put("/api/updateExistingPet/:_id", PetController.updateExistingPet);
    app.delete("/api/deletePet/:_id", PetController.deletePet);
}