import React, { FC, useState, useRef } from 'react';
import ReactPlayer from 'react-player'
import video from '../../../video/test.mp4';
import VideoControls from './VideoControls';

interface IWsData{
    seconds: number,
    isPlaying: boolean,
}

interface IVideo {
    socket: WebSocket;
}

export const Video: FC<IVideo> = (props) => {
    const videoRef = useRef<ReactPlayer>(null);
    const [playing, setPlaying] = useState(false);

    const playingHandler = () => setPlaying(!playing);

    props.socket.onmessage = (e) => {
        const data: IWsData = JSON.parse(e.data);
        videoSeekHandler(data.seconds);
        setPlaying(data.isPlaying);
    };

    const videoSeekHandler = (time: number) => {
        const currentTime: number = videoRef.current?.getCurrentTime() as number;
        console.log(time - currentTime);
        if( Math.abs(time - currentTime) < 2)
            console.log('good');
        else
            {
                console.log('chnage time')
                videoRef.current?.seekTo(time);
            }
    }

    return(
        <>
            <ReactPlayer 
                playing={playing}
                url={video} 
                controls 
                ref={videoRef}
                
            />
            <VideoControls playing={playing} playingHandler={playingHandler}/>
        </> 
    );
}

export default Video;