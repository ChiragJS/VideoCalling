import { Typography,Button } from "@mui/material";
import {useNavigate} from 'react-router-dom';

export function LandingPage() {
    const navigate = useNavigate();
    return <div style={{ height:"90vh",display:'flex',flexDirection:'row wrap',justifyContent:'space-between',marginTop:"5vh"}}>
        <div style={{marginTop:200,marginLeft:70}}>
            <Typography variant="h2">FaceConnect</Typography>
            <Typography variant="h5">Connect visually with the people who matter.</Typography>
            <br />
            <div style={{display:'flex',}}>
            <Button variant="contained" style={{marginRight:5}} onClick={()=>navigate('/login')}>Login</Button>
            <Button variant="contained" onClick={()=>{navigate('/signup')}}>SignUp</Button>
            </div>
        </div>
        <div style={{width:600,padding:90}}>
            <img src="../src/assets/landing.jpeg" style={{width:"95%",borderRadius:40}} />
        </div>
    </div>
}