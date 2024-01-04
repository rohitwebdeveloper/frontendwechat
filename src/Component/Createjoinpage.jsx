import React from "react";
import { useNavigate } from "react-router-dom";

let user;
let room;

const Createjoinpage = ()=>{
const navigate = useNavigate();


const handleclick = ()=>{
   user = document.querySelector('.username').value;
   room = document.querySelector('.roomname').value;

   if ((user === "") || (room === "")) {
      alert('Please Enter Username and Roomid');
      
   } else {
      navigate('/chatpage');
      document.querySelector('.username').value = "";
      document.querySelector('.roomname').value = "";
   }
}

    return(
        <>
          <div className ="create_join_container">
            <div className ="userinfo_box">
               <div>
                  <div className ="userinfo_heading">
                     <div className ="h2">We<span>T</span>alk</div>
                  </div>
                  <div className ="user">
                     <input type="text" className ="username" placeholder="Enter Name"/>
                  </div>
                  <div className ="user">
                     <input type="text" className ="roomname" placeholder="Enter Room Id"/>
                  </div>
                  <div className ="note">
                     Note: Please enter unique Roomid that contains numbers, uppercase and lowercase letters. <br/> Ex:
                     abc63eF, Room5423
                  </div>
                  <button className ="create-btn" onClick={handleclick}>Create Chat</button>
                  <button className ="join-btn" onClick={handleclick} >Join Chat</button>
               </div>
            </div>

         </div>
        
        </>
    )
}

export default Createjoinpage;
export {user, room};