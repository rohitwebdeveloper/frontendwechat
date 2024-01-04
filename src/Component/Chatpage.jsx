import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client"
import { user, room } from "./Createjoinpage"
import { useNavigate } from "react-router-dom";
let socket;

const Chatpage = () => {

    const navigate = useNavigate();
    const [greeting, setgreeting] = useState();
    const [roomname, setroomname] = useState();
    const [username, setusername] = useState([])
    const [right, setright] = useState('-100%');
    let timing = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const [time, settime] = useState(timing);
   
    const handleclick = () => {
        navigate('/');
        window.location.reload();
    }

    const handlemenuclick =()=>{
        if (right==='-100%') {
            setright('0%');
        } else if(right=== '0%'){
            setright('-100%');
        }
          
        
    }


    useEffect(() => {
        socket = io.connect('https://wechatbackend-1o9t.onrender.com');

        socket.on('connect', () => {
            console.log("Connected to the server and is running")
        })

        socket.emit('user_room_join', { user, room });

        socket.on('user_joined_greeting', (joined_greeting) => {
            setgreeting(`${joined_greeting} has joined !`);
            setTimeout(() => {
                setgreeting();
            }, 5000);
        })

        socket.on('user_left_greeting', (leftgreeting) => {
            setgreeting(`${leftgreeting[0].username} has left`);
            setTimeout(() => {
                setgreeting();
            }, 5000);
        })


        socket.on('user_roomid', (user_room_name) => {
            setroomname(user_room_name);
        })

        socket.on('users_in_room', (usersinroom) => {
            setusername();
            console.log(usersinroom);
            setusername(usersinroom);
        })

        return () => {
            socket.on('disconnect');
            socket.off();
        }
    }, [])


    useEffect(() => {
        socket.on('server_message', (servermessage) => {

            let messagebox = document.querySelector(".message-box");
            let div = document.createElement("div");
            div.classList.add("left");
            div.innerHTML = `${servermessage.user}: ${servermessage.client_msg_input}<br><p> ${servermessage.time}</p>`;
            messagebox.appendChild(div);
        })
    }, [])



    setInterval(() => {
        let newtiming = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        settime(newtiming);
    }, 1000);


    const handlesend = () => {
        let client_msg_input = document.querySelector('.input-message').value;
        socket.emit('client_message', { user, client_msg_input, time });

        let messagebox = document.querySelector(".message-box");
        let div = document.createElement("div");
        div.classList.add("right");
        div.innerHTML = `You: ${client_msg_input}<br><p> ${time}</p>`
        messagebox.appendChild(div);
        document.querySelector('.input-message').value = " ";
    }


    return (
        <>
            <div className="chatpage_container">
                <div className="navbar">
                    <nav>
                        <h1>We<span>T</span>alk</h1>
                        <div className="hammenu_user">
                            <div className="logined_user">{user}</div>
                            <div className="ham_logo" onClick={handlemenuclick}  >
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="joining_leaving_message">
                    {greeting}
                </div>
                <div className="message_container">
                    <div className="chat_area">
                        <div className="message-box">

                        </div>
                        <form id="form" onSubmit={(e) => e.preventDefault()} >
                            <input className="input-message" onChange={(e) => e.target.value} type="text" placeholder="Type Message" name="message" />
                            <button className="btn" type="submit" onClick={handlesend} >Send</button>
                        </form>
                    </div>
                    <div className="connected-box" style={{right:right}}>
                        <div><button className="exit-btn" onClick={handleclick}> Leave Chat</button></div>
                        <div className="roomid">RoomId:{roomname} </div>
                        <h3 className="h3">People Connected</h3>
                        <div className="connected_people">
                            {username.map((currval) => {
                                return (
                                    <>
                                        <ol className="ollist">
                                            <li key={currval.id}>{currval.username}</li>
                                        </ol>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chatpage;