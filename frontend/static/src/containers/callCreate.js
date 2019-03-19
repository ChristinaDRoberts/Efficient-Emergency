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

           let link =  `${this.state.baseURL + json.id}/scene`;
           //calling the method to sent the link inside this method since i now have the dispatch id in json object and
            // can use iot to make link
           // this.sendTextMessage(link);
           console.log('link', link);

            setInterval(() => this.updateDispatchImages(), 10000);
            this.updateDispatchImages();


        });
    };

    // sendTextMessage = (link) => {
    //     // send to twilio in this method
    // }

    handlePhoneNumber(e) {
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

                <p> {this.state.phone}</p>
                <a href="#"> https://dashboard.heroku.com/apps/efficient-emergency/dispatchcall/{this.state.dispatchInfo.id}/scene</a>


                {/*<Button className="sendText" type="submit" variant="secondary" onClick={this.sendTextMessage}>*/}
                    {/*SEND LINK THROUGH TEXT</Button>*/}

                <div className="imagesFromClient">
                    <ul>
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