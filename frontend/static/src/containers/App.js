import React, { Component } from 'react';

import '../App.css';
import {Container, Form, Button} from 'react-bootstrap';




class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image_preview: "",
            image: "",
            imageCollection: []
    };
        this.handleImage = this.handleImage.bind(this);
        this.submitImage = this.submitImage.bind(this);
        this.addImageToArray = this.addImageToArray.bind(this);

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

    addImageToArray(image) {
        //adds image to the state of imageCollection Array
        // let imageCollection = [...this.state.imageCollection];
         let imageCollection = this.state.imageCollection;
        imageCollection.push(image);
        this.setState({imageCollection});
        console.log(this.state.imageCollection)
    }

    submitImage(e) {
        e.preventDefault();
         const conf = {
                method: "POST",
                body: JSON.stringify(),
                headers: new Headers({"Content-Type": "application/json"})

            };


        //this is sending a null object to the API for image
        fetch('/api/scene/', conf).then((response) => {
            return response.json();
        }).then((json) => {
            this.addImageToArray(json);
            console.log("added")


        // }).then((json)=> {
        //     console.log("data", json);
        //     this.setState({imageCollection: json});
        //     console.log(this.state.imageCollection)
         });



    }


  render(){
    return(

        <div>
          <h1>Testing Image </h1>

     <Form onSubmit={this.submitImage}>
        <Container>
          <img src={this.state.image_preview}/>
          <input className="input" type="file" onChange={this.handleImage} name="image"/>


             <Button className="submitImageButton" type="submit" variant="secondary">Submit This Image !</Button>
        </Container>

     </Form>

        </div>
    )
  };

}


export default App;






