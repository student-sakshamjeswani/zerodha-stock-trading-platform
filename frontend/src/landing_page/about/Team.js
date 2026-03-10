import React from 'react';
import { Link } from 'react-router-dom';

function team() {
    return ( 
        <div className='container'>
            <div className='row text-muted mt-2 mb-5 border-top'>
                <h1 className='fs-3 text-center mt-5'>People</h1>
            </div>
            <div className='row p-3 text-muted'>
                <div className='col-6 text-center mb-5'>
                    <img src='media/images/nithinKamath.jpg' style={{width: "45%", borderRadius: "100%"}}/>
                    <h4 className='mt-4 text-muted'>Nithin Kamath</h4>
                    <h6 className='mt-4 text-muted'>Founder, CEO</h6>
                </div>
                <div className='col fs-5 mb-5'>
                    <p>Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.</p>
                    <p>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>
                    <p>Playing basketball is his zen.</p>
                    <p>Connect on <Link className='link-on'>Homepage</Link> / <Link className='link-on'>TradingQnA</Link> / <Link className='link-on'>Twitter</Link></p>
                </div>
            </div>
        </div>
     );
}

export default team;