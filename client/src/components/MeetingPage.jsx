import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import socketIO from 'socket.io-client';
import { Button, Grid, Typography,CircularProgress } from "@mui/material"
import { CentralizedCard } from "./CentralizedCard";
import { Video } from "./Video";
import zIndex from "@mui/material/styles/zIndex";
import CustomWrapper from "./CustomWrapper";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import CallEndIcon from "@mui/icons-material/CallEnd"
 let pc = new RTCPeerConnection({
   iceServers: [
     {
       urls: "stun:stun.l.google.com:19302",
     },
   ],
 });

 
export function MeetingPage() {
    const [socket, setSocket] = useState(null);
    const [joined, setJoined] = useState(false);
    const [videoStream, setVideoStream] = useState();
    const [remoteVideoStream, setRemoteVideoStream] = useState();
    const params = useParams();
    const roomId = params.roomId;
    const navigate = useNavigate();

    useEffect(() => {
      const s = socketIO.connect("http://localhost:3000");
      s.on("connect", () => {
        setSocket(s);
        s.emit("join", {
          roomId,
        });

        window.navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio:true
          })
          .then(async (stream) => {
            setVideoStream(stream);
          });

        s.on("localDescription", async ({ description }) => {
         
          console.log({ description });
          pc.setRemoteDescription(description);
          pc.ontrack = (e) => {
            setRemoteVideoStream(new MediaStream([e.track]));
          };

          s.on("iceCandidate", ({ candidate }) => {
            pc.addIceCandidate(candidate);
          });

      
          await pc.setLocalDescription(await pc.createAnswer());
          s.emit("remoteDescription", { description: pc.localDescription });
        });
          s.on("remoteDescription", async ({ description }) => {
           
            console.log({ description });
            pc.setRemoteDescription(description);
            pc.ontrack = (e) => {
              setRemoteVideoStream(new MediaStream([e.track]));
            };

            s.on("iceCandidate", ({ candidate }) => {
              pc.addIceCandidate(candidate);
            });


         
            
          });
      });
    }, []);

    if (!videoStream) {
        return <div style={{height:"100vh",display:'flex',flexFlow:'column',justifyContent:'center'}}>
          <div style={{display:'flex',flexFlow:'row',justifyContent:'center'}}>
            <CircularProgress></CircularProgress>
            </div>
        </div>
    }

    if (!joined) {
        return <div style={{minHeight: "100vh",}}>
            <CentralizedCard>
                <div>
                    <Video stream={videoStream} />
                </div>
                <br/><br/>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button onClick={async () => {
                       
                        pc.onicecandidate = ({candidate}) => {
                            socket.emit("iceCandidate", {candidate});
                        }
                        pc.addTrack(videoStream.getVideoTracks()[0])
                            try {
                                 await pc.setLocalDescription(await pc.createOffer());
                                console.log({ aa: pc.localDescription });
                                socket.emit("localDescription", {description: pc.localDescription});
                            } catch (err) {
                                  console.log({ msg:err?.message });
                                console.error(err);
                            }
                    
            
                        
                        setJoined(true);
                    }} disabled={!socket} variant="contained">
                        Join meeting
                    </Button>
                </div>
            </CentralizedCard>
        </div>
    }
    console.log({remoteVideoStream,videoStream})
    return <Grid container spacing={2} className="video-stream" alignContent={"center"} justifyContent={"center"}>
    {/* <Grid item xs={4} md={4} lg={4} >
      
      <Video stream={videoStream} className="video-stream" />
    </Grid> */}
    <Grid item xs={8} md={8} lg={8} style={{ position: "relative" }}>
      {/* Your custom Video component */}
      <Video stream={remoteVideoStream} className="video-stream" />
      <div className="preview-video">
        {/* Your custom Video component */}
        <Video stream={videoStream} className="video-stream video-stream-preview" />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      >
        {remoteVideoStream && (<Button variant="contained" size="large" color="error" startIcon={<CallEndIcon />} sx={{paddingLeft:"30px",borderRadius:100}} onClick={()=>{
          pc.close();
          socket.emit("end",{ x :"abc"})
          socket.disconnect();
          setJoined(false);
          videoStream.getTracks().forEach((track)=>{
            console.log("from get Video TRacks")
            track.stop();
          })
          remoteVideoStream.getTracks().forEach((track)=>{
            console.log("from get Video TRacks")
            track.stop();
          })
          setVideoStream(null);
          setRemoteVideoStream(null);
          navigate("/")
        }} >
        </Button>)}
      </div>
    </Grid>
  </Grid>

}