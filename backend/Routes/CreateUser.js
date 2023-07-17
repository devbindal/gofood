const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const jwtSecret = "weuiorfjsdkcxnmwersfdytghbn"

router.post("/createuser", [
    // username must be an email//same as req.body but with same validation
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', "incorrect password").isLength({ min: 5 })], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //if validations are not met it will print 
            // invalid value or incorrect password
            return res.status(400).json({ errors: errors.array() });
        }

        const salt=await bcrypt.genSalt(10)
        let secPassword=await bcrypt.hash(req.body.password,salt)
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                // location: req.body.location
                // name:"Shyam",
                // password:"123445",
                // email:"shyam@gmail.com",
                // location:"232311vvv"
            }).then(res.json({ success: true }))

        } catch (err) {
            console.log(err)
            res.json({ success: false });
        }
    })

router.post("/loginuser", 
    [
    // username must be an email//same as req.body but with same validation
    body('email').isEmail(),
    body('password', "incorrect password").isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //if validations are not met it will print 
            // invalid value or incorrect password
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email
        try {
            let userData = await User.findOne({ email })
            if (!userData) {
                return res.status(400).json({ errors: "User not found" });
            }
            const pwdCompare=await bcrypt.compare(req.body.password,userData.password)

            // console.log(userData.password+"...."+req.body.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Password Incorrect" });
            }
            const data={
                user:{
                    id:userData.id
                }
            }
            const authToken=jwt.sign(data,jwtSecret)
            return res.json({ success: true,authToken:authToken });

        } catch (err) {
            console.log(err)
            res.json({ success: false });
        }
    })

module.exports = router