
import React, { useEffect, useState } from 'react'
import Api from "../Api.jsx"
import { Navigate, Outlet } from 'react-router-dom'



const PrivateRoute = () => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)



    const checkAuth = async () => {


        try {


            const res = await Api.get('/user/checkAuth')
            console.log(res.data);

            if (res.data.success) {
                setUser(res.data.user)
                setLoading(false)
            } else {
                setUser(null)
            }


        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }


    console.log("User......................");
    console.log(user);


    useEffect(() =>{
        checkAuth()
    },[])


    if(loading){
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', color: 'white', fontSize: '1.5rem'}}>
                <div>Loading...</div>
            </div>
        )
    }
    
    

    return user ? <Outlet /> : <Navigate to="/login" />


   
}

export default PrivateRoute