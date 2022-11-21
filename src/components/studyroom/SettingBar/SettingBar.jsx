import React from "react";
import { useRecoilValue } from "recoil";
import { planState, selectedPlanState } from "@recoil/plan";
import { ToolTip } from "@components/@commons";
import { Setting, Music, VideoOn, VideoOff, MicOn, MicOff, GoalOpen } from "@icons";
import styles from "./SettingBar.module.css";

function SettingBar({
  studyroomName,
  clickStartStudy,
  toggleVideo,
  toggleAudio,
  clickSideBarBtn,
  videoActive,
  audioActive,
}) {
  const plan = useRecoilValue(planState);
  const selectedPlan = useRecoilValue(selectedPlanState);

  return (
    <section className={styles.bar}>
      <div className={styles.info}>
        <button type="button" onClick={() => clickSideBarBtn("SETTING")}>
          <Setting />
        </button>
        <span>{studyroomName}</span>
        <div className={styles.music}>
          <i>
            <Music />
          </i>
          <span>없음</span>
        </div>
      </div>
      <div className={styles.goal}>
        <span>{selectedPlan?.name ?? "목표를 입력해주세요"}</span>
        <button type="button" onClick={() => clickSideBarBtn("PLAN")}>
          <GoalOpen />
        </button>
      </div>
      <ul className={styles.buttons}>
        <li className={styles.video_button}>
          <button type="button" className={videoActive ? "" : styles.off} onClick={toggleVideo}>
            {videoActive ? <VideoOn /> : <VideoOff />}
          </button>
        </li>
        <li className={styles.audio_button}>
          <button type="button" className={audioActive ? "" : styles.off} onClick={toggleAudio}>
            {audioActive ? <MicOn /> : <MicOff />}
          </button>
        </li>
        <li>
          <button type="button" className={styles.start_button} onClick={clickStartStudy}>
            스터디 시작하기
          </button>
        </li>
      </ul>
      {!studyroomName && (
        <div className={styles.setting_tooltip}>
          <ToolTip type="left" message="해시태그나 스터디 유형 설정은 여기에서!" />
        </div>
      )}
      {plan.length === 0 && (
        <div className={styles.plan_tooltip}>
          <ToolTip message="오늘의 스터디 플랜을 적어볼까요?⏱️" />
        </div>
      )}
    </section>
  );
}

export default SettingBar;
