import React, { FC } from 'react';
import './App.scss';
import video from '../video/test.mp4';

export const App: FC = () => {

    return(
        <div className='App'>
            <video width='320' height='240' controls>
                <source src={video} type='video/mp4'/>
            </video>
        </div> 
    );
}

export default App;