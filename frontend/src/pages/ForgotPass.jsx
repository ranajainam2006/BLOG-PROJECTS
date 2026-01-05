import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";



const ForgotPass = () => {



    const { handleSubmit, reset, register } = useForm()


    const [temp, setTemp] = useState(false)




    async function getOtp(data) {

        const { u_email } = data



        if (!u_email) {

            alert("Please Enter Email Id...")

        } else {


            await axios.post('http://localhost:5000/api/user/sendOtp', { u_email }, { withCredentials: true })
                .then((res) => {
                    alert(res.data.message)

                    if (res.data.success){

                        setTemp(true)
                        reset()
                    }

                })
                .catch((err) => console.log(err))


        }




    }





    async function updatePass(data) {

        const { otp, new_pass, confirm_pass } = data


        if (new_pass == confirm_pass) {

            await axios.post('http://localhost:5000/api/user/updatePassword', { otp, new_pass }, { withCredentials: true })
                .then((res) => { alert(res.data.message) })
                .catch((err) => console.log(err))

        } else {
            alert("Check confirm password..")
        }




    }










    return (

        <>

            {
                temp == true ?




                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-6 col-lg-5">
                                <div className="card modern-card">
                                    <div className="card-header card-header-modern text-center">
                                        <h4 className="mb-0">Set New Password</h4>
                                    </div>

                                    <div className="card-body card-body-modern">
                                        <form onSubmit={handleSubmit(updatePass)}  >

                                            <div className="mb-4">
                                                <label className="form-label">OTP</label>
                                                <input
                                                    type="text"
                                                    {...register('otp')}
                                                    className="form-control"
                                                    placeholder="Enter OTP"
                                                    required
                                                />
                                            </div>

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

                                            <button className="btn btn-success w-100 btn-modern">
                                                Update Password
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>





                    :






                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-6 col-lg-5">
                                <div className="card modern-card">
                                    <div className="card-header card-header-modern text-center">
                                        <h4 className="mb-0">Get OTP For Password Reset</h4>
                                    </div>

                                    <div className="card-body card-body-modern">
                                        <form onSubmit={handleSubmit(getOtp)}  >

                                            <div className="mb-4">
                                                <label className="form-label">Enter Email ID</label>
                                                <input
                                                    type="email"
                                                    {...register('u_email')}
                                                    className="form-control"
                                                    placeholder="Enter email"
                                                    required
                                                />
                                            </div>

                                            <button className="btn btn-success w-100 btn-modern">
                                                Get OTP
                                            </button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            }










        </>




    );
};

export default ForgotPass;
