import React, { FC } from 'react';

interface IVideoControls {
    playingHandler(): void;
    playing: boolean;
}

export const VideoControls: FC<IVideoControls> = (props) => {

    return(
        <div>
            <button onClick={props.playingHandler}>{`${props.playing}`}</button>
        </div>
    );
}

export default VideoControls;