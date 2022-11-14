import {useNavigate,useParams} from "react-router-dom";
import { useState } from "react";
import {WiDirectionLeft} from 'react-icons/wi'
   


function AddRentals({handleAdd}) {

  const{owner_id}=useParams()

  const [add, setadd] = useState({available:true,
   owner_id:parseInt(owner_id)
  });
  const navigate=useNavigate()

  function onchange(e){
    const { name, value } = e.target;
    setadd({
      ...add,
      [name]: value
    });
  
  }

    function handleSubmit(e){
      e.preventDefault()
     console.log(add)
     fetch('https://find-a-motel.herokuapp.com/rentals', {
  method: 'POST',
  body: JSON.stringify(
    add
  ),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
  })
  .then(res=>res.json())
  .then(data=>{
    handleAdd(data)
    if(data.id===undefined){
     return navigate("/")
    }else
   return navigate(`/owner/${parseInt(owner_id)}/rentals`)
  })
        
    }



  return (
    <div>
    <nav className="cartNav" >
         <WiDirectionLeft  size={28} className="back" onClick={() => navigate(-1)}/>
         <p style={{fontStyle:"italic",fontSize:"3rem"}}>Find A Motel</p>
     </nav>

    <form  className="signupform" style={{paddingTop:"6rem"}} onSubmit={handleSubmit}>
    <label htmlFor="name"   value="name">Name:</label>
    <input type="text" name="name" onChange={onchange}/><br/><br/>
    <label htmlFor="description" value="email">Description: </label>
    <textarea name="description" rows="3" cols="50" onChange={onchange}>
    </textarea><br/><br/>
    <label htmlFor="image" value="image">Image:</label>
    <input type="text" name="image" onChange={onchange}/><br/><br/>
    <label htmlFor="location" value="location">Location: </label>
    <input type="text" name="location" onChange={onchange}/><br/><br/>
    <label htmlFor="price" value="price" >Price:</label>
    <input type="interger"  name="price" onChange={onchange}/><br/>
    <input type="submit" className="delete" style={{marginTop:"2rem",padding:"15px",border:"none"}}   value="Add Rentals"/>
  </form>
  
  </div>
  )
}

export default AddRentals
  