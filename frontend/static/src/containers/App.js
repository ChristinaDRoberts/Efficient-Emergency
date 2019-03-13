import React, { Component } from 'react';
import DispatchCallLogContainer from "./callList"
import ClientContainer from "./callDetail"
import DispatchCurrentCallContainer from "./callCreate"

import '../App.css';
import {Container, Form, Button} from 'react-bootstrap';




class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image_preview: "",
            imageCollection: [],
            image: "",
            currentScreen:"callDetail",
        };

     this.handleImage = this.handleImage.bind(this);
     this.submitImage=this.submitImage.bind(this);
    }

    handleImage(event) {
        //sets the preview box of image in react element
        event.preventDefault();

        let file = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.onloadend = () => this.setState({image_preview: fileReader.result});
        fileReader.readAsDataURL(file);
        this.setState({image: file});

    }


    submitImage(e) {
        e.preventDefault();

        // form data needs to be set in here
        let formData = new FormData();
        formData.append("image", this.state.image);
        // formData.append("image_Preview", this.state.image_preview);
        formData.append("imageCollection", JSON.stringify(this.state.imageCollection));

        formData.forEach((value, key) => {
            console.log("key %s: value %s", key, value);
        });

        const conf = {
            method: "POST",
            body: formData,
            // headers: new Headers({"Content-Type": "application/json"})

        };


        fetch('/api/scene/', conf).then((response) => {
            return response.json();
        }).then((json) => {

             let imageCollection = [...this.state.imageCollection];
             imageCollection.push(json);

             // both of these have error
            this.setState({imageCollection});
            this.setState({image_preview: ""});

             console.log('added', imageCollection);


        });





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






