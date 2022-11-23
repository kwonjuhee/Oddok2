// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";
import { format, subDays } from "date-fns";
import { getRandomInt } from "../utils/getRandomInt";
import { getRandomDate } from "../utils/getRandomDate";
import { bookmark } from "../fixtures/bookmark";
import { studyroom } from "../fixtures/studyroom";

export const handlers = [
  rest.get("/bookmark", (req, res, ctx) => {
    if (bookmark.id === null) return res(ctx.delay(), ctx.status(200), ctx.json(null));

    const bookmarkData = studyroom.find(({ id }) => id === bookmark.id);

    /** 스터디원 랜덤 생성 */
    const now = new Date();
    const participant = new Array(bookmarkData.currentUsers).fill(0).map(() => ({
      nickname: `user${getRandomInt(1, 1000000)}`,
      joinTime: format(getRandomDate(subDays(now, 1), now), "yyyy-MM-dd'T'HH:mm:ss"),
    }));

    return res(ctx.delay(), ctx.status(200), ctx.json({ ...bookmarkData, participant }));
  }),

  rest.post("/bookmark/:studyroomId", (req, res, ctx) => {
    const { studyroomId } = req.params;
    bookmark.id = Number(studyroomId);

    return res(ctx.delay(), ctx.status(200));
  }),

  rest.delete("/bookmark", (req, res, ctx) => {
    bookmark.id = null;

    return res(ctx.delay(), ctx.status(204));
  }),
];
