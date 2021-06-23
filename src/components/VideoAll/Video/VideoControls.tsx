import { faPlay, faPause, faPlus, faMinus, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useState } from 'react';
import './VideoControls.scss';

interface IVideoControls {
    playingHandler(): void;
    timeHandler(time: number): void;
    volumeHandler(volume: number): void;
    playing: boolean;
    time:string;
}

export const VideoControls: FC<IVideoControls> = (props) => {
    const [time, setTime] = useState(0);
    const plusHandler = () => {
        props.timeHandler(0.5);
        setTime(time + 0.5);
    };
    const minusHandler = () => {
        props.timeHandler(-0.5);
        setTime(time - 0.5);
    };

    return(
        <div className='controlPanel'>
            <button className='playButton' onClick={props.playingHandler}>
                {props.playing ? (<FontAwesomeIcon icon={faPause}/>) : (<FontAwesomeIcon icon={faPlay}/>)}
            </button>
            <button className='timeButton' onClick={plusHandler}>
                <FontAwesomeIcon icon={faPlus}/>
            </button>
            {`${time}`} 
            <button className='timeButton' onClick={minusHandler}>
                <FontAwesomeIcon icon={faMinus}/>
            </button>
            <div className='volumeButton'>
                <FontAwesomeIcon icon={faVolumeUp}/>
                <input className='volumeRange' type="range" min={0} max={100} onChange={(e) => props.volumeHandler(parseInt(e.target.value))}></input>
            </div>
            {(props.time)}
        </div>
    );
}

export default VideoControls;