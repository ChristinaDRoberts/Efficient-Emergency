import {Button, Form} from "react-bootstrap";
import React, {Component} from 'react';


class DispatchCurrentCallContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',

        };

        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.createCall = this.createCall.bind(this)

    }


    createCall = (event) => {
        event.preventDefault();

        // console.log('phone', this.state.phone);
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
        });
    };


    handlePhoneNumber(e) {
        console.log(e.target.name, e.target.value);
        this.setState({[e.target.name]: e.target.value});
    };


    //api request to constantly check for image collection to scene

    render() {
        return (

            <div>

                <h2>TDispatch Current Call Page</h2>

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

                <div>
                <Button className="sendText" type="submit" variant="secondary">
                    SEND LINK THROUGH TEXT</Button>
                </div>
            </div>


        )
    }
}

export default DispatchCurrentCallContainer;