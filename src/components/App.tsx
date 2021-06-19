import React, { FC, useRef } from 'react';
import './App.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import VideoAll from './VideoAll/VideoAll';
import VideoAdmin from './VideoAdmin/VideoAdmin';

export const App: FC = () => {
    return(
        <div className='App'>
            <Router>
                <Route path='/videoAll'>
                    <VideoAll />
                </Route>
                <Route path='/videoAdmin'>
                    <VideoAdmin />
                </Route>
            </Router>
        </div> 
    );
}

export default App;