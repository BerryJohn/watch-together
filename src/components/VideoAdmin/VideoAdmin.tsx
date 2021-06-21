import React, { FC } from 'react';
import './VideoAdmin.scss';

import Video from './Video/Video';

export const VideoAdmin: FC = () => {

    let socket = new WebSocket("ws://localhost:8080");


    socket.onopen = (ev) => {
        // console.log("Admin connected!");
        // socket.send("Admin connected!");
    };

    socket.onmessage = (e) => {
        console.log(e.data);
    };

    return(
        <div className='App'>
            <Video
                socket={socket}
            />
        </div> 
    );
}

export default VideoAdmin;