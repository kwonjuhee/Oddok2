// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";
import { user } from "../fixtures/user";

export const handlers = [
  rest.get("/user/info", (_, res, ctx) => res(ctx.delay(), ctx.status(200), ctx.json(user))),
  rest.patch("/user/nickname", async (req, res, ctx) => {
    const { nickname } = await req.json();

    user.nickname = nickname;

    return res(ctx.delay(3000), ctx.status(200));
  }),
];
