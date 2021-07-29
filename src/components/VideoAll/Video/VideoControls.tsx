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
    percentTime:number;
    percentLoadedTime:number;
}

export const VideoControls: FC<IVideoControls> = (props) => {
    const [controlTime, setTime] = useState(0);
    const [videoHovered, setVideoHovered] = useState(true);
    const toggleVideoHoverEnter = () => setVideoHovered(true);
    const toggleVideoHoverLeave = () => setVideoHovered(false);

    const plusHandler = () => {
        props.timeHandler(0.5);
        setTime(controlTime + 0.5);
    };
    const minusHandler = () => {
        props.timeHandler(-0.5);
        setTime(controlTime - 0.5);
    };

    return(
        <div className='videoControls' onMouseEnter={toggleVideoHoverEnter} onMouseLeave={toggleVideoHoverLeave}>
            
            <div className='videoHover' onClick={props.playingHandler}>
                {(<FontAwesomeIcon icon={faPlay} className={props.playing ? 'iconVanish' : 'iconShow'}/>)}
            </div>
            
            <div className={videoHovered ? 'controlPanel' : 'controlPanel controlPanelHidden'}>

                <button className='playButton' onClick={props.playingHandler}>
                    {props.playing ? (<FontAwesomeIcon icon={faPause}/>) : (<FontAwesomeIcon icon={faPlay}/>)}
                </button>

                {/* <button className='timeButton' onClick={plusHandler}>
                    <FontAwesomeIcon icon={faPlus}/>
                </button>
                {`${controlTime}`} 
                <button className='timeButton' onClick={minusHandler}>
                    <FontAwesomeIcon icon={faMinus}/>
                </button> */}

                <div className='volumeButton'>
                    <FontAwesomeIcon icon={faVolumeUp}/>
                    <input className='volumeRange' type="range" min={0} max={100} onChange={(e) => props.volumeHandler(parseInt(e.target.value))}></input>
                </div>

                <div className='timeBar'>
                    <div className='loadedBar' style={{transform:`translateX(${ -100 + props.percentLoadedTime}%)`}}/>
                    <div className='currentBar' style={{transform:`translateX(${ -100 + props.percentTime}%)`}}/>
                </div>
                {(props.time)}
            </div>
            <div className={!videoHovered ? 'smallControlPanel' : 'smallControlPanel smallControlPanelHidden'}>
                <div className='timeBar'>
                    <div className='loadedBar' style={{transform:`translateX(${ -100 + props.percentLoadedTime}%)`}}/>
                    <div className='currentBar' style={{transform:`translateX(${ -100 + props.percentTime}%)`}}/>
                </div>
            </div>
        </div>
    );
}

export default VideoControls;