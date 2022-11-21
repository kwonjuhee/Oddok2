import React, { useState, useRef, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user";
import { Input } from "@components/@commons";
import { SendButton } from "@icons";
import ChatList from "./ChatList/ChatList";
import styles from "./ChatSideBar.module.css";

function ChatSideBar({ session, display }) {
  const user = useRecoilValue(userState);
  const [chats, setChats] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    if (session) {
      session.on("signal:chat", (e) => {
        const chatData = JSON.parse(e.data);
        setChats((prev) => [...prev, chatData]);
      });
    }
  }, [session]);

  const sendChat = () => {
    if (inputRef.current.value === "") return;
    const content = inputRef.current.value;
    const time = new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
    session.signal({
      data: JSON.stringify({
        id: `${user.nickname}${Date.now()}`,
        content,
        time,
        userName: user.nickname,
      }),
      type: "chat",
    });
    inputRef.current.value = "";
  };

  return (
    display && (
      <aside className={styles.side}>
        <ChatList chats={chats} user={user} />
        <div className={styles.input_container}>
          <Input placeholder="메시지를 입력하세요" ref={inputRef} onEnterKeyPress={sendChat} autoFocus />
          <button type="button" className={styles.button} onClick={sendChat}>
            <SendButton />
          </button>
        </div>
      </aside>
    )
  );
}

export default ChatSideBar;
