import {Button, Form} from "react-bootstrap";
import React, {Component} from 'react';


class DispatchCurrentCallContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            dispatchInfo: {id:""},
            imageCollection : []
        };

        this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
        this.createCall = this.createCall.bind(this);
        this.updateDispatchImages = this.updateDispatchImages.bind(this);
        this.handleCreateLink = this.handleCreateLink.bind(this);


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

            setInterval(() => this.updateDispatchImages(), 10000);
            this.updateDispatchImages();


        });
    };


    handlePhoneNumber(e) {
        console.log(e.target.name, e.target.value);
        this.setState({[e.target.name]: e.target.value});
    };

    handleCreateLink = (e) => {
        e.preventDefault();

        let id = this.state.dispatchInfo.id;
        let link =  (`localhost:8000/dispatchcalls/ $(id) /scene`) ;
        console.log("link", link);
        // send link to twilio file

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
                <a href="#"> https://dashboard.heroku.com/apps/efficient-emergency/{this.state.dispatchInfo.id}/scene</a>


                <Button className="sendText" type="submit" variant="secondary" onClick={this.handleCreateLink}>
                    SEND LINK THROUGH TEXT</Button>

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