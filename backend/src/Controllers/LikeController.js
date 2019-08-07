const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  async store(req, res) {
    const { devId } = req.params;
    const { user } = req.headers;

    const logedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: "Dev not exists" });
    }

    if (targetDev.likes.includes(logedDev._id)) {
      return res.json({ message: "Match" });
    }

    logedDev.likes.push(targetDev._id);

    await logedDev.save();

    return res.json(logedDev);
  }
};
