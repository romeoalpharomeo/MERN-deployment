import React, { useEffect, useState } from 'react';
import {Link} from '@reach/router';
import axios from 'axios';
import './PetList.css'
// import { navigate } from '@reach/router';

const PetList = (props) => {
    const [pets, setPets] = useState([]);
    const [deleteOrAddPet, setDeleteOrAddPet] = useState(false);

    useEffect(()=>{
        axios
            .get('http://localhost:8000/api/allPets')
            .then(res => {
                setPets(res.data.pets)
                console.log("Pets set...")
            })
            .catch(err => console.log("Error with axios: ", err))
    }, [deleteOrAddPet] )

    const onDelete = (event, petToDelete) => {
        console.log("Deleting...")
        axios
            .delete(`http://localhost:8000/api/deletePet/${petToDelete}`)
            .then(res=>{
                console.log("Delete in progress...")
                console.log(res)
                setDeleteOrAddPet(!deleteOrAddPet)
                

            })
            .catch(err=>console.log("Error: ", err))
    }

    return (
        <div>
            <Link to={`/createPet`} className="btn btn-outline-dark btn-lg">Add A Pet to the Shelter</Link>
            <div className="" >
                    <table class="table border border-3 rounded w-50 mx-auto petTable">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
            {
                pets
                    .sort(function(a, b) {
                        let typeA = a.type.toUpperCase();
                        let typeB = b.type.toUpperCase(); 
                        if (typeA < typeB) {
                            return -1;
                        }
                        if (typeA > typeB) {
                            return 1;
                        }
                        
                        return 0;
                    })
                    .map((pet, idx)=>{ 
                        return  <tr key={idx} className="align-middle" >
                                    <td>{ pet.name }</td>
                                    <td> { pet.type } </td>
                                    <td><Link to={`/pets/edit/${pet._id}`} className="btn btn-warning mx-1">Edit</Link> <Link to={`/pets/${pet._id}`} className="btn btn-info mx-1">Details</Link></td>
                                </tr>          
                })
            }
            </tbody>
            </table>
            </div> 
        </div>
    )
}

export default PetList;