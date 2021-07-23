import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import { Link } from '@reach/router';
import './AddPetForm.css'

const AddPetForm = (props) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skillOne, setSkillOne] = useState("");
    const [skillTwo, setSkillTwo] = useState("");
    const [skillThree, setSkillThree] = useState("");
    const [deleteOrAddPet, setDeleteOrAddPet] = useState(false);

    const [formErrors, setFormErrors] = useState({});

    const onSubmithandler = event => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/createPet', {
            name,
            type,
            description,
            skillOne,
            skillTwo,
            skillThree,
        })
            .then(res=>{
                console.log("Response: ", res)
                if(!res.data.errors) {
                    console.log(deleteOrAddPet)
                    setDeleteOrAddPet(!deleteOrAddPet)
                    console.log(deleteOrAddPet)
                    navigate("/")
                }
                else {

                    console.log("Please fill form out properly.")
                    setFormErrors(res.data.errors)
                }
            })
            .catch(err=>console.log("Error: ", err))

    }

    return (
        <div>
        <Link to={`/`} className="btn btn-info" >Home</Link>
        <div className="addPetForm" >
        <h3>Know a pet needing a home?</h3>
        <form className="mainForm mb-3" onSubmit={onSubmithandler} >
            <div className="mb-3" >
                <input type="text" onChange={event=>setName(event.target.value)} placeholder="Enter Pet Name" className="form-control w-50 mx-auto"/>
                {
                    formErrors.name ?
                        <p style={{color:'red'}}>{ formErrors.name.message }</p> :
                        ''
                }
            </div>
            <div className="mb-3" >
                <input type="text" onChange={event=>setType(event.target.value)} placeholder="Enter Pet Type" className="form-control w-50 mx-auto"/>
                {
                    formErrors.type ?
                        <p style={{color:'red'}}>{ formErrors.type.message }</p> :
                        ''
                }
            </div>
            <div className="mb-3" >
                <input type="text" onChange={event=>setDescription(event.target.value)} placeholder="Enter Pet Description" className="form-control w-50 mx-auto"/>
                {
                    formErrors.description ?
                        <p style={{color:'red'}}>{ formErrors.description.message }</p> :
                        ''
                }
            </div>
            <h3>Skills (Optional)</h3>
            <div className="mb-3" >
                <input type="text" onChange={event=>setSkillOne(event.target.value)} placeholder="Enter A Skill" className="form-control w-50 mx-auto"/>
            </div>
            <div className="mb-3" >
                <input type="text" onChange={event=>setSkillTwo(event.target.value)} placeholder="Enter A Skill" className="form-control w-50 mx-auto"/>
            </div>
            <div className="mb-3" >
                <input type="text" onChange={event=>setSkillThree(event.target.value)} placeholder="Enter A Skill" className="form-control w-50 mx-auto"/>
            </div>
            <a className="btn btn-danger m-2" href="/" >Cancel</a> 
            <input type="submit" value="Add Pet" className="btn btn-primary" />
        </form>
        </div>
        
        </div>
    )
    
}

export default AddPetForm;