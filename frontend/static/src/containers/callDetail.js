import {Button, Form} from "react-bootstrap";
import React, {Component} from 'react';
import divWithClassName from "react-bootstrap/es/utils/divWithClassName";


// this is going to be the screen the client is pn when submitting images


class ClientContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_preview: "",
            imageCollection: [],
            image: "",
        };
        this.handleImage = this.handleImage.bind(this);
        this.submitImage = this.submitImage.bind(this);
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

        };


        fetch('/api/scene/', conf).then((response) => {
            return response.json();
        }).then((json) => {

            let imageCollection = [...this.state.imageCollection];
            imageCollection.push(json);


            this.setState({imageCollection});
            this.setState({image_preview: ""});

            console.log('added', imageCollection);
        });
    };

    componentDidMount() {

    }


    render() {


        let images = this.state.imageCollection.map(image => {
            return (
                <li key={image.id}><img src={image.image} alt=""/></li>
            )
        });

        return (

            <div>
                <h1>Please Submit A Photo To Emergency Services</h1>

                <Form onSubmit={this.submitImage}>

                    <img src={this.state.image_preview} alt="..."/>
                    <input className="input" type="file" onChange={this.handleImage} name="image"/>


                    <Button className="submitImageButton" type="submit" variant="secondary">Submit This Image !</Button>
                </Form>

                <div>
                    <ul>
                        {images}
                    </ul>
                </div>


            </div>)


    };
}


export default ClientContainer;