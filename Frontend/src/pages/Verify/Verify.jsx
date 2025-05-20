import React from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';


const Verify = () => {


    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

   const verifyPayment = async () => {
    if (!success || !orderId) {
        console.error("Missing success or orderId parameters");
        navigate("/");
        return;
    }

    try {
        const response = await axios.post(url + "/api/order/verify", { success, orderId });
        console.log("Verification Response:", response.data);
        if (response.data.success) {
            navigate("/myorders");
        } else {
            navigate("/");
        }
    } catch (error) {
        console.error("Payment verification failed:", error);
        navigate("/");
    }
};
    useEffect(() => {
        verifyPayment();
    }, []);
  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify