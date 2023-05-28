import React, { useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Common Interface/Homepage/Navbar/Navbar";
import registerimage from "./images/register.svg"
import "./Register.css";

const Register= (props)=>{
    let navigate = useNavigate();
    
    const register = async() =>{ 

        const params = {
            email:email,
            name:name,
            password:password
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(params)
        };

        

        await fetch('http://localhost:4000/students/addLearner', requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                
                  result = JSON.parse(result)
              if(result!=null)
                {
                  if (result.password === password) {
                    let path = '/Login'; 
                    navigate(path);
                  }
                  else {
                      alert("Invalid Credential")
                      console.log("Login unsuccessful")
                      return false;
                  }
                }
                else{
                  alert("Invalid Credential")
                }
            })
            .catch(error => console.log('Error: ', error));






        
      }

      const changeName=(event)=>{
        this.setName(event.target.value);
      }
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

  return (
      <>
      <Navbar />
      
        <div className="register-base" style={{marginTop: 120}}>
            <div className="register-content">
                <div className="register-image">
                    <img src={registerimage} />
                </div>
                <div className="register-form">
                <div className="register-form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            onChange={function(event) {setName(event.target.value)}}
                            type="text" 
                            name="name" 
                            placeholder="Name"
                            required
                            value={name}   
                            
                        />
                    </div>
                    
                    <div className="register-form-group">
                        <label htmlFor="username">Email Address</label>
                        <input
                        onChange={function(event) {setEmail(event.target.value)}}
                            type="text" 
                            name="address" 
                            placeholder="Email" 
                            autoFocus 
                            required 
                            value={email} 
                        />

                    </div>
                    <div className="register-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                        onChange={function(event) {setPassword(event.target.value)}}
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            required
                            value={password}    
                        />
                    </div>
                </div>
            </div>

            <button className="register-btn" onClick={register}>
                    <h4>Register</h4>                   
            </button>
        </div>
        </>
  );
}

export default Register;
