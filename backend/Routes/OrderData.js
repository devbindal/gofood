
const express = require('express')
const router = express.Router()
const Order=require('../models/Orders')

router.post('/orderData', async (req, res) => {

    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ email: req.body.email })    
    console.log(eId+"..................")
    if (eId === null) {
        try {
         
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            //if it is not written this way then next when order is placed it will update (not append) the data
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
            // res.status(400).send((error.message).toString());
        }
    }
})

router.post('/myorderData', async (req, res) => {
    try{

        let myData=await Order.findOne({'email':req.body.email})
        res.json({orderData:myData})
    }catch(error){
        // console.log(err)
        res.send("Server error", error.message)
    }
})

router.post('/admin-data',async (req,res)=>{
    try{
        let adminData=await Order.find();
        res.json({adminOrderedData:adminData})
    }catch(error){
        res.send("server error",error.message)
    }
})

module.exports = router