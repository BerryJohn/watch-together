import React, { FC } from 'react';
import './VideoAdmin.scss';
import ReactPlayer from 'react-player'
import video from '../../video/test.mp4';

export const VideoAdmin: FC = () => {

    let socket = new WebSocket("ws://localhost:8080");

    
    const progressHanlder = (e: any) => {
        if(socket.readyState === WebSocket.OPEN)
            socket.send(`${e.playedSeconds}`);
        else
            console.error('Problem with connection to te server');
    };

    socket.onopen = (ev) => {
        console.log("Admin connected!");
        socket.send("Admin connected!");
    };

    socket.onmessage = (e) => {
        console.log(e.data);

    };

    return(
        <div className='App'>
            <ReactPlayer url={video} controls onProgress={progressHanlder}/>
        </div> 
    );
}

export default VideoAdmin;