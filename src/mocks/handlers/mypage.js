// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";
import { user } from "../fixtures/user";
import { studyroom } from "../fixtures/studyroom";
import { profile } from "../fixtures/profile";
import { timeRecord } from "../fixtures/time-record";

export const handlers = [
  rest.get("/profile", (req, res, ctx) => res(ctx.delay(), ctx.status(200), ctx.json(profile.dday ? profile : null))),

  rest.post("/profile", async (req, res, ctx) => {
    const newProfile = await req.json();

    profile.create(newProfile);

    return res(ctx.delay(), ctx.status(200), ctx.json(newProfile));
  }),

  rest.put("/profile", async (req, res, ctx) => {
    const newProfile = await req.json();

    profile.update(newProfile);

    return res(ctx.delay(), ctx.status(200), ctx.json(newProfile));
  }),

  rest.get("/time-record", (req, res, ctx) => {
    const date = req.url.searchParams.get("date");

    if (!timeRecord.data.date) timeRecord.generateDummy(date);

    return res(ctx.delay(), ctx.status(200), ctx.json(timeRecord.data.date));
  }),

  rest.get("/user/my-study-room", (req, res, ctx) => {
    const studyroomData = studyroom.find(({ userId }) => userId === user.id);

    return res(ctx.delay(), ctx.status(200), ctx.json(studyroomData));
  }),

  rest.delete("/study-room/:studyroomId", (req, res, ctx) => {
    const { studyroomId } = req.params;

    const index = studyroom.find(({ id }) => id === Number(studyroomId));
    studyroom.splice(index, 1);

    return res(ctx.delay(), ctx.status(200), ctx.json());
  }),
];
