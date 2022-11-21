import React, { useRef, useEffect } from "react";
import { PageLayout } from "@layouts";
import { SideNavBar } from "@components/mypage";
import MyGoalSection from "./MyGoalSection/MyGoalSection";
import StudyHistorySection from "./StudyHistorySection/StudyHistorySection";
import MyRoomSection from "./MyRoomSection/MyRoomSection";
import MyAccountSection from "./MyAccountSection/MyAccountSection";
import styles from "./MyPage.module.css";

function MyPage() {
  const indexRef = useRef();
  const targetRef = useRef();

  useEffect(() => {
    const indexNodes = [...indexRef.current.children].filter((e) => e.children.length === 0);
    indexNodes.map((node, i) =>
      node.addEventListener("click", () => {
        targetRef.current.children[i].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }),
    );
  }, []);

  return (
    <PageLayout>
      <div className={styles.container}>
        <SideNavBar indexRef={indexRef} />
        <main ref={targetRef}>
          <MyGoalSection />
          <StudyHistorySection />
          <MyRoomSection />
          <MyAccountSection />
        </main>
      </div>
    </PageLayout>
  );
}

export default MyPage;
