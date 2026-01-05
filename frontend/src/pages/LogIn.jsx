import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Api from "../Api";





const Login = () => {

    const navigate = useNavigate();
    const {handleSubmit, reset, register} = useForm()

    
    
    async function addData(data){

     
       try {

        
        const res = await Api.post('user/logIn', data)
        console.log(res.data);
        

        if(res.data.success){
           alert(res.data.message)
           navigate('/addImg')
           // Navbar will automatically update when route changes
        }else{
           alert(res.data.message)

        }
           
       } catch (error) {
         
        alert(error)

       }
       

    }








  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card modern-card">
            <div className="card-header card-header-modern text-center">
              <h3 className="mb-0">Log In</h3>
            </div>
            <div className="card-body card-body-modern">
              <form onSubmit={handleSubmit(addData)} >

                {/* Email */}
                <div className="mb-4">
                  <label className="form-label">Email</label>
                  <input
                  {...register('u_email')}
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input
                   {...register('u_password')}
                     type="password"
                    className="form-control"
                    placeholder="Enter password"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success w-100 btn-modern">
                   Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;