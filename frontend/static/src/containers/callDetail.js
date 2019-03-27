import {Button, Form, Card, Row} from "react-bootstrap";
import React, {Component} from 'react';

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
        formData.append("dispatchCall", JSON.stringify(this.props.dispatchCallId));

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


    render() {

        console.log(this.state.image_preview);
        let images = this.state.imageCollection.map(image => {
            return (
                <li className="scene-photo-li" key={image.id}><img src={image.image} alt=""/></li>
            )
        });

        let image;

        if(this.state.image_preview) {
            image = <img className="scene-photos " src={this.state.image_preview} alt="..."/>
        } else {
                // find grey plus sign
            image = <img className="scene-photos " src='https://image.flaticon.com/icons/svg/54/54908.svg' alt="..."/>
        }

        return (

            <div className="scene-div col-xs-12 col-sm-10 col-lg-8 align-self-center">
                <Row className="align-items-center">

                    <div className="col">
                        <h1 className="please-submit-photo">Please Submit A Photo To Emergency Services</h1>
                    </div>
                </Row>

                <div className="row align-items-start image-box-div">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 imagebox">
                        <Form className="client-form" onSubmit={this.submitImage}>

                            <div className="row align-items-center">
                                <div className="col-12">
                                    {image}

                                    <input className="scene-input" type="file" onChange={this.handleImage}
                                           name="image"/>
                                </div>
                            </div>


                            <Button className="submitImageButtonScene" type="submit" variant="secondary">Submit
                                Image</Button>
                        </Form>
                    </div>
                </div>

                <div className=" row align-items-center">
                    <div className="col">
                        <ul className="scene-photo-ul card-columns">
                            {images}
                        </ul>
                    </div>
                </div>

                <button className="btn btn-light logout">End
                    Session
                </button>


            </div>)


    };
}


export default ClientContainer;