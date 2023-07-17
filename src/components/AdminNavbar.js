import React from 'react'
import '../Button.css'
import { Link,useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import Cart from '../screens/Cart'
import Modal from '../Modal'
import { useCart } from './ContextReducer'
import { useState,useEffect } from 'react'

function Navbar() {

  let data=useCart()
  const [cartView,setCartView]=useState(false)
  const navigate=useNavigate()
  const handleLogout=() => {
    localStorage.removeItem("authToken")
    navigate("/")
  }
  

    return (
      <div>
      {/* <button class="button-92" role="button">Button 92</button> */}
        <nav className="navbar navbar-expand-lg navbar-light bg-success ">
  <div className="container-fluid">
    <Link className="button-29 text-white fs-1  " to="/">Hunger Mealz</Link>
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        
        {/* <li className="nav-item button-29 text-white mx-2">
          <Link className="nav-link active fs-5 " aria-current="page" to="/">Home</Link>
          <Link className="nav-link active fs-5 " aria-current="page" to="/">Home</Link>
        </li> */}

        {
          //checks whether user is signed in or not
        (localStorage.getItem("authToken"))?
        <li className="nav-item ">
        {/* <Link className="nav-link active fs-5 button" aria-current="page" to="/myOrder">My Orders</Link> */}
        {/* <Link className="nav-link active fs-5 button-29" aria-current="page" to="/myOrder">My Orders</Link> */}
        </li>
        :""}
      </ul>

      {/* if the user is not loogen in then it will show login and sign up */}
      {(!localStorage.getItem("authToken"))?
      <div>
        
          <Link className="button-29 text-white mx-1" to="/login">Login</Link>

          <Link className="button-29 text-white mx-1" to="/createuser">Signup</Link>
          {/* <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link> */}

      </div>
      :
      <div>
        {/* <div className="btn bg-white text-success mx-2" onClick={()=>setCartView(true)}>My Cart{" "}
        <Badge pill bg='danger'>{data.length}</Badge>
        </div> */}
        {
          cartView?<Modal onClose={()=>setCartView(false)} ><Cart/></Modal>:null
        }
        <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div>
      </div>
      }

    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar