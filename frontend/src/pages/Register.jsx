import { useState } from "react";
import { userClient } from "../clients/api.js";
import { useUser } from "../context/UserContext.jsx";
import {useNavigate} from 'react-router-dom'
function Register() {
   const {setUser} = useUser();
  const navigate = useNavigate();

const [form,setForm] = useState({username: '',email: '', password: ''});

const handleChange = (e)=> {
  setForm({
    ...form,
    [e.target.name]: e.target.value,

  })
}
const handleSubmit= async (e)=> {
e.preventDefault();
console.log(form);
try{
//send the form data to our backend
const {data} = await userClient.post('/register',form)
console.log(data)
//take the token and store it locally
localStorage.setItem("token", data.token);
//save some user data in our state
setUser(data.user)
//take the user to a different page
navigate("/feed")
}catch(err){
    console.dir(err);
    alert(err.response.data.message)
}


}
    return(
        <div>
        
        <h1>Register page</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input value={form.username} onChange={handleChange} id="username" type="text" name="username" required/>

                  <label htmlFor="email">Email:</label>
            <input value={form.email} onChange={handleChange} id="email" type="email" name="email" required/>

                  <label htmlFor="password">Password:</label>
            <input value={form.password} onChange={handleChange} id="password" type="password" name="password" required/>
            <button>Register</button>
        </form>
        </div>
    )
}

export default Register;