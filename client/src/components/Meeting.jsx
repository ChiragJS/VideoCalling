import { useState } from 'react';
import { Typography,Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CentralizedCard } from './CentralizedCard';
function Meeting(){
    const navigate = useNavigate();
    const [meetingId,setMeetingId] = useState("");

    return <div style={{minHeight: "100vh",}}>
    <CentralizedCard>
        <div>
            <Typography textAlign={"center"} variant="h5">
                Enter room id
            </Typography>
            <TextField id="outlined-basic" label="Meeting Id" variant="outlined" size='large' style={{width:"95%",paddingLeft:10}}  onChange={(e)=>{
        setMeetingId(e.target.value);
    }} />
        </div>
        <br />
        <div style={{display: "flex", justifyContent: "center"}}>
            <Button onClick={() => {navigate(`/meeting/${meetingId}`)}} variant="contained">
                Enter
            </Button>
        </div>
    </CentralizedCard>
</div>
}
export default Meeting;