import { useParams, useNavigate } from "react-router-dom";
import { SettingBar, UserVideo, SettingSideBar, PlanSidebar } from "@components/studyroom";
import { useMyStream, useToggleSideBar } from "@hooks";
import { useFetchUserInfo } from "@hooks/@queries/user";
import { useJoinStudyRoom, useStudyRoomQuery } from "@hooks/@queries/studyroom";
import styles from "./styles.module.css";

function JoinStudyRoom() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { sideBarType, toggleSideBar } = useToggleSideBar();
  const { videoRef, videoActive, audioActive, toggleVideo, toggleAudio } = useMyStream();
  const { userId, nickname } = useFetchUserInfo();
  const { studyroomData } = useStudyRoomQuery(roomId);
  const { mutate } = useJoinStudyRoom();

  const clickStartStudy = () => {
    mutate(roomId, {
      onSuccess: ({ token }) => {
        navigate(`/studyroom/${roomId}`, { state: { token } });
      },
    });
  };

  return (
    <>
      <div className={styles.container}>
        {sideBarType === "SETTING" && <SettingSideBar showEditBtn={userId && userId === studyroomData.userId} />}
        <UserVideo
          count={1}
          user={{
            streamRef: videoRef,
            isHost: userId && userId === studyroomData.userId,
            audioActive,
            nickname,
          }}
        />
        {sideBarType === "PLAN" && <PlanSidebar />}
      </div>
      <SettingBar
        studyroomName={studyroomData.name}
        clickStartStudy={clickStartStudy}
        toggleVideo={toggleVideo}
        toggleAudio={toggleAudio}
        clickSideBarBtn={toggleSideBar}
        videoActive={videoActive}
        audioActive={audioActive}
      />
    </>
  );
}

export default JoinStudyRoom;
