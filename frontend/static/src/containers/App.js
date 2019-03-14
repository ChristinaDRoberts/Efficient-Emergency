import React, { Component } from 'react';
import DispatchCallLogContainer from "./callList"
import ClientContainer from "./callDetail"
import DispatchCurrentCallContainer from "./callCreate"

import '../App.css';
import {Container} from 'react-bootstrap';




class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //after loggin in i am taken to error screen bc its not following urls correctly
            currentScreen: window.location,
        };

    }



     route = (currentScreen) => {
        this.setState({currentScreen});

    };


  render(){
      console.log(this.state.currentScreen.pathname);

    return(

        <div>
             <Container className="MainCont">
                            {(() => {
                                switch (this.state.currentScreen.pathname) {
                                    case 'callList':
                                        return <DispatchCallLogContainer route={this.route}
                                                                    imageCollection={this.state.imageCollection} />;
                                    case '/dispatchcall/':
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
                                   // how do i link sign up screens if these are all react screens
                                }
                            })()}


             </Container>
        </div>
    )
  };

}


export default App;






