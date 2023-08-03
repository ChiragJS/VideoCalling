import { useEffect, useRef } from "react";

 const Video = ({stream,name}) => {
    const videoRef = useRef();
    useEffect(() => {
        if (videoRef && videoRef.current) {
            videoRef.current.srcObject = stream;
            console.log(name);
        }
      }, [videoRef,stream])
    
      return (
        <div>
          <div>
            {console.log(stream,name)}
            <video style={{borderRadius: 10}} ref={videoRef} muted width="100%" autoPlay={true} playsInline={true} />
          </div>
        </div>
      )
}
export default Video;