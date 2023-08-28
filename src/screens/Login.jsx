import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link ,useNavigate} from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({email:'',password:''});

  const handleSubmit = async(e) => {
      e.preventDefault();
      const response = await fetch('https://foody-food-server.onrender.com/api/v1/loginuser', {
        method: 'POST',
        withCredentials: true,
        headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            })
      });
      const json = await response.json();

      if(!json.success){
        toast.error(json.errors[0].msg)
      }
      if(json.success){
        localStorage.setItem('userEmail',credentials.email);
        localStorage.setItem('authToken', json.authToken);
        toast.success("Login Successful");
       navigate('/')
      }
      
  }
  return (
    <>
    <div className="container mt-4">
        <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control "
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control "
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="m-3 btn btn-success">
          Login
        </button>
        <Link to={'/signup'} className="m-3 btn btn-danger">i&apos;m a new user</Link>
      </form>
    </div>
    </>
  )
}
