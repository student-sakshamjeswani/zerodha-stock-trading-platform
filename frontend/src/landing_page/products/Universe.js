import React from 'react';

function Universe() {
    return ( 
        <div className='container'>
            <div className='row mt-5 mb-5 text-center'>
                <h1 className='mb-4 fs-2 mt-5 text-muted'>The Zerodha Universe</h1>
                <p className='fs-5'>Extend your trading and investment experience even further with our partner platforms</p>
                <div className='col-md-4 p-3 mt-5 text-center'>
                    <div className="logo-box">
                        <img src="media/images/zerodhaFundhouse.png" className="img-fluid logo-img"/>
                    </div>
                    <p className='text-small text-muted mt-3'>Our asset management venture that is creating simple and transparent indux funds to help you save for your goals</p>
                </div>
                <div className='col-md-4 p-3 mt-5 text-center'>
                    <div className="logo-box">
                        <img src="media/images/sensibullLogo.svg" className="img-fluid logo-img"/>
                    </div>
                    <p className='text-small text-muted mt-3'>Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.</p>
                </div>
                <div className='col-md-4 p-3 mt-5 text-center'>
                    <div className="logo-box">
                        <img src="media/images/goldenpiLogo.png" className="img-fluid logo-img"/>
                    </div>
                    <p className='text-small text-muted mt-3'>Bonds Trading platform</p>
                </div>
                <div className='col-md-4 p-3 mt-5 text-center mb-3'>
                    <div className="logo-box">
                        <img src="media/images/streakLogo.png" className="img-fluid logo-img"/>
                    </div>
                    <p className='text-small text-muted mt-3'>Systematic trading platform that allows you to create and backtest strategies without coding</p>
                </div>
                <div className='col-md-4 p-3 mt-5 text-center mb-3'>
                    <div className="logo-box">
                        <img src="media/images/smallcaseLogo.png" className="img-fluid logo-img"/>
                    </div>
                    <p className='text-small text-muted mt-3'>Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.</p>
                </div>
                <div className='col-md-4 p-3 mt-5 text-center mb-3'>
                    <div className="logo-box">
                        <img src="media/images/dittoLogo.png" className="img-fluid logo-img"/>
                    </div>
                    <p className='text-small text-muted mt-3'>Personalized advice on life and health insurance. No spam and no mis-selling.</p>
                </div>
                <button className='btn btn-primary p-2 fs-4 mt-5 mb-5' style={{width: "22%", margin: "0 auto"}}>Signup for free</button>
            </div>
        </div>
     );
}

export default Universe;