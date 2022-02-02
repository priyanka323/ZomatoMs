import express from "express";

import {FoodModel} from "../../database/allModel";

const Router = express.Router();

/*
Route         /
Des           get all the food based on particular resturant
params        _id
access        Public
Method        get

*/

Router.get("/:_id", async(req,res)=> {
  try {
    const {_id} = req.params;
    const foods = await FoodModel.find({resturant: _id});
    return res.json({foods});

  } catch (error) {
    return res.status(500).json({error: error.meeage});
  }
});

/*
Route         /r
Des           get all the food based on particular category
params        category
access        Public
Method        get

*/

Router.get("/r/:category", async(req,res)=> {
  try {
    const {category} = req.params;
    const foods = await FoodModel.find({
      category: {$regex: category, $options: "i"}       //i-insenstive like uper lower case alphabet manage
    });
    return res.json({foods});
  } catch (error) {
    return res.status(500).json({error:error.message});
  }
});
export default Router;
