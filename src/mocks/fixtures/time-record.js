export const timeRecord = {
  data: {},
  generateDummy(date) {
    this.data.date = [
      {
        startTime: `${date}T08:13:00`,
        endTime: `${date}T10:40:10`,
        subject: "리액트",
      },
      {
        startTime: `${date}T11:30:01`,
        endTime: `${date}T14:55:00`,
        subject: "자바스크립트",
      },
      {
        startTime: `${date}T15:10:00`,
        endTime: `${date}T16:59:00`,
        subject: "OS",
      },
      {
        startTime: `${date}T17:00:00`,
        endTime: `${date}T19:08:01`,
        subject: "알고리즘",
      },
      {
        startTime: `${date}T20:00:00`,
        endTime: `${date}T22:30:00`,
        subject: "네트워크",
      },
    ];
  },
};
