import React,{useEffect, useState} from 'react';
import Navbar from './Navbar';
import { Avatar,Divider } from '@chakra-ui/react'
import { FaUserAlt} from "react-icons/fa";
import { FaMapMarkerAlt,FaBriefcase,FaTwitter,FaEdit,FaLinkedin } from "react-icons/fa";
import AutoplaySlider from './Advert';
import CreateP from './CreateP';
import AllPost from './AllPost';
import NotLogin from './NotLogin';
import { Link } from 'react-router-dom';


export default function Home() {
                
          let [v,setV]=useState();
          let [v2,setV2]=useState();     

           let data=JSON.parse(localStorage.getItem("UserData"));

          

           useEffect(()=>{
                  setV( Math.floor(Math.random()*10000))   
                  setV2( Math.floor(Math.random()*1000))  

           },[])


           if(!data){    
           
            return(<NotLogin/>)
    }

  return (
    <div className='Home-Main1'>
     <Navbar/>
    <div className='Home-Main2'>
          
                      <div className='Home-Profile'  title="Click to visit Profile Page">
                    
                      <Link to="/profile"> <div className='Profile-one'>

                        <div className='Profile-two'>
                        <Avatar  name={`${data.firstName} ${data.lastName}` }  />
                        <h1>{`${data.firstName} ${data.lastName}` }</h1>
                        </div>
                         <div>
                           <Link to="/profile"><FaUserAlt/></Link> 
                         </div>
                           
                        
                        </div>
                        

                         <hr className='line'/>

                        <div className='Profile-three'>

                           <div className='Profile-four'>
                             <FaMapMarkerAlt/>
                             <h1>{data.location}</h1>
                           </div>
                            
                           <div className='Profile-five'>
                           <FaBriefcase/>
                           <h1>Mumbai,Maharashtra</h1>
                           </div>
                           
                        
                        </div>

                        <hr className='line'/>

                        <div className='Profile-six'>

                        <div className='Profile-seven'>
                           <h1>Views of your profile</h1>
                          <h1>{v}</h1>
                        </div>
                         
                        <div className='Profile-eight'>
                        <h1>Impression of your profile</h1>
                        <h1>{v2}</h1>
                        </div>

                     </div>

                     <hr className='line'/>




                     <div className='Profile-nine'>
                     <h1 className='name-social'>Social Profiles</h1>

                     <div className='Profile-ten'>

                     <div className='Profile-eleven'>
                     <FaTwitter className='twitter'/>
                     <div>
                         <h1>Twitter</h1>
                         <h1>Social Network</h1>
                      </div>
                      </div>
                      <FaEdit/>

                     </div>

                     <div className='Profile-ten'>

                     <div className='Profile-eleven'>
                     <FaLinkedin className='twitter'/>
                     <div>
                         <h1>LinkedIn</h1>
                         <h1>Network Platform</h1>
                      </div>
                      </div>
                      <FaEdit/>

                     </div>
                  
                  </div>


        </Link>
                             
           </div>


           <div className='Home-Content'>
           <CreateP/>
           <AllPost/>
            
           
           </div>




           <div className='Home-Ad'>
                <div className='Ad-one'>
                   <h1>Sponsored</h1>
                   <h1>Ad Centre</h1>
                </div>
                <img  className="img-one" src="data:image/jpeg;base64,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" alt="ad-image"/>


                <div className='Ad-two'>
                   <h1>Nike Store</h1>
                   <h1>www.nike.com</h1>
                </div>
                <h6>Everyday comfort gets a modern look. The E-Series AD was designed with ease of entry in mind, which will have you reaching for them day after day.</h6>
                <AutoplaySlider/>


           </div>


    
    </div>
    </div>
  )
}
