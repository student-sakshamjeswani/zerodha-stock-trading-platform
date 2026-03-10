import React from 'react';

function Hero() {
    return ( 
        <div className='container border-bottom mb-5'>
            <div className='row text-center mt-5 p-5'>
                <h1 className='fs-2 text-muted'>Zerodha Products</h1>
                <h4 className='text-muted mt-2'>Sleek, modern, and intuitive trading platforms</h4>
                <p className='mt-3 fs-5 mb-5'>Check out our <a href='' style={{textDecoration: "none"}}>investment offerings <i class="fa-solid fa-arrow-right-long"></i></a></p>
            </div>
        </div>
     );
}

export default Hero;