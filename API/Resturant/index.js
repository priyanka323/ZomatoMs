import express from "express";

import {ResturantModel} from "../../database/allModel";
import {ValidateRestaurantCity, ValidateRestaurantSearchString} from "../../validation/resturant";
import {ValidateRestaurantId} from "../../validation/food";
const Router = express.Router();

/*
Route         /
Des           get all the  resturant details
params        none
access        Public
Method        get

*/
Router.get("/", async(req,res)=> {
  try {
    await ValidateRestaurantCity(req.query);
    const {city} = req.query;
    const resturants = await ResturantModel.find({city});
    return res.json({resturants});

  } catch (error) {
    return res.status(500).json({error: error.meeage});
  }
});

/*
Route         /
Des           get a particular  resturant details basd on id
params        id
access        Public
Method        get

*/
Router.get("/:_id", async(req,res)=> {
  try {
    await ValidateRestaurantId(req.params);
    const {_id} = req.params;
    const restaurant = await RestaurantModel.findOne(_id);
    return res.json({restaurant});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

/*
/*
Route         /search
Des           get a particular  resturant details basd on id
params        searchstring
access        Public
Method        get

*/

Router.get("/search", async(req,res)=> {
  try {
    await ValidateRestaurantSearchString(req.body);
    const {searchString} = req.body;
    const restaurants = await RestaurantModel.find({
      name: {$regex: searchString, $options: "i"}
    });
    return res.json({restaurants});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

export default Router;
