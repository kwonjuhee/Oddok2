import { getRandomInt } from "./getRandomInt";

export const getRandomHHmmss = () => `${getRandomInt(0, 24)}:${getRandomInt(0, 60)}:${getRandomInt(0, 60)}}`;
