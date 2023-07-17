

import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'
import abc from '../components/abc.gif'

function Admin() {
  const ss = {
    color: 'white',
    fontSize: "8ch",
    fontFamily: "Copperplate, Courier New, fantasy",
    textShadow: "5px 5px 10px #55c0a0",
    fontWeight: "bold",
  }

  const [Emp, setEmp] = useState(0);
  const [orders, setOrders] = useState(0);
  const [items, setItems] = useState(0);
  const [repC, setRepC] = useState(0);
  const [cost, setCost] = useState(0);

  const fetchOrder = async () => {
    let response = await fetch("http://localhost:5050/api/admin-data", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    response = await response.json();
    let arr = response.adminOrderedData;
    setEmp(arr.length);

    // console.log(arr);

    let tOrder = 0;
    let tItems = 0;
    let repeatingC = 0;
    let totalCost = 0;
    //this loop for no of customers
    arr.forEach((value) => {

      let orderData = value.order_data;
      if (orderData.length > 1) {
        repeatingC = repeatingC + 1;
      }
      // this loop for total orders by a user
      orderData.forEach((value) => {
        let userOrderArray = value;
        //this loop for every order by that user

        userOrderArray.forEach((value) => {
          if ('price' in value) {
            totalCost = totalCost + value.price;
          }
        })
        tItems = tItems + userOrderArray.length - 1;
      })
      tOrder = tOrder + orderData.length;

    })
    setOrders(tOrder)
    setItems(tItems);
    setRepC(repeatingC)
    setCost(totalCost);

    //console.log(response.adminOrderedData);
    //setData(response.adminOrderedData);
    //console.log(data);
  };

  useEffect(() => {
    fetchOrder()
  }, [])


  return (
    <div>
      <AdminNavbar />

      <div className="container mt-5 ">
        <div className="carousel-inner rounded-circle" id='carousel'>

          <div classname="carousel-caption" style={{ zIndex: "1" }}>
            <div className="container">
              {/* <form className="d-flex"> */}

              {/* <div className="container mb-5  " > */}

              {/* <form >  */}
              {/* <p style={ss}>Welcome Back ADMIN </p> */}
              {/* <div className="display-2 mb-5 border rounded" >HUNGER FOODZ</div> */}
              {/* </form> */}

              {/* </div> */}

              {/* </form> */}
            </div>
          </div>

          <div className="carousel-item active  ">
            {/* <img src="https://source.unsplash.com/random/900x700/?loner" className="d-block w-100" alt="..."/> */}
            <img src={abc} className="d-block w-100" alt="..." />
          </div>


        </div>


      </div>


      <div className="container mt-5">

        <h1 style={ss}>WELCOME BACK ADMIN</h1>

        <div>Total revenue generated till now : ₹ {cost}</div>

        <div>Total no. of active customers : {Emp}</div>
        <div>Total no. of orders : {orders}</div>
        <div>Total items ordered : {items}</div>
        <div>Total no. of repeating customers : {repC}</div>




      </div>
      <div className="container mt-5">
        <div className="card text-center">
          <div className="card-header button-29 fs-2">
            REVENUE
          </div>
          <div className="card-body">
            <h5 className="card-title">Total revenue generated till now :</h5>
            
            <a  className="btn button-78 fs-2">₹ {cost}</a>
          </div>
          <div className="card-footer text-muted">
           
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="card text-center">
          <div className="card-header button-29 fs-2">
            ORDERS
          </div>
          <div className="card-body">
            <h5 className="card-title">Total no. of orders :</h5>
            
            <a  className="btn button-78 fs-2"> {orders}</a>
          </div>
          <div className="card-footer text-muted">
           
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="card text-center">
          <div className="card-header button-29 fs-2">
            ITEMS
          </div>
          <div className="card-body">
            <h5 className="card-title">Total items ordered :</h5>
            
            <a  className="btn button-78 fs-2">{items}</a>
          </div>
          <div className="card-footer text-muted">
           
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="card text-center">
          <div className="card-header button-29 fs-2">
            TOTAL CUSTOMERS
          </div>
          <div className="card-body">
            <h5 className="card-title">Total no. of customers :</h5>
            
            <a  className="btn button-78 fs-2">{Emp}</a>
          </div>
          <div className="card-footer text-muted">
           
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="card text-center">
          <div className="card-header button-29 fs-2">
            REPEATING CUSTOMERS
          </div>
          <div className="card-body">
            <h5 className="card-title">Total no. of repeating customers :</h5>
            
            <a  className="btn button-78 fs-2"> {repC}</a>
          </div>
          <div className="card-footer text-muted">
           
          </div>
        </div>
      </div>




    </div>
  )
}

export default Admin