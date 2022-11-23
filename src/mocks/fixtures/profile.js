export const profile = {
  data: null,
  create(newProfile) {
    this.data = newProfile;
  },
  update(newProfile) {
    this.data = { ...this.data, newProfile };
  },
};
