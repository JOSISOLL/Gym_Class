const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const RSA_PRIVATE_KEY = "secret-key"
const Reg = require('../models/registration')


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

function verifyToken(req, res, next){
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]

    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }

    let payload = jwt.verify(token, RSA_PRIVATE_KEY)
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()

}

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
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, RSA_PRIVATE_KEY)
            res.status(200).send({token})
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
                    let payload = {
                        subject : user._id
                    }
                    let token = jwt.sign(payload, RSA_PRIVATE_KEY)
                    res.status(200).send({token })
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
                    let payload = { subject : admin._id }
                    let token = jwt.sign(payload, RSA_PRIVATE_KEY)
                    res.status(200).send({token})
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
            "date" : "Monday",
            "time" : "18:00 - 19:00"
        },
        {
            "_id" : "2",
            "name": "Rmtha Yoga",
            "description" : "Rmtha Yoga",
            "date" : "Monday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "3",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Monday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "4",
            "name": "Combined Training",
            "description" : "Combined Training",
            "date" : "Tuesday",
            "time" : "18:00 - 19:00"
        },
        {
            "_id" : "5",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Tuesday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "6",
            "name": "Flow Yoga",
            "description" : "Flow Yoga",
            "date" : "Tuesday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "7",
            "name": "Kick Boxing",
            "description" : "Kick Boxing",
            "date" : "Wednesday",
            "time" : "18:00 - 19:00"
        },
        {
            "_id" : "8",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Wednesday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "9",
            "name": "Ashtanga Yoga",
            "description" : "Ashtanga Yoga",
            "date" : "Wednesday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "10",
            "name": "Flow Yoga",
            "description" : "Flow Yoga",
            "date" : "Thursday",
            "time" : "18:00 - 19:00"
        },
        {
            "_id" : "11",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Thursday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "12",
            "name": "Jazz",
            "description" : "Jazz",
            "date" : "Thursday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "13",
            "name": "Pilates",
            "description" : "Pilates",
            "date" : "Friday",
            "time" : "18:00 - 19:00"
        },{
            "_id" : "14",
            "name": "Step Aerobics",
            "description" : "Step Aerobics",
            "date" : "Friday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "15",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Friday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "16",
            "name": "Back Side Shaping",
            "description" : "Back Side Shaping",
            "date" : "Saturday",
            "time" : "18:00 - 19:00"
        },{
            "_id" : "17",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Ssturday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "18",
            "name": "Kick Boxing",
            "description" : "Kick Boxing",
            "date" : "Saturday",
            "time" : "19:10 - 20:10"
        },{
            "_id" : "19",
            "name": "Speed Reduction",
            "description" : "Speed Reduction",
            "date" : "Sunday",
            "time" : "18:00 - 19:00"
        },{
            "_id" : "20",
            "name": "Pilates",
            "description" : "Pilates",
            "date" : "Sunday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "21",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Sunday",
            "time" : "19:10 - 20:10"
        }
]
    res.json(sessions)

})

router.get('/sessions/register' , verifyToken, (req, res) => {
    let sessions = [
        {
            "_id" : "1",
            "name": "Step Aerobics",
            "description" : "Step Aerobics",
            "date" : "Monday",
            "time" : "18:00 - 19:00"
        },
        {
            "_id" : "2",
            "name": "Rmtha Yoga",
            "description" : "Rmtha Yoga",
            "date" : "Monday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "3",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Monday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "4",
            "name": "Combined Training",
            "description" : "Combined Training",
            "date" : "Tuesday",
            "time" : "18:00 - 19:00"
        },
        {
            "_id" : "5",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Tuesday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "6",
            "name": "Flow Yoga",
            "description" : "Flow Yoga",
            "date" : "Tuesday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "7",
            "name": "Kick Boxing",
            "description" : "Kick Boxing",
            "date" : "Wednesday",
            "time" : "18:00 - 19:00"
        },
        {
            "_id" : "8",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Wednesday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "9",
            "name": "Ashtanga Yoga",
            "description" : "Ashtanga Yoga",
            "date" : "Wednesday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "10",
            "name": "Flow Yoga",
            "description" : "Flow Yoga",
            "date" : "Thursday",
            "time" : "18:00 - 19:00"
        },
        {
            "_id" : "11",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Thursday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "12",
            "name": "Jazz",
            "description" : "Jazz",
            "date" : "Thursday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "13",
            "name": "Pilates",
            "description" : "Pilates",
            "date" : "Friday",
            "time" : "18:00 - 19:00"
        },{
            "_id" : "14",
            "name": "Step Aerobics",
            "description" : "Step Aerobics",
            "date" : "Friday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "15",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Friday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "16",
            "name": "Back Side Shaping",
            "description" : "Back Side Shaping",
            "date" : "Saturday",
            "time" : "18:00 - 19:00"
        },{
            "_id" : "17",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Ssturday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "18",
            "name": "Kick Boxing",
            "description" : "Kick Boxing",
            "date" : "Saturday",
            "time" : "19:10 - 20:10"
        },{
            "_id" : "19",
            "name": "Speed Reduction",
            "description" : "Speed Reduction",
            "date" : "Sunday",
            "time" : "18:00 - 19:00"
        },{
            "_id" : "20",
            "name": "Pilates",
            "description" : "Pilates",
            "date" : "Sunday",
            "time" : "19:10 - 20:10"
        },
        {
            "_id" : "21",
            "name": "Spinning Class",
            "description" : "Spinning Class",
            "date" : "Sunday",
            "time" : "19:10 - 20:10"
        }
]
    res.json(sessions)

})

// router.post('sessions_registration', (req, res) =>{
//     let regData = req.body
//     reg = new Reg(regData)
//     console.log('attempting to register for a session')
//     reg.save((error, regSession ) => {
//         if(error){
//             console.log(error)
//         } else {
//             res.status(200).send(regSession)
//         }
//     })
//     res.status(200).send("Works perfect")
// })

router.post('/sessions/registration', (req, res) =>{
    
    let regData = req.body
    reg = new Reg(regData)
    console.log('attempting to register for a session')
    reg.save((error, regSession ) => {
        if(error){
            console.log(error)
        } else {
            res.status(200).send(regSession)
        }
    })

})

module.exports = router