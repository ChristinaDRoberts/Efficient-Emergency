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

        // form data needs to be set in here
         let formData = new FormData();
          formData.append("image", this.state.image);
          formData.append("image_Preview", this.state.image_preview);
          formData.append("imageCollection", this.state.imageCollection);

          formData.forEach((value, key) => {
            console.log("key %s: value %s", key, value);
        });

         const conf = {
                method: "POST",
                body: formData,
                // headers: new Headers({"Content-Type": "application/json"})

            };


        //this is sending a null object to the API for image
        fetch('/api/scene/', conf).then((response) => {
            return response.json();
        }).then((json) => {
            this.addImageToArray(json);
            console.log("added")


         });

        let images = this.state.imageCollection;
        images.push(this.state.image_preview);
        this.setState({imageCollection: images});

    }


  render(){
    return(

        <div>
          <h1>Testing Image </h1>

     <Form onSubmit={this.submitImage}>
        <Container>
          <img src={this.state.image_preview} alt="..."/>
          <input className="input" type="file" onChange={this.handleImage} name="image"/>


             <Button className="submitImageButton" type="submit" variant="secondary">Submit This Image !</Button>
        </Container>

     </Form>

            <ul>
                {/*{this.state.imageCollection.map(image, index)}*/}
                {/*<li key={index}>*/}
                <li>
                     <img src={this.state.image_preview} alt="..."/>
                </li>
            </ul>

        </div>
    )
  };

}


export default App;






