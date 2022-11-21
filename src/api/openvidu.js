import { OpenVidu } from "openvidu-browser";
import OpenviduError from "@api/error/OpenviduError";
import { ERROR_MESSAGES } from "@utils/constants/messages";

const OV = new OpenVidu();

export const initSession = () => OV.initSession();

export const connectToSession = (session, token, userData) => {
  try {
    session.connect(token, userData);
  } catch (error) {
    throw new OpenviduError(error, ERROR_MESSAGES.OPENVIDU_SESSION_CONNECT);
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

export const initPublisher = (deviceId, deviceStatus) => {
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
