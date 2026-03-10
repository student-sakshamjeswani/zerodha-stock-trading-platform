import React from 'react';

function Hero() {
    return ( 
        <div className='container'>
            <div className='row mt-5 p-5 border-bottom text-center text-muted'>
                <h1 className='fs-2'>Charges</h1>
                <p className='fs-5 mt-2'>List of all charges and taxes</p>
            </div>
            <div className='row mt-5 p-3 text-center'>
                <div className='col-4 p-3'>
                    <img src='media/images/pricingEquity.svg' style={{width: '70%'}} className='mb-3'/>
                    <h1 className='text-muted fs-3 mb-4'>Free equity delivery</h1>
                    <p className='text-muted fs-6'>All equity delivery investments (NSE, BSE), <br/>are absolutely free — ₹ 0 brokerage.</p>
                </div>
                <div className='col-4 p-3'>
                    <img src='media/images/intradayTrades.svg' style={{width: '70%'}} className='mb-3'/>
                    <h1 className='text-muted fs-3 mb-4'>Intraday and F&O trades</h1>
                    <p className='text-muted fs-6'>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
                </div>
                <div className='col-4 p-3'>
                    <img src='media/images/pricingEquity.svg' style={{width: '70%'}} className='mb-3'/>
                    <h1 className='text-muted fs-3 mb-4'>Free direct MF</h1>
                    <p className='text-muted fs-6'>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
                </div>
            </div>
        </div>
     );
}

export default Hero;