import React from "react";
import { PageLayout } from "@layouts";
import { Bookmark, StudyRoomCardList, TotalParticipant } from "@components/main";
import styles from "./MainPage.module.css";

function MainPage() {
  return (
    <PageLayout>
      <main className={styles.main}>
        <TotalParticipant />
        <Bookmark />
        <section>
          <h2>STUDY ROOM</h2>
          <StudyRoomCardList />
        </section>
      </main>
    </PageLayout>
  );
}

export default MainPage;
