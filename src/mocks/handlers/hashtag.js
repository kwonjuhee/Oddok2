// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from "msw";
import { studyroom } from "../fixtures/studyroom";

export const handlers = [
  rest.get("/hashtag/popular", (req, res, ctx) => {
    const keyword = req.url.searchParams.get("name");

    const count = {};
    studyroom.forEach(({ name, hashtags }) => {
      if (keyword && !name.includes(keyword)) return;
      hashtags.forEach((hashtag) => {
        count[hashtag] = count[hashtag] ? count[hashtag] + 1 : 1;
      });
    });

    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        hashtags: [...Object.entries(count)]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 15)
          .map((e) => e[0]),
      }),
    );
  }),
];
