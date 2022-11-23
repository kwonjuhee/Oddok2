// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";
import { studyroom } from "../fixtures/studyroom";

export const handlers = [
  rest.get("/participant/count", (req, res, ctx) => {
    const total = studyroom.reduce((acc, cur) => acc + cur.currentUsers, 0);
    return res(ctx.delay(), ctx.status(200), ctx.json(total));
  }),
];
