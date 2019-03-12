import {Button, Form} from "react-bootstrap";
import React, { Component } from 'react';


class ClientContainer extends Component{
    constructor(props){
        super(props);

    };

    this.handleImage=this.handleImage.bind(this);
    this.addImageToArray=this.addImageToArray.bind(this);
}


    handleImage(event){
            //sets the preview box of image in react element
            event.preventDefault();

            let file = event.target.files[0];
            let fileReader = new FileReader();
            fileReader.onloadend = () => this.setState({image_preview: fileReader.result});
            fileReader.readAsDataURL(file);
            this.setState({image: file});
        }

    addImageToArray(image){
        //adds image to the state of imageCollection Array
        // let imageCollection = [...this.state.imageCollection];
         let imageCollection = this.state.imageCollection;
        imageCollection.push(image);
        this.setState({imageCollection});
        console.log(this.state.imageCollection)
    }

    submitImage(e){
        e.preventDefault();

        // form data needs to be set in here
         let formData = new FormData();
          formData.append("image", this.props.image);
          formData.append("image_Preview", this.props.image_preview);
          formData.append("imageCollection", this.props.imageCollection);

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
            this.addImageToArray(json);
            console.log("added")


         });

        let images = this.props.imageCollection;
        images.push(this.props.image_preview);
        this.setState({imageCollection: images});

    }



render(){
    return(

    <div>
          <h1>Testing Image </h1>

         <Form onSubmit={this.submitImage}>

              <img src={this.state.image_preview} alt="..."/>
              <input className="input" type="file" onChange={this.handleImage} name="image"/>


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


export default ClientContainer;