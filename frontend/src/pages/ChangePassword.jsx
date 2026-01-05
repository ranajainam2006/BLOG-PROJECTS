import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";



const ChangePassword = () => {



  const { handleSubmit, reset, register } = useForm()


  async function updatePass(data) {

    const { curr_pass, new_pass, confirm_pass } = data

    if (curr_pass == new_pass) {
      alert("Plese set diffrent new password..")
    }
    else if (curr_pass != new_pass && new_pass == confirm_pass) {

      await axios.post('http://localhost:5000/api/user/changePassword', { curr_pass, new_pass }, { withCredentials: true })
        .then((res) => { alert(res.data.message) })
        .catch((err) => console.log(err))

    } else {
      alert("Check confirm password..")
    }




  }










  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card modern-card">
            <div className="card-header card-header-modern text-center">
              <h4 className="mb-0">Change Password</h4>
            </div>

            <div className="card-body card-body-modern">
              <form onSubmit={handleSubmit(updatePass)}  >

                {/* Current Password */}
                <div className="mb-4">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    {...register('curr_pass')}
                    className="form-control"
                    placeholder="Enter current password"
                    required
                  />
                </div>

                {/* New Password */}
                <div className="mb-4">
                  <label className="form-label">New Password</label>
                  <input
                    {...register('new_pass')}
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label className="form-label">Confirm Password</label>
                  <input
                    {...register('confirm_pass')}
                    type="password"
                    className="form-control"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <button className="btn btn-primary w-100 btn-modern">
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
