import React, { FC, useRef } from 'react';
import videoF from '../Video/Video';

interface IVideo
{
    videoRef: React.MutableRefObject<HTMLVideoElement>;
}

export const Video: FC<IVideo> = (props) => {
    return(
        <div className='App'>
            {/* <video  width='320' height='240' controls ref={props.videoRef} src={videoF}>
       
            </video> */}
        </div> 
    );
}

export default Video;