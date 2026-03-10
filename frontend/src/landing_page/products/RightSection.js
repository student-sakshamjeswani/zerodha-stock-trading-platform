import React from 'react';

function RightSection({productName, productDescription, learnMore, imageURL}) {
    return ( 
        <div className='container'>
            <div className='row mt-5 mb-5'>
                <div className='col-6 p-5 mt-5'>
                    <h1 className='text-muted fs-2'>{productName}</h1>
                    <p className='mt-4'>{productDescription}</p>
                    <div>
                        <a href={learnMore} style={{textDecoration: "none", color: "#2f6ecb"}}>Learn More <i class="fa-solid fa-arrow-right-long"></i></a>
                    </div>
                </div>
                <div className='col-6'>
                    <img src={imageURL} alt='iamge'/>
                </div>
            </div>
        </div>
     );
}

export default RightSection;