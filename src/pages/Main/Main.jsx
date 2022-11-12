import React from "react";
import { PageLayout } from "@components/@layouts";
import { Bookmark, StudyRoomCardList, TotalParticipant } from "@components/main";
import styles from "./Main.module.css";

function Main() {
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

export default Main;
