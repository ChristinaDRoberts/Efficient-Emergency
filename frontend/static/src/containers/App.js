import React, { Component } from 'react';
import DispatchCallLogContainer from "./callList"
import ClientContainer from "./callDetail"
import DispatchCurrentCallContainer from "./callCreate"
import DispatcherCallsDetailContainer from "./dispatcherCallsDetail.js"
import HeartbeatComponent from "./heartbeat.js"


import '../App1.css';
import {Container} from 'react-bootstrap';




class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentScreen: window.location,
            data : {}
        };
    }



     route = (currentScreen, data) => {
        //setting it tp oan object instead of string
        this.setState({currentScreen: {pathname: currentScreen}, data:data});
        console.log("data", data)


    };


  render(){
      console.log("TESTING", this.state.currentScreen.pathname);

    return(


             <Container className="Fluid">
                 <div className="mainheart"><HeartbeatComponent/></div>
                            {(() => {
                                switch (this.state.currentScreen.pathname) {
                                    case '/dispatchcall/':
                                        return <DispatchCallLogContainer route={this.route} />;

                                    // case 'dispatcherCallsDetail':
                                    case '/dispatchcall/er/':
                                        // let specificCall = props
                                        return <DispatcherCallsDetailContainer route={this.route} data={this.state.data}/>;

                                    case 'callCreate':
                                        return <DispatchCurrentCallContainer route={this.route}
                                                                             imageCollection={this.state.imageCollection}
                                                                             image_preview={this.state.image_preview}/>;

                                    default :

                                        var pathname = window.location.pathname;
                                        var pathParts = pathname.split("/");
                                        let dispatchCallId = parseInt(pathParts[2]);
                                        console.log("dispatchId", dispatchCallId);



                                        return <ClientContainer route={this.route} handleImage={this.handleImage}
                                                                      imageCollection={this.state.imageCollection}
                                                                        submitImage={this.submitImage}
                                                                        image={this.state.image}
                                                                        image_preview={this.state.image_preview}
                                                                        dispatchCallId={dispatchCallId} />;

                                }
                            })()}


             </Container>
    )
  };

}


export default App;





