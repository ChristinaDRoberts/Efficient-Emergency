import {Button, Form} from "react-bootstrap";
import React, {Component} from 'react';
import divWithClassName from "react-bootstrap/es/utils/divWithClassName";


// this is going to be the screen the client is pn when submitting images


class ClientContainer extends Component {
    constructor(props) {
        super(props);


    };

    componentDidMount() {

    }


    render() {
        console.log('here', this.props.imageCollection);

        let images = this.props.imageCollection.map(image=>{
            return(
                <li key={image.id}><img src={image.image} alt=""/></li>
            )
        });

        return (

            <div>
                <h1>Please Submit A Photo To Emergency Services</h1>

                <Form onSubmit={this.props.submitImage}>

                    <img src={this.props.image_preview} alt="..."/>
                    <input className="input" type="file" onChange={this.props.handleImage} name="image"/>


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