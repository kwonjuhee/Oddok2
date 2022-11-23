import React from "react";
import { PageLayout } from "@layouts";
import { Bookmark, StudyRoomCardList, StudyRoomCardListHead, TotalParticipant } from "@components/main";
import ErrorBoundary from "@components/@commons/ErrorBoundary";
import styles from "./MainPage.module.css";

function MainPage() {
  return (
    <PageLayout>
      <main className={styles.main}>
        <TotalParticipant />
        <Bookmark />
        <section>
          <h2>STUDY ROOM</h2>
          <StudyRoomCardListHead />
          <ErrorBoundary>
            <StudyRoomCardList />
          </ErrorBoundary>
        </section>
      </main>
    </PageLayout>
  );
}

export default MainPage;
