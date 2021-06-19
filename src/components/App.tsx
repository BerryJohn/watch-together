import React, { FC, useRef } from 'react';
import './App.scss';
import ReactPlayer from 'react-player'
import video from '../video/test.mp4';
export const App: FC = () => {
    // const videoRef = useRef() as React.MutableRefObject<HTMLVideoElement>;

    let socket = new WebSocket("ws://localhost:8080");

    
    const progressHanlder = (e:any) => {
        // console.log(e.playedSeconds)
        socket.send(`${e.playedSeconds}`);
    };

    socket.onopen = (ev) => {
        console.log("Connected!");
        socket.send("Connected!");
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

export default App;