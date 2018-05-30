const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const RSA_PRIVATE_KEY = "secret-key"
const Admin_RSA_PRIVATE_KEY = "admin-secret-key"
const Reg = require('../models/registration')
const Session = require('../models/session')


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
function adminVerifyToken(req, res, next){
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]

    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }

    let payload = jwt.verify(token, Admin_RSA_PRIVATE_KEY)
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

router.post('/session/add', (req, res) =>{
    console.log("Trying to add a new session")
    let sessionData = req.body
    let session = new Session(sessionData)

    session.save((error, addedSession) => {
        if(error){
            console.log(error)
        } else {
            res.status(200).send(addedSession)
            console.log(addedSession.title + ' session successfully added!')
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

router.get('/sessions/register' , verifyToken, (req, res) => {
    Session.find(function (error, sessions){
        if (error){
            console.log(error)
        } else {
            res.json(sessions)
            console.log("Sessions fetched from database")
        }
    })
})

router.delete('/sessions/delete/:id', (req, res) => {
    Session.findOneAndRemove({_id : req.params.id}, function (err,data){
        if(err){
            console.log(err)
        } else {
            if(!data){
                status = "This session doesn't exist."
                res.status(401).send({status: status})

            }else{
                console.log(data)
            }
            
        }
    } )
    

})
router.get('/sessions/registerd/:id',verifyToken, (req, res) => {
    console.log(req.params)
    Reg.find({sessionId : req.params.id}, (error, sessions) =>{

        if( error ){
            console.log(error)
        } else {
            if(!sessions){
                res.status(401).send("No one has registered for this session yet.")
            } else {
                res.status(200).send(sessions)                
            }
        }
    })
    

})
router.get('/sessions/registerd', (req, res) =>{
    Reg.find({},function (error, regUsers){
        if(error){
            console.log(error)
        } else {
            res.json(regUsers)
            console.log("Registered users for all sessions fetched from database")
        }
    })
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

router.post('/sessions/registration', verifyToken, (req, res) =>{
    
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

router.post('/sessions/add', (req, res) => {
    let sesData = req.body
    session = new Session(sesData)
    console.log('Admin attempting to add a session')
    session.save((error, addedSession) =>{
        if (error){
            console.log(error)
        } else{
            res.status(200).send(regSession)
        }
    })
})

router.get('/sessions', (req, res) => {
    Session.find(function (error, sessions){
        if (error){
            console.log(error)
        } else {
            res.json(sessions)
            console.log("Sessions fetched from database")
        }
    })
})
router.get('/sessions/:id', verifyToken, (req, res) => {
    Session.findById(req.id, req.body, function (error, sessions){
        if (error){
            console.log(error)
        } else {
            res.json(sessions)
            console.log("Sessions fetched from database")
        }
    })
})

module.exports = router