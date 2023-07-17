import React,{useState} from "react";
import { useNavigate } from 'react-router-dom'


function Feedback(){
        const [feed,setfeed] =useState({name:"",feedb:""});
        const navigate=useNavigate();
        const handleChange=(e)=>{
                setfeed({...feed,[e.target.name]:e.target.value})
        }
        const handleSubmit=(e)=>{
            e.preventDefault();
            navigate("/")
            setfeed({name:"",feedb:""})
        }
    return (
        <div className='container'>
            <div className="mb-3">
                <p className="fs-2 text-center">Thank you for ordering!!</p>
                <p className="fs-2 text-center">Please share your valueable feedback.</p>
            </div>
           <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" class="form-label">Full Name</label>
            <input type="text" class="form-control" name='name' value={feed.name} id="exampleFormControlInput1" onChange={handleChange} />
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" class="form-label">Feedback</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" name='feedb' value={feed.feedb} rows="3" onChange={handleChange
            }></textarea>
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </div>
    )
}

export default Feedback;