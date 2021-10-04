export const getRandomDevice = (devices) => {
  if (devices instanceof Array) {
    return devices[Math.floor(Math.random() * devices.length)];
  }
};

export default {
  getRandomDevice,
};
