import React, { FC, useRef } from 'react';
import './VideoAll.scss';
import ReactPlayer from 'react-player'
import video from '../../video/test.mp4';

export const VideoAll: FC = (props) => {
    const videoRef = useRef<ReactPlayer>(null);

    let socket = new WebSocket("ws://localhost:8080");

    socket.onopen = (ev) => {
        console.log("Connected!");
        socket.send("Connected!");
    };

    socket.onmessage = (e) => {
        console.log(e.data);
        videoRef.current?.seekTo(e.data as number);
    };

    return(
        <div className='App'>
            <ReactPlayer url={video} controls ref={videoRef}/>
        </div> 
    );
}

export default VideoAll;