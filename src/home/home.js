import React from 'react'
import DrawingComponent from './drawingComponent';
import ChatMessager from './chatMessager'
import {Route,BrowserRouter} from 'react-router-dom';
import './home.css'
class  Home extends React.Component{
    render(){
        return(
            <div id="app">
                <div id="left-side">
                    <BrowserRouter>
                        <Route path="/" component={DrawingComponent}/>
                    </BrowserRouter>
                </div>
                <div>
                    <BrowserRouter>
                        <Route path="/" component={ChatMessager}/>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

export default Home;