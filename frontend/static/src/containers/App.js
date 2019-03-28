import React, { Component } from 'react';
import DispatchCallLogContainer from "./callList"
import ClientContainer from "./callDetail"
import DispatchCurrentCallContainer from "./callCreate"
import DispatcherCallsDetailContainer from "./dispatcherCallsDetail.js"
import HeartbeatComponent from "./heartbeat.js"
import EMSCallsDetailContainer from './emt.js'


import '../App1.css';
import {Container} from 'react-bootstrap';

const $ = window.$;


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data : {}
        };
    }


    route = (currentScreen, data) => {
        //setting it tp oan object instead of string
        window.history.pushState({}, '', currentScreen);
        this.setState({data: data});
        console.log("data", data)


    };


  render(){
    var pathname = window.location.pathname;
    console.log(pathname);

    return(
             <Container className="Fluid">



                 <div className="mainheart"><HeartbeatComponent/></div>
                            {(() => {

                                //AMBULANCE DETAIL VIEW
                                let path = /\/dispatchcall\/(\d+)\/er\//.exec(pathname);
                                if(path){
                                    return <DispatcherCallsDetailContainer route={this.route} pk={path[1]} data={this.state.data}  showNav={false}/>;
                                }

                                // CLIENT ON SCENE VIEW
                                path =  /\/dispatchcall\/(\d+)\/scene\//.exec(pathname);
                                if(path) {
                                    return <ClientContainer route={this.route} handleImage={this.handleImage}
                                                            imageCollection={this.state.imageCollection}
                                                            submitImage={this.submitImage}
                                                            image={this.state.image}
                                                            image_preview={this.state.image_preview}
                                                            dispatchCallId={path[1]}/>;
                                }

                                //DISPATCHER DETAIL VIEW
                                path = /\/dispatchcall\/(\d+)\//.exec(pathname);
                                if(path){
                                    return <DispatcherCallsDetailContainer route={this.route} pk={path[1]} data={this.state.data} showNav={true}/>;
                                }

                                //DISPATCHER LIST VIEW
                                path = /\/dispatchcall\//.exec(pathname);
                                if(path){
                                    return <DispatchCallLogContainer route={this.route} />;
                                }

                                //DISPATCHER CREATE CALL VIEW
                                path = /\/callCreate\//.exec(pathname);
                                if(path){
                                     return <DispatchCurrentCallContainer route={this.route}
                                                                             imageCollection={this.state.imageCollection}
                                                                             image_preview={this.state.image_preview}/>;
                                }


                            })()}


             </Container>
    )
  };

}


export default App;





