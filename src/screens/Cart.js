import React from 'react'
import trash from './garbage-bin-10420.png'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import { useNavigate } from 'react-router-dom'
function Cart() {
    const navigate =useNavigate();
    let data=useCart()
    // console.log(data)
    let dispatch=useDispatchCart()
    if(data.length===0){
        return(
            <div>
                <div className="m-5 w-100 text-center fs-3">The cart is empty</div>
            </div>
        )
    }
    const handleCheckOut=async()=>{
        
        let userEmail=localStorage.getItem("userEmail")
        console.log(userEmail)
        let response=await fetch("http://localhost:5050/api/orderData",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email:userEmail,
                order_date:new Date().toDateString()
            })
        })
        console.log("///////////////////"+response)
        if(response.status===200){
            dispatch({type:"DROP"})
            navigate("/feedback")
        }
    }

    let totalPrice=data.reduce((total,food)=>total+food.price,0)
  return (
    <div>
        <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
            <table className="table table-hover">
                <thead className="text-warning fs-4">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Option</th>
                        <th scope="col">Amount</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((food,index) =>(
                        <tr>
                            <th scope='row'>{index+1}</th>
                            <td>{food.name}</td>
                            <td>{food.qty}</td>
                            <td>{food.size}</td>
                            <td>{food.price}</td>
                            <td><button type="button" className="btn p-0">
                                <img src={trash} alt="delete" height="30" width="30" onClick={()=>{dispatch({type:"REMOVE",index:index})}}/></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div><h1 className='fs-2'>Total Price:₹{totalPrice}/-</h1></div>
            <div>
                <button className='btn bg-success mt-5 fs-5' onClick={handleCheckOut}>Check Out</button>
            </div>
        </div>
    </div>
  )
}

export default Cart