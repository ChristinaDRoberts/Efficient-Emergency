import {Button, Form} from "react-bootstrap";
import React, { Component } from 'react';


 // this is going to be the screen the client is pn when submitting images


class ClientContainer extends Component {
    constructor(props) {
        super(props);


    };



render(){
    return(

    <div>
          <h1>Testing Image </h1>

         <Form onSubmit={this.props.submitImage}>

              <img src={this.props.image_preview} alt="..."/>
              <input className="input" type="file" onChange={this.props.handleImage} name="image"/>


                 <Button className="submitImageButton" type="submit" variant="secondary">Submit This Image !</Button>
          </Form>

            <ul>
                {/*{this.state.imageCollection.map(image, index)}*/}
                {/*<li key={index}>*/}
                <li>
                     <img src={this.props.image_preview} alt="..."/>
                </li>
            </ul>

        </div>)



    };
}


export default ClientContainer;