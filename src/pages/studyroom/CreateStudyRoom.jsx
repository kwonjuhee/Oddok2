import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { roomInfoState } from "@recoil/studyroom";
import { SettingBar, UserVideo, SettingForm, PlanSidebar } from "@components/studyroom";
import { useToggleSideBar, useMyStream } from "@hooks";
import { useCreateStudyRoom } from "@hooks/@queries/studyroom";
import { useFetchUserInfo } from "@hooks/@queries/user";
import styles from "./styles.module.css";

function CreateStudyRoom() {
  const navigate = useNavigate();
  const roomInfo = useRecoilValue(roomInfoState);
  const { sideBarType, toggleSideBar } = useToggleSideBar();
  const { videoRef, videoActive, audioActive, toggleVideo, toggleAudio } = useMyStream();
  const { nickname } = useFetchUserInfo();
  const { mutate } = useCreateStudyRoom();

  const clickStartStudy = () => {
    mutate(roomInfo, {
      onSuccess: ({ id, token }) => {
        navigate(`/studyroom/${id}`, { state: { token } });
      },
    });
  };

  return (
    <>
      <div className={styles.container}>
        {sideBarType === "SETTING" && <SettingForm roomData={roomInfo} onClose={toggleSideBar} />}
        <UserVideo
          count={1}
          user={{
            streamRef: videoRef,
            isHost: true,
            audioActive,
            nickname,
          }}
        />
        {sideBarType === "PLAN" && <PlanSidebar />}
      </div>
      <SettingBar
        studyroomName={roomInfo.name || "방정보를 입력해주세요"}
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

export default CreateStudyRoom;
