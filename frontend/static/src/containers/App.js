import React, { Component } from 'react';
import DispatchCallLogContainer from "./callList"
import ClientContainer from "./callDetail"
import DispatchCurrentCallContainer from "./callCreate"
import DispatcherCallsDetailContainer from "./dispatcherCallsDetail.js"


import '../App.css';
import {Container} from 'react-bootstrap';




class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentScreen: window.location,

        };
    }



     route = (currentScreen) => {
        console.log("is it setting", currentScreen);
        //setting it tp oan object instead of string
        this.setState({currentScreen: {pathname: currentScreen}});
        // console.log("is it setting", currentScreen)

    };


  render(){
      console.log("TESTING", this.state.currentScreen.pathname);

    return(

        <div>
             <Container className="Fluid">
                            {(() => {
                                switch (this.state.currentScreen.pathname) {
                                    case '/dispatchcall/':
                                        return <DispatchCallLogContainer route={this.route} />;

                                    case 'dispatcherCallsDetail':
                                        // let specificCall = props
                                        return <DispatcherCallsDetailContainer route={this.route}/>;

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
        </div>
    )
  };

}


export default App;






