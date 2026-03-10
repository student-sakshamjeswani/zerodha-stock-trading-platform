import React from 'react';

function Hero() {
    return ( 
        <div className='container' style={{border: "1px solid rgb(202, 196, 196)", minWidth: '100%', backgroundColor: "rgb(245, 245, 245)", border: "1px solid #eaecef"}}>
            <div className='row' style={{display: "flex", padding: "30px 24px 10px 24px"}}>
                <div className='col'>
                    <a href='' style={{fontSize: "37px", color: "black", textDecoration: "none", fontWeight: "635", marginLeft: "76px"}} className='cursor-pointer'>Support Portal</a>
                </div>
                <div className='col d-flex'>
                    <button className='btn ms-auto' style={{width: "15%", backgroundColor: "#2f6ecb", color: 'white', maxHeight: "80%", fontSize: '16px', marginRight: "70px"}}>My tickets</button>
                </div>
            </div>
            <div className='row  mb-5'  style={{display: "flex", padding: "0px 30px"}}>
                <div className='col'>
                    <span className='search-icon fs-6 text-muted'><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input className='inp' type='text' placeholder='Eg: How do I open my account, How do i activate F&O...' style={{width: "90.5%", padding: "17px 17px 17px 60px", marginLeft: "70px", marginRight: "70px", border: "1px solid #dedee3", borderRadius: "3px", boxShadow: "0px 2px 8px rgba(0,0,255,0.08)"}}/>
                </div>
            </div>
        </div>
     );
}

export default Hero;