module.exports = () => {
  const connect4 = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        resolve("success");
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    connect4,
  };
};
