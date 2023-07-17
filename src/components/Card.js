import React, { useEffect, useState,useRef  } from 'react'
import { useDispatchCart,useCart } from './ContextReducer'


function Card(props) {
    let dispatch=useDispatchCart()

    let data=useCart()
    const priceRef=useRef();

    let options = props.options
    let priceOptions= Object.keys(options)
    const [qty,setQty]=useState(1)
    const [size,setSize]=useState("")
    const handleAddToCart=async()=>{
        let food=[]
        for(const item of data){
            if(item.id===props.foodItem._id){
                food=item
                break
            }
        }
        console.log(food);

        // some problem in this

        if(food!==[]){ 
            if(food.size===size){
                // img:props.foodItem.img you can remove this 
                await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice,qty:qty,img:props.foodItem.img})
                return
            }
            
            else if(food.size !== size){
                // img:props.foodItem.img
                await dispatch({type: "ADD",id:props.foodItem._id,name:props.foodItem.name,
                price:finalPrice,qty:qty,size:size,img:props.foodItem.img})
                // console.log(data)
                return
            }
            return
        }
        // img:props.foodItem.img
        await dispatch({type: "ADD",id:props.foodItem._id, name:props.foodItem.name, price:finalPrice ,qty:qty, size:size,img:props.foodItem.img})
    }
    let finalPrice=qty*parseInt(options[size]);
    useEffect(()=>{ 
        setSize(priceRef.current.value)
    },[])

    return (
        <div className="shadow-lg p-3 mb-5 bg-body rounded">
            <div className="card mt-3 " style={{ "width": "18rem", "maxHeight": "480px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"140px",objectFit:"fill"}}/>
                <div className="card-body">
                    <h5 className="card-title text-white fw-bold">{props.foodItem.name}</h5>
                    <p className="card-text text-light">{props.foodItem.description}</p>
                    <div className="container w-100">
                        <select className="m-2 h-100  bg-success rounded"onChange={ (e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        {/* <select className="m-2 h-100  bg-success rounded" ref={priceRef}onChange={ (e)=>setSize(e.target.value)}> */}
                        <select className="m-2 h-10  button-87" ref={priceRef}onChange={ (e)=>setSize(e.target.value)}>
                            {
                                priceOptions.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                })
                            }
                        </select>

                        <div className='d-inline h-100 fs-5'>
                        ₹{finalPrice}/-
                        </div>
                    </div>
                        <hr/>
                        {/* <button className='btn btn-success justify-center ms-2' onClick={ handleAddToCart}>ADD TO CART</button> */}
                        
                        <button className='button-78 justify-center ms-2 4' onClick={ handleAddToCart}>ADD TO CART</button>


                </div>
            </div>
        </div>
    )
}

export default Card