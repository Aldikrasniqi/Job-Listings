module.exports = {
  success: (value) => {
    return {
      confirmed: true,
      results: value,
    };
  },
  fail: (err) => {
    return {
      confirmed: false,
      results: err,
    };
  },
};
