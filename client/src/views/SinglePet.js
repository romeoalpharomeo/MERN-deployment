import React, {useEffect, useState} from 'react';
import {Link} from '@reach/router';
import axios from 'axios';
import { navigate } from '@reach/router';
import './SinglePet.css'

const SinglePet = (props) => {
    const [petDetails, setPetDetails] = useState({})

    useEffect(()=>{
        axios
            .get(`http://localhost:8000/api/pet/${props._id}`)
            .then(res=>{
                console.log("Retrieving product...")
                console.log(res)
                console.log("Got it.")
                setPetDetails(res.data.pet)
            })
            .catch(err=>{
                console.log("Error: ", err)
            })
    }, [])

    const onDelete = (event) => {
        console.log("Deleting...")
        axios
            .delete(`http://localhost:8000/api/deletePet/${props._id}`)
            .then(res=>{
                console.log("Adopt in progress...")
                console.log(res)
                navigate("/")

            })
            .catch(err=>console.log("Error: ", err))
    }

    return (
        <div >
            <Link to="/" className="btn btn-info mx-1">Home</Link>
            <div className="singlePetDisplay" >
                <h3>Details About {petDetails.name}</h3>
                <div>
                    <h4>Pet Type: </h4>
                        <p>{petDetails.type}</p>
                    <h4>Description: </h4>
                        <p>{petDetails.description}</p>
                    <h4>Skills: </h4>
                        <p>{petDetails.skillOne}</p>
                        <p>{petDetails.skillTwo}</p>
                        <p>{petDetails.skillThree}</p>
                
                    <button onClick={onDelete} className="btn btn-danger">Adopt this Pet</button>
                </div>
            </div>
        </div>
    );
};

export default SinglePet;