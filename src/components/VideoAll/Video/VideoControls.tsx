import React, { FC, useState } from 'react';

interface IVideoControls {
    playingHandler(): void;
    timeHandler(time: number): void;
    playing: boolean;
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
        <div>
            <button onClick={props.playingHandler}>{`${props.playing}`}</button>
            <button onClick={plusHandler}>+</button>
            {`${time}`}
            <button onClick={minusHandler}>-</button>
        </div>
    );
}

export default VideoControls;