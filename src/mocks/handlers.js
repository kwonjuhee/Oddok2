import { handlers as bookmarkHandlers } from "./handlers/bookmark";
import { handlers as userHandlers } from "./handlers/user";
import { handlers as studyroomHandlers } from "./handlers/studyroom";
import { handlers as mypageHandlers } from "./handlers/mypage";
import { handlers as hashtagHandlers } from "./handlers/hashtag";
import { handlers as participantHandlers } from "./handlers/participant";

export const handlers = [
  ...bookmarkHandlers,
  ...userHandlers,
  ...studyroomHandlers,
  ...mypageHandlers,
  ...hashtagHandlers,
  ...participantHandlers,
];
