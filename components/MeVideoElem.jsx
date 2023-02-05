import { useHuddleStore } from "@huddle01/huddle01-client/store";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

const MeVideoElem = () => {
  const stream = useHuddleStore((state) => state.stream);
  const isCamPaused = useHuddleStore((state) => state.isCamPaused);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    console.log({ stream });
  }, [stream]);
  return (
    <div>
    {
    isCamPaused ? 
      <Image src="/bg-1.jpeg" width="400" height="200"/>
      :
      <video
      style={{ width: "50%" }}
      ref={videoRef}
      autoPlay
      muted
      playsInline
      ></video>
    }
    </div>
    
  );
};

export default MeVideoElem;
