import React, { useState } from "react";
import { Card,Button, TextField,Typography } from "@mui/material";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function Login(){
    const navigate= useNavigate();
    const [userEmail,setUserEmail] = useState("");
    const [password,setPassword] = useState("");
 return <div style={{paddingTop:150}}>
        <center>
        <Typography variant = "h4">Login</Typography>
        <Card variant="outlined" style={{width:400,padding:20,display: "flex",flexDirection:"column",borderRadius:10}}>
        
        <TextField id="outlined-basic" label="Email" variant="outlined" size="medium" value={userEmail} onChange={(e)=>{
            setUserEmail(e.target.value);
        }}/>
        <br/>
        <TextField className = "PassWord" id="outlined-basic" label="Password" variant="outlined" size="medium" type='password' value={password} 
        onKeyDown={(e)=>{ 
            const submitButton = document.querySelector('.LoginButton');
            if (e.keyCode ===13)
            submitButton.click();
        }} 
        onChange={(e)=>{
            setPassword(e.target.value);
            }}/>
        <br />
        <div style={{display:'flex', justifyContent:"center"}}>
        <Button className="LoginButton" variant="contained" size="medium" color="success" style={{borderRadius:20,width:"30%"}} onClick={async()=>{
             const response = await axios.post('http://localhost:3001/login',{},{
                headers:{
                    email : userEmail,
                    password: password
                }
            });
            if (response.data.user){
                navigate("/meeting")
            }
            else{
                console.log("Invalid userId");
            }
        }}>login</Button>
        </div>
        </Card>
        </center>
        </div>
}
export default Login;
