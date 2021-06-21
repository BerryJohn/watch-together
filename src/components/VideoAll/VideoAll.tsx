import React, { FC, useRef } from 'react';
import './VideoAll.scss';
import ReactPlayer from 'react-player'
import video from '../../video/test.mp4';
import { useState } from 'react';
import Video from './Video/Video';

export const VideoAll: FC = (props) => {

    let socket = new WebSocket("ws://localhost:8080");

    socket.onopen = (ev) => {
        // console.log("Connected!");
        // socket.send("Connected!");
    };


    return(
        <div className='App'>
            <Video socket={socket}/>
        </div> 
    );
}

export default VideoAll;