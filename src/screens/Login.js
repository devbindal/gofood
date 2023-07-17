
import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Login() {
    let navigate=useNavigate()
    const [credentials,setcredentials] =useState({email:"",password:""})
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const response=await fetch('http://localhost:5050/api/loginuser',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json = await response.json()
        console.log(json);
        if(!json.success){
            alert("Enter Valid credentials")
        }
        if(json.success){
          localStorage.setItem("userEmail",credentials.email);
          localStorage.setItem("authToken",json.authToken);
          console.log(localStorage.getItem("authToken"));
          if(credentials.email==="admin@gmail.com"){
            navigate("/admin")
          }
          else navigate("/")
        }
    }
    const onChange=(e) =>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div>
      
{/* // */}


<div className="container mt-5 ">  
  <div className="carousel-inner rounded" id='carousel'>

  <div class="carousel-caption" style={{zIndex:"1"}}> 
        <div className="container">
        {/* <form className="d-flex"> */}
      
      <div className="container mb-5  " >
    
        <form onSubmit={handleSubmit}> 
    <div className="display-2 mb-5 border rounded" >HUNGER MEALZ</div>
    <div className="mb-5 ">
        <label htmlFor="exampleInputEmail1" className="form-label display-6">Email Address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} aria-describedby="emailHelp"  onChange={onChange}/>
        
        
    </div>
    <div className="mb-5 ">
        <label htmlFor="exampleInputPassword1" className="form-label display-6">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password}  onChange={onChange}/>
    </div>
    
    
    <button type="submit" className="btn btn-primary">Submit</button>
<Link to ='/createuser' className="m-3 btn btn-danger">new User?</Link>
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

    
{/* // */}


 
    </div>
  )
}

export default Login