import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socketIO from 'socket.io-client';
import {Button,Grid} from '@mui/material';
import  CentralizedCard  from './CentralizedCard';
import  Video  from './Video';
    let pc = new RTCPeerConnection({
        iceServers:[
        {
            urls :  "stun:stun.l.google.com:19302"
        }]
    });
function MeetingPage(){
    const [socket,setSocket]= useState(null);
    const [videoStream,setVideoStream]= useState();
    const [joined,setJoined]= useState(false);
    const [remoteVideoStream,setRemoteVideoStream]=useState();
    
    const params = useParams();
    const roomId= params.roomId;
    useEffect(()=>{
        const s = socketIO.connect("http://localhost:3000");
        s.on('connect',()=>{
            setSocket(s);
            s.emit('join',{roomId})
        })
        window.navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
            setVideoStream(stream);
        });
        s.on("localDescription",async({description})=>{
            console.log(description);
            pc.setRemoteDescription(description);
            pc.ontrack = (e) => {
                setRemoteVideoStream(new MediaStream([e.track]));
              };
        });
        s.on("iceCandidate",({candidate})=>{
            pc.addIceCandidate(candidate);
        });
        pc.onicecandidate=({candidate})=>{
            s.emit('iceCandidateReply',{candidate});
        };
    },[]);
    if(!videoStream)
    return <div>Loading</div>
     if(!joined){
    return<div style={{minHeight:"100vh"}}>
        <CentralizedCard>
        <div>
            <Typography>Hi join the meeting room {roomId}</Typography>
        </div>
        <div style={{display:'flex', justifyContent:"center"}}>
            <Button onClick={async()=>{
                pc.onicecandidate=({candidate})=>{
                    socket.on('iceCandidate',{candidate})
                };
                pc.addTrack(videoStream.getVideoTracks()[0]);
                try{
                await pc.setLocalDescription(await pc.createOffer());
                
                socket.emit("localDescription",{description: pc.localDescription});
                }
                catch(err){
                    console.error(err);
                }
                setJoined(true);
            }}
            disabled={!socket} variant="contained"
            >Join meeting</Button>
        </div>
      </CentralizedCard>
    </div>
     }
     return <Grid container spacing={2} alignContent={"center"} justifyContent={"center"}>
     <Grid item xs={8} md={4} lg={6}>
        {console.log(remoteVideoStream,videoStream)}
         <Video stream={videoStream} name='local' />
     </Grid>
     <Grid item xs={4} md={8} lg={6}>
     <div>HI</div>
         <Video stream={remoteVideoStream} name="Remote" />
     </Grid>
 </Grid>

}
export default MeetingPage;