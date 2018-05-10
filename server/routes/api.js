const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Admin = require('../models/admin')


const mongoose = require('mongoose')
const db = "mongodb://admin:password@ds119110.mlab.com:19110/gym_db"

var db_name = "ds119110.mlab.com:19110/gym_db"

mongoose.connect(db, err => {
    if (err){
        console.error('Error!' + err)
    } else {
        console.log('Connected to database:' + db_name)
    }


})

router.get('/', (req, res) =>{
    res.send('Hello from API')
})

router.post('/register', (req , res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser ) => {
        if(error){
            console.log(error)
        } else {
            res.status(200).send(registeredUser)
        }
    })

})

router.post('/login', (req, res) =>{
    let userData = req.body

    User.findOne({phonenumber: userData.phone}, (error, user) => {
        if( error ){
            console.log(error)
        } else {
            if(!user){
                res.status(401).send("The username doesn't exist")
            } else {
                if (user.password !== userData.password){
                    res.status(401).send("Invalid password")
                } else {
                    res.status(200).send(user)
                }
            }
        }
    })

})

router.post('/admin', (req, res) =>{
    let adminData = req.body

    Admin.findOne({username: adminData.username}, (error, admin) => {
        if( error ){
            console.log(error)
        } else {
            if(!admin){
                res.status(401).send("You are not authorized to login to admin panel!")
            } else {
                if (admin.password !== adminData.password){
                    res.status(401).send("Invalid password")
                } else {
                    res.status(200).send(admin)
                }
            }
        }
    })

})

router.get('/sessions' , (req, res) => {
    let sessions = [
        {
            "_id" : "1",
            "name": "Step Aerobics",
            "description" : "Step Aerobics",
            "date" : "Monday 18:00 - 19:00"
        },
        {
            "_id" : "2",
            "name": "Rmtha Yoga",
            "description" : "Rmtha Yoga",
            "date" : "Monday 19:10 - 20:10"
        },
        {
            "_id" : "3",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Monday 19:10 - 20:10"
        },
        {
            "_id" : "4",
            "name": "Combined Training",
            "description" : "Combined Training",
            "date" : "Tuesday 18:00 - 19:00"
        },
        {
            "_id" : "5",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Tuesday 19:10 - 20:10"
        },
        {
            "_id" : "6",
            "name": "Flow Yoga",
            "description" : "Flow Yoga",
            "date" : "Tuesday 19:10 - 20:10"
        },
        {
            "_id" : "7",
            "name": "Kick Boxing",
            "description" : "Kick Boxing",
            "date" : "Wednesday 18:00 - 19:00"
        },
        {
            "_id" : "8",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Wednesday 19:10 - 20:10"
        },
        {
            "_id" : "9",
            "name": "Ashtanga Yoga",
            "description" : "Ashtanga Yoga",
            "date" : "Wednesday 19:10 - 20:10"
        },
        {
            "_id" : "10",
            "name": "Flow Yoga",
            "description" : "Flow Yoga",
            "date" : "Thursday 18:00 - 19:00"
        },
        {
            "_id" : "11",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Thursday 19:10 - 20:10"
        },
        {
            "_id" : "12",
            "name": "Jazz",
            "description" : "Jazz",
            "date" : "Thursday 19:10 - 20:10"
        },
        {
            "_id" : "13",
            "name": "Pilates",
            "description" : "Pilates",
            "date" : "Friday 18:00 - 19:00"
        },{
            "_id" : "14",
            "name": "Step Aerobics",
            "description" : "Step Aerobics",
            "date" : "Friday 19:10 - 20:10"
        },
        {
            "_id" : "15",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Friday 19:10 - 20:10"
        },
        {
            "_id" : "16",
            "name": "Back Side Shaping",
            "description" : "Back Side Shaping",
            "date" : "Saturday 18:00 - 19:00"
        },{
            "_id" : "17",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Ssturday 19:10 - 20:10"
        },
        {
            "_id" : "18",
            "name": "Kick Boxing",
            "description" : "Kick Boxing",
            "date" : "Saturday 19:10 - 20:10"
        },{
            "_id" : "19",
            "name": "Speed Reduction",
            "description" : "Speed Reduction",
            "date" : "Sunday 18:00 - 19:00"
        },{
            "_id" : "20",
            "name": "Pilates",
            "description" : "Pilates",
            "date" : "Sunday 19:10 - 20:10"
        },
        {
            "_id" : "21",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Sunday 19:10 - 20:10"
        }
]
    res.json(sessions)

})

router.get('/sessions/register' , (req, res) => {
    let sessions = [
        {
            "_id" : "1",
            "name": "Step Aerobics",
            "description" : "Step Aerobics",
            "date" : "Monday 18:00 - 19:00"
        },
        {
            "_id" : "2",
            "name": "Rmtha Yoga",
            "description" : "Rmtha Yoga",
            "date" : "Monday 19:10 - 20:10"
        },
        {
            "_id" : "3",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Monday 19:10 - 20:10"
        },
        {
            "_id" : "4",
            "name": "Combined Training",
            "description" : "Combined Training",
            "date" : "Tuesday 18:00 - 19:00"
        },
        {
            "_id" : "5",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Tuesday 19:10 - 20:10"
        },
        {
            "_id" : "6",
            "name": "Flow Yoga",
            "description" : "Flow Yoga",
            "date" : "Tuesday 19:10 - 20:10"
        },
        {
            "_id" : "7",
            "name": "Kick Boxing",
            "description" : "Kick Boxing",
            "date" : "Wednesday 18:00 - 19:00"
        },
        {
            "_id" : "8",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Wednesday 19:10 - 20:10"
        },
        {
            "_id" : "9",
            "name": "Ashtanga Yoga",
            "description" : "Ashtanga Yoga",
            "date" : "Wednesday 19:10 - 20:10"
        },
        {
            "_id" : "10",
            "name": "Flow Yoga",
            "description" : "Flow Yoga",
            "date" : "Thursday 18:00 - 19:00"
        },
        {
            "_id" : "11",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Thursday 19:10 - 20:10"
        },
        {
            "_id" : "12",
            "name": "Jazz",
            "description" : "Jazz",
            "date" : "Thursday 19:10 - 20:10"
        },
        {
            "_id" : "13",
            "name": "Pilates",
            "description" : "Pilates",
            "date" : "Friday 18:00 - 19:00"
        },{
            "_id" : "14",
            "name": "Step Aerobics",
            "description" : "Step Aerobics",
            "date" : "Friday 19:10 - 20:10"
        },
        {
            "_id" : "15",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Friday 19:10 - 20:10"
        },
        {
            "_id" : "16",
            "name": "Back Side Shaping",
            "description" : "Back Side Shaping",
            "date" : "Saturday 18:00 - 19:00"
        },{
            "_id" : "17",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Ssturday 19:10 - 20:10"
        },
        {
            "_id" : "18",
            "name": "Kick Boxing",
            "description" : "Kick Boxing",
            "date" : "Saturday 19:10 - 20:10"
        },{
            "_id" : "19",
            "name": "Speed Reduction",
            "description" : "Speed Reduction",
            "date" : "Sunday 18:00 - 19:00"
        },{
            "_id" : "20",
            "name": "Pilates",
            "description" : "Pilates",
            "date" : "Sunday 19:10 - 20:10"
        },
        {
            "_id" : "21",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Sunday 19:10 - 20:10"
        }
]
    res.json(sessions)

})

module.exports = router