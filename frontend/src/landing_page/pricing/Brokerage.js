import React from 'react';

function Brokerage() {
    return ( 
        <div className='container'>
            <div className='row mt-5 p-5 border-top'>
                <div className='col-8 p-4'>
                    <a href='' style={{textDecoration: "none"}} className='text-center'><h5>Brokerage calculator</h5></a>
                    <ul style={{lineHeight: "2.5", fontSize: "13px"}} className='text-muted mt-4'>
                        <li>Call & Trade and RMS auto-squareoff: additional charges of ₹50 + GST per order</li>
                        <li>Digital contract notes will be sent via e-mail</li>
                        <li>Physical copies of contract notes, if required, shall be charged ₹20 per contract note.Courier charges apply.</li>
                        <li>For NRI account (non-PIS), 0.6% or ₹100 per executed order for equity (whichever is lower)</li>
                        <li>For NRI account (PIS), 0.5% or ₹200 per executed order for equity (whichever is lower)</li>
                        <li>If the acoount is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.</li>
                    </ul>
                </div>
                <div className='col-4 p-4 text-center'>
                    <a href='' style={{textDecoration: "none"}}><h5>List of charges</h5></a>
                </div>
            </div>
        </div>
     );
}

export default Brokerage;