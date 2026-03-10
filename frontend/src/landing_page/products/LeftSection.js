import React from 'react';

function LeftSection({imageURL, productName, productDescription, tryDemo, learnMore, googlePlay, appStore}) {
    return ( 
        <div className='container'>
            <div className='row'>
                <div className='col-6 mb-5'>
                    <img src={imageURL} alt='iamge'/>
                </div>
                <div className='col-6 mt-5 mb-5'>
                    <h1 className='text-muted fs-2'>{productName}</h1>
                    <p className='mt-4'>{productDescription}</p>
                    <div>
                        <a href={tryDemo} style={{textDecoration: "none", color: "#2f6ecb"}}>Try Demo <i class="fa-solid fa-arrow-right-long"></i></a>
                        <a href={learnMore} style={{textDecoration: "none", marginLeft: "60px", color: "#2f6ecb"}}>Learn More <i class="fa-solid fa-arrow-right-long"></i></a>
                    </div>
                    <div className='mt-4'>
                        <a href={googlePlay}><img src='media/images/googlePlayBadge.svg'/></a>
                        <a href={appStore} style={{marginLeft: "30px"}}><img src='media/images/appstoreBadge.svg'/></a>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default LeftSection;