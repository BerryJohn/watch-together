import React, { FC } from 'react';
import './VideoAll.scss';
import Video from './Video/Video';

export const VideoAll: FC = (props) => {

    let socket = new WebSocket("ws://localhost:8080");

    socket.onopen = (ev) => {
        // console.log("Connected!");
        // socket.send("Connected!");
    };


    return(
        <div className='videoAll'>
            <Video socket={socket}/>
        </div> 
    );
}

export default VideoAll;