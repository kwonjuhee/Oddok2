import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { roomInfoState, deviceState } from "@recoil/studyroom";
import { errorState } from "@recoil/error";
import { planState, selectedPlanState } from "@recoil/plan";
import {
  hourState,
  minuteState,
  secondState,
  totalHourState,
  totalMinuteState,
  totalSecondState,
  studyTimeState,
} from "@recoil/timer";
import { initSession, connectToSession, connectDevice, initPublisher } from "@api/openvidu";
import {
  StudyBar,
  UserVideo,
  SettingSideBar,
  ChatSideBar,
  PlanSidebar,
  ParticipantSideBar,
} from "@components/studyroom";
import { Modal } from "@components/@commons";
import { useToggleSideBar, useManageLocalUser, useManageRemoteUsers } from "@hooks";
import useModal from "@hooks/useModal";
import { useLeaveStudyRoom } from "@hooks/@queries/studyroom";
import styles from "./StudyRoom.module.css";

function StudyRoom() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const location = useLocation();
  const [session, setSession] = useState(initSession());
  const { localUser, setLocalUser, videoActive, audioActive, toggleVideo, toggleAudio } = useManageLocalUser();
  const { remoteUsers, onRemoteStreamCreated, onRemoteStreamDestroyed, onRemoteMicStatusChanged } =
    useManageRemoteUsers();
  const participants = localUser ? [localUser, ...remoteUsers] : [];
  const [deviceStatus, setDeviceStatus] = useRecoilState(deviceState);
  const setRoomInfo = useSetRecoilState(roomInfoState);
  const resetHour = useResetRecoilState(hourState);
  const resetMinute = useResetRecoilState(minuteState);
  const resetSecond = useResetRecoilState(secondState);
  const resetTotalHour = useResetRecoilState(totalHourState);
  const resetTotalMinute = useResetRecoilState(totalMinuteState);
  const resetTotalSecond = useResetRecoilState(totalSecondState);
  const resetStudyTime = useResetRecoilState(studyTimeState);
  const resetPlan = useResetRecoilState(planState);
  const resetSelectedPlan = useResetRecoilState(selectedPlanState);
  const { sideBarType, toggleSideBar } = useToggleSideBar();
  const { isModal: isLeaveModal, openModal: openLeaveModal, closeModal } = useModal();
  const { mutate } = useLeaveStudyRoom();
  const setError = useSetRecoilState(errorState);

  const resetState = () => {
    resetHour();
    resetMinute();
    resetSecond();
    resetTotalHour();
    resetTotalMinute();
    resetTotalSecond();
    resetStudyTime();
    resetPlan();
    resetSelectedPlan();
  };

  const leaveRoom = () => {
    mutate(roomId, {
      onSuccess: () => {
        session.disconnect();
        resetState();
        navigate("/", { replace: true });
      },
    });
  };

  const goToSharePage = () => {
    mutate(roomId, {
      onSuccess: () => {
        session.disconnect();
        resetState();
        navigate("/share/study-time", { replace: true });
      },
    });
  };

  const startOpenvidu = async () => {
    const [_, deviceId] = await Promise.all([
      connectToSession(session, location.state.token, localUser),
      connectDevice(deviceStatus),
    ]);
    const stream = await initPublisher(deviceId, deviceStatus);
    await session.publish(stream);
    setLocalUser((prev) => ({ ...prev, stream, audioActive }));
  };

  useEffect(() => {
    if (!location.state?.token) {
      navigate(`/studyroom/${roomId}/setting`, { replace: true });
      return;
    }
    startOpenvidu().catch((error) => {
      setError(error);
    });
  }, []);

  useEffect(() => {
    session.on("streamCreated", (event) => {
      const userStream = session.subscribe(event.stream, undefined);
      onRemoteStreamCreated(event, userStream);
    });

    session.on("streamDestroyed", (event) => {
      onRemoteStreamDestroyed(event);
    });

    session.on("signal:roomDataUpdated", (event) => {
      setRoomInfo(JSON.parse(event.data));
    });

    session.on("signal:micStatusChanged", (event) => {
      const { from, data } = event;
      onRemoteMicStatusChanged(from, data);
    });

    session.on("exception", (exception) => {
      console.warn(exception);
    });
  }, []);

  useEffect(() => {
    if (localUser.stream) session.signal({ data: JSON.stringify({ audioActive }), type: "micStatusChanged" });
  }, [audioActive]);

  return (
    <div className={styles.layout}>
      <section className={styles.video_section}>
        {sideBarType === "SETTING" && <SettingSideBar session={session} />}
        <ul className={styles.videos_container}>
          {localUser.stream && <UserVideo count={participants.length} user={localUser} />}
          {remoteUsers.map((remoteUser) => (
            <UserVideo count={participants.length} user={remoteUser} />
          ))}
        </ul>
        {sideBarType === "PLAN" && <PlanSidebar />}
        {sideBarType === "PARTICIPANT" && <ParticipantSideBar participants={participants} />}
        <ChatSideBar session={session} display={sideBarType === "CHATTING"} />
      </section>
      <StudyBar
        toggleVideo={toggleVideo}
        toggleAudio={toggleAudio}
        videoActive={videoActive}
        audioActive={audioActive}
        clickSideBarBtn={toggleSideBar}
        onClickLeaveBtn={openLeaveModal}
      />
      {isLeaveModal && (
        <Modal
          title="스터디 종료"
          onClose={closeModal}
          onSubAction={{ text: "보지 않고 나가기", action: leaveRoom }}
          onAction={{ text: "시간표 확인", action: goToSharePage }}
        >
          정말 스터디방을 나가시겠습니까?
        </Modal>
      )}
    </div>
  );
}

export default StudyRoom;
