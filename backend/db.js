const mongoose = require('mongoose')
const mongoURI='mongodb+srv://rubhav12:asdfghj@cluster0.vdkurqj.mongodb.net/HungerFoodzMern?retryWrites=true&w=majority'

// const mongoURI='mongodb://rubhav12:asdfghj@ac-kybshhq-shard-00-00.vdkurqj.mongodb.net:27017,ac-kybshhq-shard-00-01.vdkurqj.mongodb.net:27017,ac-kybshhq-shard-00-02.vdkurqj.mongodb.net:27017/HungerFoodzMern?ssl=true&replicaSet=atlas-2jssr0-shard-0&authSource=admin&retryWrites=true&w=majority'
// const mongoDB=async()=>{
//     await mongoose.connect(mongoURI,{useNewUrlParser:true},(err,res)=>{
//         if(err){
//             console,log("....."+er)
//         }
//         else console.log("connected")
//             }
//         );
// }

const mongoDB=async()=>{
        await mongoose.connect(mongoURI,{useNewUrlParser:true})
        .then(async()=>{
            console.log("Connected")
            let fetched_data=await mongoose.connection.db.collection("food_items");
              fetched_data.find({}).toArray(async(err,data)=>{
                    
                const foodCategory = await mongoose.connection.db.collection("foodCategory")
                foodCategory.find({}).toArray((err,catData)=>{
                    if(err)console.log(err);
                        else {
                            
                            global.food_items=data;
                            global.foodCategory=catData;
                        }
                })
                // if(err)console.log(err);
                        // else {
                        //     // console.log(data);
                        //     global.food_items=data;
                        //     // console.log(global.food_items);
                        // }
                    })
                   
        })
        .catch(err=>console.log("....."+err))      
    }

// const mongoDB=async()=>{
//     try{
//         await mongoose.connect(mongoURI)
//         console.log("Connect")
//         const fetched_data=await mongoose.connection.db.collection("food_items")
//         fetched_data.find({}).toArray(function(err,data){
//             if(err)console.log(err);
//             else console.log(data);
//         })
//     }
//     catch(err){console.log("..."+err)}
              
//     }

module.exports=mongoDB();
