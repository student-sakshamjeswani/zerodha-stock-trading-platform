import React from 'react';
import {Link} from 'react-router-dom';

function Hero() {
    return ( 
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <img src='media/images/homeHero.png' alt='Hero image' className='mb-5'/>
                <h1 className='mt-5'>Invest in Everything</h1>
                <p>Online platform to invest in stocks, derivatives, mutual funds and more</p>
                <Link to="/signup"><button className='btn btn-primary p-2 fs-5 mt-3 mb-5' style={{width: "16%", margin: "auto"}}>Signup now</button></Link>
            </div>
        </div>
    );
}

export default Hero;