// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";
import { user } from "../fixtures/user";
import { studyroom } from "../fixtures/studyroom";

export const handlers = [
  rest.get("/study-room/:studyroomId", (req, res, ctx) => {
    const { studyroomId } = req.params;
    const studyroomInfo = studyroom.find(({ id }) => id === Number(studyroomId));

    return res(ctx.delay(), ctx.status(200), ctx.json(studyroomInfo));
  }),

  rest.post("/study-room", async (req, res, ctx) => {
    const studyroomInfo = await req.json();
    studyroom.unshift({ ...studyroomInfo, id: studyroom.length + 1, userId: user.id, currentUsers: 0 });

    return res(ctx.delay(), ctx.status(200), ctx.json({ id: studyroom.length + 1, token: "token" }));
  }),

  rest.get("/study-room/join/:studyroomId", (req, res, ctx) =>
    res(ctx.delay(), ctx.status(200), ctx.json({ token: "token" })),
  ),

  rest.get("/study-room/leave/:studyroomId", (req, res, ctx) => res(ctx.delay(), ctx.status(200))),

  rest.get("/study-room/:studyroomId", (req, res, ctx) => {
    const { studyroomId } = req.params;
    const studyroomData = studyroom.find(({ id }) => id === studyroomId);

    return res(ctx.delay(), ctx.status(200), ctx.json(studyroomData));
  }),

  rest.put("/study-room/:studyroomId", async (req, res, ctx) => {
    const { studyroomId } = req.params;
    const newStudyroomInfo = await req.json();

    const index = studyroom.findIndex(({ id }) => id === studyroomId);
    studyroom[index] = newStudyroomInfo;

    return res(ctx.delay(), ctx.status(200), ctx.json(newStudyroomInfo));
  }),

  rest.get("/study-room", (req, res, ctx) => {
    const SIZE_PER_PAGE = 16;

    const query = {
      page: req.url.searchParams.get("page"),
      isPublic: req.url.searchParams.get("isPublic"),
      category: req.url.searchParams.get("category"),
      sort: req.url.searchParams.get("sort"),
      name: req.url.searchParams.get("name"),
      hashtag: req.url.searchParams.get("hashtag"),
    };

    let studyroomList = studyroom.filter(
      ({ isPublic, category, name, hashtags }) =>
        (query.isPublic === null || Boolean(query.isPublic) === isPublic) &&
        (query.category === null || query.category === category) &&
        (!query.name || name.includes(query.name)) &&
        (!query.hashtag || hashtags.includes(query.hashtag)),
    );

    if (query.sort) studyroomList = studyroomList.sort((a, b) => b.currentUsers - a.currentUsers);

    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json(studyroomList.slice(query.page * SIZE_PER_PAGE, (+query.page + 1) * SIZE_PER_PAGE)),
    );
  }),

  rest.post("/study-room/check/:studyroomId", async (req, res, ctx) => {
    const { studyroomId } = req.params;
    const { password } = await req.json();

    const { password: answer } = studyroom.find(({ id }) => id === studyroomId);

    if (password === answer) return res(ctx.delay(), ctx.status(200));
    return res(ctx.delay(), ctx.status(403));
  }),
];
