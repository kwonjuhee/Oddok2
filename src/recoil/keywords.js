import { atom } from "recoil";
import { localStorageEffect } from "./localStorageEffect";

export const keywordsState = atom({
  key: "keywords",
  default: [],
  effects: [localStorageEffect("keywords")],
});
