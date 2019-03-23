import {Button, Form} from "react-bootstrap";
import React, {Component} from 'react';


class DispatchCurrentCallContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            dispatchInfo: {id:""},
            imageCollection : [],
            baseURL: 'https://dashboard.heroku.com/apps/efficient-emergency/dispatchcall/'
        };

        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.createCall = this.createCall.bind(this);
        this.updateDispatchImages = this.updateDispatchImages.bind(this);



    }



    updateDispatchImages(event) {

        console.log('update images');
        // return early to avoid nested mess
        if (!this.state.dispatchInfo.id){
            return;
        }

        fetch(`/api/dispatchcall/${this.state.dispatchInfo.id}/scene/`).then((response) => {
            if (response.status !== 200) {
                console.log("problem")
            }

            return response.json();
        }).then(json => {
            this.setState({imageCollection: json});
            console.log('json', json);

        });
    };


    createCall = (event) => {
        event.preventDefault();



        let phone = {phone: this.state.phone};

        const conf = {
            method: "POST",
            body: JSON.stringify(phone),
            headers: new Headers({"Content-Type": "application/json"})
        };

        fetch('/api/dispatchcall/', conf).then((response) => {
            if (response.status !== 201) {
                console.log("problem")
            }

            return response.json();
        }).then(json => {
            console.log('json', json);
            this.setState({dispatchInfo: json});

            this.intervalId = setInterval(() => this.updateDispatchImages(), 10000);
            this.updateDispatchImages();
        });

    };

    sendTextMessage = (e) => {
        // send to twilio in this method
        e.preventDefault();
        //this just sets a variable only used here so i can console log it and verify
        // let link = `${this.state.baseURL + this.state.dispatchInfo.id}/scene`;
        // console.log('link', link);

        var formData = new FormData();
        formData.append('phone', this.state.phone);

        const conf = {
            method: "POST",
            body: formData,
        };

        fetch(`/api/sendtext/${this.state.dispatchInfo.id}/`, conf)
            .then(response => {
                return response.text();
            }).then(function(response){
                console.log(response);
        });
    };


    componentWillUnmount = (e) =>{
        clearInterval(this.intervalId);
    };

    handlePhoneNumber= (e) => {
        console.log(e.target.name, e.target.value);
        this.setState({[e.target.name]: e.target.value});
    };





    render() {

        let images = this.state.imageCollection.map(image=>{
            return(
                <li key={image.id}><img src={image.image} alt=""/></li>
            )
        });

        return (


            <div>

                <h2 className="wecome-dispatcher">Create an active call and send emergency link to citizen </h2>

                <Form onSubmit={this.createCall}>

                    <label className="label" htmlFor="phone">Enter callers phone number:</label>

                    <input type="tel"
                           id="phone"
                           name="phone"
                           placeholder="Format: 123-456-7890"
                           pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                           required

                           value={this.state.phone}
                           onChange={this.handlePhoneNumber}/>

                    {/*<span className="note">Format: 123-456-7890</span>*/}
                    <br/>


                    <Button className="createCallButton" type="submit" variant="secondary">
                        Create This Call Record</Button>
                </Form>

                <p> {this.state.phone}</p>
                <a href="#"> https://efficient-emergency.herokuapp.com/dispatchcall/{this.state.dispatchInfo.id}/scene</a>


                <Button className="sendText" type="submit" variant="secondary" onClick={this.sendTextMessage}>
                    SEND LINK THROUGH TEXT</Button>

                <div className="imagesFromClient">
                    <ul >
                        {images}
                    </ul>

                </div>

                <Button className="endCall" onClick={(e) =>{
                    this.props.route("/dispatchcall/")
                }}>End Call</Button>

            </div>


        )
    }
}

export default DispatchCurrentCallContainer;