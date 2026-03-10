import React from 'react';
import { Link } from "react-router-dom";

function OpenAccount() {
    return ( 
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <h1 className='mt-5 mb-4 text-muted fs-2'>Open a Zerodha account</h1>
                <p className='mb-4'>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
                <Link to="/signup"><button className='btn btn-primary p-2 fs-5 mt-3 mb-5' style={{width: "16%", margin: "auto"}}>Sign up for free</button></Link>
            </div>
        </div>
     );
}

export default OpenAccount;