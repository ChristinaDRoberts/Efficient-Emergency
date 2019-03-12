import React, { Component } from 'react';
import DispatchCallLogContainer from "./dispatchCallLog"
import ClientContainer from "./client"
import DispatchCurrentCallContainer from "./dispatchCurrentCall"

import '../App.css';
import {Container, Form, Button} from 'react-bootstrap';




class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image_preview: "",
            image: "",
            imageCollection: [],
            currentScreen:""
    };
        this.handleImage = this.handleImage.bind(this);
        this.submitImage = this.submitImage.bind(this);
        this.addImageToArray = this.addImageToArray.bind(this);

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
                                    case 'RecipeList':
                                        return <DispatchCallLogContainer route={this.route}
                                                                    imageCollection={this.state.imageCollection}/>;
                                    case 'RecipeForm':
                                        return <DispatchCurrentCallContainer route={this.route} imageCollection={this.state.imageCollection}/>;
                                    case 'AdjustRecipe':
                                        return <ClientContainer route={this.route}
                                                                      imageCollection={this.state.imageCollection} />;
                                   // how do i link sign up screens if these are all react screens
                                }
                            })()}


             </Container>
        </div>
    )
  };

}


export default App;






