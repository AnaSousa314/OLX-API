const State = require('../models/State');

module.exports = {

  getStates: async(req,res) =>{
    let states = await State.find();
    
    res.status(200).json({states});
  },

  info: async(req,res) =>{

  },

  editAction: async(req,res) =>{

  }

}