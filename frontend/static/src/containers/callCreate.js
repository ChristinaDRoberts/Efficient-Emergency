import {Button, Form} from "react-bootstrap";
import React, {Component} from 'react';


class DispatchCurrentCallContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            disapatchID: ''
        };

        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.createCall = this.createCall.bind(this);
        this.updateDispatchImages = this.updateDispatchImages.bind(this);
        this.handleCreateLink = this.handleCreateLink.bind(this);

    }

    updateDispatchImages(event) {

        console.log('update images');
        // const conf = {
        //     method: "GET",
        //     headers: new Headers({"Content-Type": "application/json"})
        // };

        fetch('/api/scene/').then((response) => {
            if (response.status !== 200) {
                console.log("problem")
            }
//write a queryset to get only images associated with this dispatch call primary key
            return response.json();
        }).then(json => {
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
            //set state to id tis.setState (json.id)
            setTimeout(() => this.updateDispatchImages, 2000);
            this.updateDispatchImages();

        });
    };


    handlePhoneNumber(e) {
        console.log(e.target.name, e.target.value);
        this.setState({[e.target.name]: e.target.value});
    };

    handleCreateLink = (e) => {
        e.preventDefault();

        //use reverse to make string concatenation , request dispatch call id out
        // call this as event on "Send Link Through Text" button

    };




    render() {
        return (

            <div>

                <h2>Dispatch Current Create Call Page</h2>

                <Form onSubmit={this.createCall}>

                    <label htmlFor="phone">Enter callers phone number:</label>

                    <input type="tel"
                           id="phone"
                           name="phone"
                           placeholder="Enter Phone Number Here"
                           pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                           required

                           value={this.state.phone}
                           onChange={this.handlePhoneNumber}/>

                    <span className="note">Format: 123-456-7890</span>
                    <br/>


                    <Button className="createCallButton" type="submit" variant="secondary">
                        Create This Call Record</Button>
                </Form>


                <Button className="sendText" type="submit" variant="secondary" onClick={this.handleCreateLink}>
                    SEND LINK THROUGH TEXT</Button>

                <div className="imagesFromClient">
                    div of images being uploaded from client will populate through method that
                    has constant Api checks for new info coming in
                </div>

                <Button className="endCall" onClick={(e) => {
                    this.props.route("callList")
                }}>End Call</Button>

            </div>


        )
    }
}

export default DispatchCurrentCallContainer;