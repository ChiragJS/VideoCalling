import { useEffect, useRef } from "react";

export const Video = ({stream}) => {
    const videoRef = useRef();
    useEffect(() => {
        if (videoRef && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
      }, [videoRef,stream])
    
      return (
        <div>
          <div>
            <video style={{borderRadius: 10,paddingBottom:"5px",width:"100%",height:"50%"}} ref={videoRef} autoPlay={true} playsInline={true} />
          </div>
        </div>
      )
}