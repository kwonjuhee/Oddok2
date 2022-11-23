import { CATEGORY_OPTIONS, HASHTAG_OPTIONS } from "@utils/constants/options";
import { getRandomInt } from "../utils/getRandomInt";

const getRandomCategory = () => CATEGORY_OPTIONS[getRandomInt(0, CATEGORY_OPTIONS.length)].value;
const getRandomHashtags = (max) => {
  const hashtags = new Array(max).fill(0).map((_) => HASHTAG_OPTIONS[getRandomInt(0, HASHTAG_OPTIONS.length)]);
  return [...new Set(hashtags)];
};
const getRandomBoolean = () => Boolean(getRandomInt(0, 2));

export const studyroom = [
  {
    id: 0,
    name: "도비들의 공부방",
    category: "OFFICIAL",
    hashtags: ["열공열공", "아자아자"],
    isPublic: true,
    currentUsers: 0,
    limitUsers: 6,
    endAt: "2022-12-31",
    rule: "매일매일 출석하기",
    userId: 1,
  },
].concat(
  Array.from(new Array(100), (_, i) => ({
    id: i + 1,
    name: `도비전용 ${i + 1}호실`,
    category: getRandomCategory(),
    hashtags: getRandomHashtags(getRandomInt(1, 7)),
    isPublic: getRandomBoolean(),
    currentUsers: getRandomInt(0, 7),
    limitUsers: 6,
    endAt: "2022-12-31",
    rule: null,
  })),
);
