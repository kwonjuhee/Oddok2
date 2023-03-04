import { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { deviceState } from "@recoil/studyroom";

const useMyStream = () => {
  const videoRef = useRef();
  const [devideStatus, setDeviceStatus] = useRecoilState(deviceState);

  useEffect(() => {
    const getVideoandAudio = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      videoRef.current.srcObject = stream;
      const audioTrack = videoRef.current.srcObject.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled; // enabled 초기값: true
      window.localStream = stream;
    };
    getVideoandAudio();
  }, []);

  const toggleVideo = () => {
    const myStream = videoRef.current.srcObject;
    if (!myStream) return;
    const videoTrack = myStream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setDeviceStatus((prev) => ({ ...prev, video: videoTrack.enabled }));
  };

  const toggleAudio = () => {
    const myStream = videoRef.current.srcObject;
    if (!myStream) return;
    const audioTrack = myStream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setDeviceStatus((prev) => ({ ...prev, audio: audioTrack.enabled }));
  };

  return {
    videoRef,
    videoActive: devideStatus.video,
    audioActive: devideStatus.audio,
    toggleVideo,
    toggleAudio,
  };
};

export default useMyStream;
