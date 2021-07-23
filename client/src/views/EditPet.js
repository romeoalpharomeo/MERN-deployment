import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import {Link} from '@reach/router';
import './EditPet.css'

const EditPet = (props) => {
    const [petDetails, setPetDetails] = useState({
        name:'',
        type:'',
        description:'',
        skillOne:'',
        skillTwo:'',
        skillThree:'',
    })

    const [formErrors, setFormErrors] = useState({})

    useEffect(()=>{
        axios
            .get(`http://localhost:8000/api/pet/${props._id}`)
            .then(res=>{
                console.log("Retrieving author...")
                console.log(res)
                console.log("Got it.")
                setPetDetails(res.data.pet)
            })
            .catch(err=>{
                console.log("Error: ", err)
            })
    }, [])

    const onChangeHandler = (event) => {
        console.log("Changes")
        setPetDetails({
            ...petDetails,
            [event.target.name]: event.target.value,
            [event.target.type]: event.target.value,
            [event.target.description]: event.target.value,
            [event.target.skillOne]: event.target.value,
            [event.target.skillTwo]: event.target.value,
            [event.target.skillThree]: event.target.value,

        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        axios.put(`http://localhost:8000/api/updateExistingPet/${props._id}`, petDetails)
            .then(res=>{
                console.log("Response: ", res)
                if(res.data.error) {
                    console.log("Please fill form out properly.")
                    setFormErrors(res.data.error.errors) 
                }
                else {
                    navigate("/")
                    
                }
            })
            .catch(err=>console.log("Error: ", err))

    }

    return (
        <div>
            <Link to={`/`} className="btn btn-info" >Home</Link>
            <h2>Edit This Pet</h2>
            <div className="editPetForm" >
            <form onSubmit={onSubmitHandler} >
            <div className="mb-3" >
                <label>Name</label>
                <input onChange={onChangeHandler} type="text" name="name" value={petDetails.name} className="form-control w-50 mx-auto"/>
                {
                    formErrors.name ?
                        <p style={{color:'red'}}>{ formErrors.name.message }</p> :
                        ''
                }
            </div>
            <div className="mb-3" >
                <label>Type</label>
                <input onChange={onChangeHandler} type="text" name="type" value={petDetails.type} className="form-control w-50 mx-auto"/>
                {
                    formErrors.type ?
                        <p style={{color:'red'}}>{ formErrors.type.message }</p> :
                        ''
                }
            </div>
            <div className="mb-3" >
                <label>Description</label>
                <input onChange={onChangeHandler} type="text" name="description" value={petDetails.description} className="form-control w-50 mx-auto"/>
                {
                    formErrors.description ?
                        <p style={{color:'red'}}>{ formErrors.description.message }</p> :
                        ''
                }
            </div>
            <div className="mb-3" >
                <label>Skills: </label>
                <input onChange={onChangeHandler} type="text" name="skillOne" value={petDetails.skillOne} className="form-control w-50 mx-auto"/>
            </div>
            <div className="mb-3" >
                <input onChange={onChangeHandler} type="text" name="skillTwo" value={petDetails.skillTwo} className="form-control w-50 mx-auto"/>
            </div>
            <div className="mb-3" >
                <input onChange={onChangeHandler} type="text" name="skillThree" value={petDetails.skillThree} className="form-control w-50 mx-auto"/>
            </div>
            <a className="btn btn-danger m-3" href="/" >Cancel</a>
            <input type="submit" value="Submit Edits" className="btn btn-primary m-3" />
        </form>
        </div>

        </div>
    );
};

export default EditPet;