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
            currentScreen: "callList",
        };

    }



     route = (currentScreen) => {
        this.setState({currentScreen});

    };


  render(){
    return(

        <div>
             <Container className="MainCont">
                            {(() => {
                                switch (this.state.currentScreen) {
                                    case 'callList':
                                        return <DispatchCallLogContainer route={this.route}
                                                                    imageCollection={this.state.imageCollection} />;
                                    case 'callCreate':
                                        return <DispatchCurrentCallContainer route={this.route}
                                                                             imageCollection={this.state.imageCollection}
                                                                             image_preview={this.state.image_preview}/>;
                                    case 'callDetail':
                                        return <ClientContainer route={this.route} handleImage={this.handleImage}
                                                                      imageCollection={this.state.imageCollection}
                                                                        submitImage={this.submitImage}
                                                                        image={this.state.image}
                                                                        image_preview={this.state.image_preview}/>;
                                   // how do i link sign up screens if these are all react screens
                                }
                            })()}


             </Container>
        </div>
    )
  };

}


export default App;






