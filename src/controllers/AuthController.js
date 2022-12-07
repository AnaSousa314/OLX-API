const mongoose = require("mongoose");
const { validationResult, matchedData } = require("express-validator");
const bcrypt = require('bcrypt');

const User = require("../models/User");
const State = require("../models/State");

module.exports = {
  signin: async (req, res) => {},

  signup: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
      return;
    }

    const data = matchedData(req);

    // Verificando se o e-mail já existe
    const user = await User.findOne({
      email: data.email,
    });

    if (user) {
      res.json({
        error: {
          email: { msg: "E-mail já existe" },
        },
      });
      return;
    }

    // Verificando se o Estado existe
    if (mongoose.Types.ObjectId.isValid(data.state)) {
      const stateItem = await State.findById(data.state);
      if (!stateItem) {
        res.json({
          error: {
            email: { msg: "Estado não existe" },
          },
        });
        return;
      }
    } else {
      res.json({
        error: {
          email: { msg: "Código de Estado inválido" },
        },
      });
      return;
    }

    const passwordHash = await bcrypt.hash(data.passwordHash, 10);
    
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newUser = new User({
      name: data.name,
      email: data.email,
      passwordHash: passwordHash,
      token,
      state: data.state
    });

    await newUser.save();

    res.json({ token });
    // res.json({ tudocerto: true, data });
  },
};
