const { nanoid } = require('nanoid')
const Restaurant = require('./models/Restaurant')

class Service {
    constructor() { }
    getRestaurants = async (req, res) => {
        //send back an array of restaurants
        const restaurants = await Restaurant.find()
        res.send(restaurants)
    }
    addRestaurant = async (req, res) => {
        //get the new restaurant properties
        const newRestaurant = await Restaurant.create(req.body)
        //mongo save each record with '_id'
        //but we changed it in the server where we are connecting to the database
        //send response, with new restaurant as 201 response
        res.code(201).send(newRestaurant)
    }
    getRestaurant = async (req, res) => {
        //get the id from params
        const { id } = req.params //shortcut to say const id = req.params.id
        //find the restaurant using id in the database
        const restaurant = await Restaurant.findById(id)
        //return the restaurant (if exist)
        if (restaurant) {
            res.send(restaurant)
        } else {
            res.code(404).send(`No restaurant with id '${id}' found`)
        }
        //else return 404 not found
    }
    updateRestaurant = async (req, res) => {
        //get the id from params
        const { id } = req.params //shortcut to say const id = req.params.id
        //find the restaurant index using id
        const restaurant = await Restaurant.findById(id)
        //return the restaurant (if exist)
        if (restaurant) {
            //update the restaurant
            await restaurant.update(req.body)
            res.code(204).send()
        } else {
            res.code(404).send(`No restaurant with id '${id}' found`)
        }
        //else return 404 not found
    }
    deleteRestaurant = async (req, res) => {
        //get the id from params
        const { id } = req.params //shortcut to say const id = req.params.id
        console.log(`the id is ${id}`)
        //find the restaurant index
        const restaurant = await Restaurant.findById(id)
        //remove the restaurant (if exist)
        if (restaurant) {
            //delete the restaurant
            Restaurant.findByIdAndRemove(id)
            const restauranttemp = await Restaurant.findById(id)
            Restaurant.findByIdAndRemove(id, function (err, docs) {
                if (err) {
                    console.log(err)
                }
            });
            console.log(`the restaurant is ${restauranttemp}`)
            res.code(204).send()
        } else {
            res.code(404).send(`No restaurant with id '${id}' found`)
        }
        //else return 404 not found
    }
}
module.exports = Service