import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
// import fd3 from '   '

// var sectionStyle = {
//     backgroundImage: `url(${"https://source.unsplash.com/random/900x700/?burger"})`
//  }
function Signup() {

    

    // const [credentials,setcredentials] =useState({name:"",email:"",password:"",geolocation:""})
    const [credentials,setcredentials] =useState({name:"",email:"",password:""})
    let navigate = useNavigate()
    const handleSubmit = async(e) =>{
        e.preventDefault()
        // console.log(JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, geolocation:credentials.geolocation}))
        console.log(JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password}))
        const response=await fetch('http://localhost:5050/api/createuser',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, geolocation:credentials.geolocation})
        body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password})
        })
        const json = await response.json()
        console.log(json);  
        if(!json.success){
            alert("Enter Valid credentials")
        }
        else{
            localStorage.setItem('token',json.authToken)
            navigate("/login")
        }
    }
    const onChange=(e) =>{ 
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <>
    <div className="container mt-5  ">
    {/* <div className="container " >
    <Card.Header className='bg-success'></Card.Header>
        <form onSubmit={handleSubmit}> 
    <div className="mb-3">
        <label htmlFor="name" className="form-label ">Name</label>
        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
     
    </div>
    <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label ">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} aria-describedby="emailHelp"  onChange={onChange}/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label ">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password}  onChange={onChange}/>
    </div>
    
    
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to ='/login' className="m-3 btn btn-danger">Already a User</Link>
    <Link to ='/' className="m-3 btn btn-danger">Continue As Guest</Link>
    </form>
    <Card.Header className='bg-success'></Card.Header>
    </div> */}



    
  <div className="carousel-inner rounded " id='carousel'>

  <div class="carousel-caption" style={{zIndex:"1"}}> 
        <div className="container">
        {/* <form className="d-flex"> */}
      
      <div className="container mb-5 " >
    
        <form onSubmit={handleSubmit}> 
        <div className="display-2 mb-3 border rounded" >HUNGER MEALZ</div>
    <div className="mb-3">
        <label htmlFor="name" className="form-label display-6">Name</label>
        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
     
    </div>
    <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label display-6">Email Address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} aria-describedby="emailHelp"  onChange={onChange}/>
        
    </div>
    <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label display-6">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password}  onChange={onChange}/>
    </div>
    
    
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to ='/login' className="m-3 btn btn-danger">Already a User</Link>
    <Link to ='/' className="m-3 btn btn-danger">Continue As Guest</Link>
    </form>
   
    </div>
      
    {/* </form> */}
        </div>
    </div>

    <div className="carousel-item active  ">
      <img src="https://source.unsplash.com/random/900x700/?white-food" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" alt="..."/>
    </div>
   
  </div>
 

    </div>
    </>
  )
}

export default Signup


