import React from 'react';
import LeftSidebar from '../../component/LeftSidebar/LeftSidebar';
import HomeMainbar from '../../component/HomeMainbar/HomeMainbar';
import RightSidebar from '../../component/RightSidebar/RightSidebar';
import '../../App.css';

const Questions=()=>
{
    return (
       
       <div className='home-container-1'>
        <LeftSidebar />
         <div className='home-container-2'>
 <HomeMainbar />
 <RightSidebar />

            </div>    
            </div>
    );
}
export default Questions;