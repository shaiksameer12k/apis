const logInApi = (req, res) => {
  let payload = req.body;
  return res.send(payload);
};
module.exports = logInApi;
