import {Button, Container, Form} from "react-bootstrap";
import React, {Component} from 'react';

const $ = window.$;
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

    componentDidMount =(e) => {
            // see https://bootstrapious.com/p/bootstrap-sidebar
            $(document).ready(function () {
                $('#sidebarCollapse').on('click', function () {
                    $('#sidebar').toggleClass('active');
                    $(this).toggleClass('active');
                });
            });
        };




    render() {

        let images = this.state.imageCollection.map(image=>{
            return(
                <li key={image.id}><img src={image.image} alt=""/></li>
            )
        });

        return (


            <div className="callCreateMain">

                <h2 className="create-title">Create Active Call and Send Text Message With Link To Submit Photos</h2>
                 <div className="wrapper2">

                     <nav id="sidebar" className="Row">

                       <ul className="list-unstyled components">
                            <li className="active"><Button variant="danger" className="switch btn-outline-light" onClick={(e) => {
                                this.props.route("/dispatchcall/")
                                }}>Call List</Button></li>
                            <li className="nav-start-call"><Button variant="danger" className="switch btn-outline-light" onClick={(e) => {
                                this.props.route("callCreate")
                                }}>Start A Call</Button></li>
                            <li className="nav-logout"><button className="btn btn-light logout logout-calllist"><a className="logout-button" href="https://efficient-emergency.herokuapp.com/">Click to Logout</a>
                            </button></li>
                        </ul>
                    </nav>


                    <div id="content">
                        <button type="button" id="sidebarCollapse" className="navbar-btn">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
                {/*<div className="faux-nav2">*/}
                    {/*<Button className="endCall btn btn-secondary endCallCreate" onClick={(e) =>{*/}
                        {/*this.props.route("/dispatchcall/")*/}
                    {/*}}>End Call</Button>*/}
                    {/*<button className="btn btn-light logout create-call-logout"><a className="logout-button" href="https://efficient-emergency.herokuapp.com/">Click to Logout</a>*/}
                     {/*</button>*/}
                {/*</div>*/}

                <Form onSubmit={this.createCall}>

                    <label className="label-phone" htmlFor="phone">Enter callers phone number:</label>

                    <input className="input-phone"
                           type="tel"
                           id="phone"
                           name="phone"
                           placeholder="Format: 123-456-7890"
                           pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                           required

                           value={this.state.phone}
                           onChange={this.handlePhoneNumber}/>


                    <br/>


                    <Button className="createCallButton" type="submit" variant="secondary">
                        Create This Call Record</Button>
                </Form>



                <Button className="sendText" type="submit" variant="secondary" onClick={this.sendTextMessage}>
                    SEND LINK THROUGH TEXT</Button>

                <p className="link-to-text" href="#"> https://efficient-emergency.herokuapp.com/dispatchcall/{this.state.dispatchInfo.id}/scene</p>

                <div className="imagesFromClient card-columns">
                    <ul>
                        {images}
                    </ul>

                </div>


            </div>


        )
    }
}

export default DispatchCurrentCallContainer;