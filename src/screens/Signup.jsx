import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link,useNavigate } from "react-router-dom";

export default function Signup() {
  let navigate = useNavigate();
    const [credentials, setCredentials] = useState({name:'',email:'',password:'',geolocation:''});

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch('https://foody-food-server.onrender.com/api/v1/createuser', {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation})
        });
        const json = await response.json();
        console.log(json);

        if(!json.success){
            toast.error(json.errors[0].msg)
        }
        if(json.success){
          localStorage.setItem('userEmail',credentials.email);
          localStorage.setItem('authToken', json.authToken);
          toast.success("Signup Successful");
          navigate('/')
        }
  
    }


  return (
    <>
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control "
            id="Name"
            aria-describedby="emailHelp"
            name="name"
            value={credentials.name}
            onChange={(e) => setCredentials({...credentials, name: e.target.value})}
          />
        </div>

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
          <div id="emailHelp" className="form-text">
            We&apos;ll never share your email with anyone else.
          </div>
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
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputlocation1" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control "
            id="exampleInputlocation1"
            name="geolocation"
            value={credentials.geolocation}
            onChange={(e) => setCredentials({...credentials, geolocation: e.target.value})}
          />
        </div>
        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>
        <Link to={'/login'} className="m-3 btn btn-danger">Already a user</Link>
      </form>
    </div>
            </>
  );
}
