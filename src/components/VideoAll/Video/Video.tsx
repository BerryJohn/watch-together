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
    const [addTime, setAddTime] = useState(0);  // ADD/REMOVE TIME TO CORRECT TIME WITH OTHER GUYS

    const playingHandler = () => setPlaying(!playing);
    const timeHandler = (time: number) => {setAddTime(addTime + time)};

    props.socket.onmessage = (e) => {
        const data: IWsData = JSON.parse(e.data);
        videoSeekHandler(data.seconds);
        setPlaying(data.isPlaying);
    };

    const videoSeekHandler = (time: number) => {
        const currentTime: number = videoRef.current?.getCurrentTime() as number;
        console.log((time - addTime) - currentTime);
        if( Math.abs((time - addTime) - currentTime) < 2)
            console.log('good');
        else
            {
                console.log('chnage time')
                videoRef.current?.seekTo(time + addTime);
            }
    };
    

    return(
        <>
            <ReactPlayer 
                playing={playing}
                url={video} 
                controls 
                ref={videoRef}
                
            />
            <VideoControls playing={playing} playingHandler={playingHandler} timeHandler={timeHandler}/>
        </> 
    );
}

export default Video;