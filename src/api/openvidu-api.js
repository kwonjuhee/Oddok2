import { OpenVidu } from "openvidu-browser";
import OpenviduError from "@api/error/OpenviduError";
import { leaveStudyRoom } from "@api/study-room-api";

const OV = new OpenVidu();

export const initSession = () => OV.initSession();

export const connectToSession = async (session, token, userData, roomId) => {
  try {
    session.connect(token, userData);
  } catch (error) {
    await leaveStudyRoom(roomId);
    throw new OpenviduError(error);
  }
};

export const connectDevice = async () => {
  try {
    const devices = await OV.getDevices();
    return devices.filter((device) => device.kind === "videoinput");
  } catch (error) {
    throw new OpenviduError(error);
  }
};

export const initPublisher = async (deviceId, deviceStatus) => {
  try {
    return OV.initPublisherAsync(undefined, {
      audioSource: undefined,
      videoSource: deviceId,
      publishAudio: deviceStatus.audio,
      publishVideo: deviceStatus.video,
      frameRate: 30,
      mirror: false,
    });
  } catch (error) {
    throw new OpenviduError(error);
  }
};
