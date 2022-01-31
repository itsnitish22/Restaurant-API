const mongoose = require("mongoose")

//define a restaurant schema

const restaurantSchema = new mongoose.Schema({
    name: String,
    cuisine: String,
    hasTakeout: Boolean
})

module.exports = mongoose.model("Restaurant", restaurantSchema)