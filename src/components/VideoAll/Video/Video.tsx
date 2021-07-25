import React, { FC, useState, useRef } from 'react';
import ReactPlayer from 'react-player'
import './Video.scss';
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
    const [addTime, setAddTime] = useState<number>(0);  // ADD/REMOVE TIME TO CORRECT TIME WITH OTHER GUYS
    const [volume, setVolume] = useState<number>(0.2);  
    const [time, setTime] = useState<string>('');
    const [percentTime, setPercentTime] = useState<number>(0);
    const [percentLoadedTime, setPercentLoadedTime] = useState<number>(0);
    ///
    const playingHandler = () => setPlaying(!playing);
    const timeHandler = (time: number) => {setAddTime(addTime + time)};
    const volumeHandler = (volume: number) => {setVolume(volume / 100)};
    const timeBarHandler = () => {
        let currentTime = new Date(Math.ceil(videoRef.current?.getCurrentTime() || 0) * 1000).toISOString().substr(11, 8);
        let fullTime = new Date(Math.ceil(videoRef.current?.getDuration() || 0) * 1000).toISOString().substr(11, 8);
        setTime(`${currentTime}/${fullTime}`);
    };
    const percentTimeHandler = () => {
        let currentTime = videoRef.current?.getCurrentTime() || 0;
        let fullTime = videoRef.current?.getDuration() || 1;
        setPercentTime(currentTime/fullTime * 100);
    };
    const percentTimeLoadedHandler = () => {
        let currentTime = videoRef.current?.getSecondsLoaded() || 0;
        let fullTime = videoRef.current?.getDuration() || 1;
        setPercentLoadedTime(currentTime/fullTime * 100);
    };
    
    const onProgressVideoHandler = () => {
        timeBarHandler();
        percentTimeHandler();
        percentTimeLoadedHandler();
    }

    props.socket.onmessage = (e) => {
        const data: IWsData = JSON.parse(e.data);
        videoSeekHandler(data.seconds);
        setPlaying(data.isPlaying);
    };

    const videoSeekHandler = (time: number) => {
        const currentTime: number = videoRef.current?.getCurrentTime() as number;
        console.log((time - addTime) - currentTime);
        if( Math.abs((time - addTime) - currentTime) < 2)
            {
                console.log('good');
            }
        else
            {
                console.log('chnage time')
                videoRef.current?.seekTo(time + addTime);
            }
    };

    return(
        <>  
            <div className='player'>

                <ReactPlayer
                    width='100%'
                    height='100%'
                    playing={playing}
                    url={video}
                    // url='https://www.youtube.com/watch?v=L6PImzMKaKY' 
                    // controls 
                    ref={videoRef}
                    volume={volume}
                    progressInterval={500}
                    onProgress={onProgressVideoHandler}
                    
                />
                <VideoControls
                    playing={playing} 
                    playingHandler={playingHandler}
                    volumeHandler={volumeHandler}
                    timeHandler={timeHandler}
                    time={time}
                    percentTime={percentTime}
                    percentLoadedTime={percentLoadedTime}
                />
            </div>
        </> 
    );
}

export default Video;