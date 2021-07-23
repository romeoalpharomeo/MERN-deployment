import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Router} from '@reach/router';
import PetList from './views/PetList';
import AddPetForm from './views/AddPetForm';
import EditPet from './views/EditPet';
import SinglePet from './views/SinglePet';

function App() {
  return (
    <div className="App">
      <h1 className="headerAll" >Pet Shelter</h1>
      <Router>
        <PetList path="/" />
        <AddPetForm path="/createPet" />
        <EditPet path="/pets/edit/:_id" />
        <SinglePet path="/pets/:_id" />
      </Router>
    </div>
  );
}

export default App;
