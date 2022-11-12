import React from "react";
import StudyRoomCard from "../StudyRoomCard/StudyRoomCard";
import Skeleton from "../StudyRoomCard/Skeleton";
import styles from "./StudyRoomCardGrid.module.css";

function StudyRoomCardGrid({ isLoading, rooms }) {
  return (
    <div className={styles.content}>
      <ul>
        {rooms.map((roomData) => (
          <StudyRoomCard key={roomData.id} roomData={roomData} />
        ))}
        {isLoading && new Array(16).fill(0).map(() => <Skeleton />)}
      </ul>
      {!isLoading && rooms.length === 0 && (
        <div className={styles.empty}>
          <p>찾으시는 스터디룸이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default StudyRoomCardGrid;
