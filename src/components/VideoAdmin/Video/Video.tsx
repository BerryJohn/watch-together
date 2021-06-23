import React, { FC, useState } from 'react';
import ReactPlayer from 'react-player'
import video from '../../../video/test.mp4';
import VideoControls from './VideoControls';


interface IVideo {
    socket: WebSocket;
}

export const Video: FC<IVideo> = (props) => {

    const [playing, setPlaying] = useState(false);

    const playingHandler = () => setPlaying(!playing);

    const progressHandler = (e: any) => {
        if(props.socket.readyState === WebSocket.OPEN)
            {
                props.socket.send(JSON.stringify({
                    seconds: e.playedSeconds,
                    isPlaying: playing,
                }));
            }
        else
            console.error('Problem with connection to te server');
    };

    return(
        <>
            <ReactPlayer 
                playing={playing}
                url={video} 
                // url='https://www.youtube.com/watch?v=L6PImzMKaKY' 
                controls 
                progressInterval={500}
                onProgress={progressHandler}
            />
            <VideoControls playing={playing} playingHandler={playingHandler}/>
        </> 
    );
}

export default Video;