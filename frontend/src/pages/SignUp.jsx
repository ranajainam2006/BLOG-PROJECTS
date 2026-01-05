import React from "react";
import { useForm } from "react-hook-form";
import Api from "../Api";





const Signup = () => {


    const {handleSubmit, reset, register} = useForm()

    



    async function addData(data){

        await Api.post('user/signUp', data)
        .then((res) => {
            alert(res.data.message)
            console.log(res.data.message)
            reset()
        })
        .catch(err => console.log(err))


    }








  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card modern-card">
            <div className="card-header card-header-modern text-center">
              <h3 className="mb-0">Sign Up</h3>
            </div>
            <div className="card-body card-body-modern">
              <form onSubmit={handleSubmit(addData)} >

                {/* Name */}
                <div className="mb-4">
                  <label className="form-label">Name</label>
                  <input
                  {...register('u_name')}
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>

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

                {/* Mobile */}
                <div className="mb-4">
                  <label className="form-label">Mobile</label>
                  <input
                     {...register('u_mobile')}
                    type="tel"
                    className="form-control"
                    placeholder="Enter mobile number"
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

                <button type="submit" className="btn btn-primary w-100 btn-modern">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;