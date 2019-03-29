import React, {Component} from 'react';
import {Button, Container, Image, Modal, Nav} from 'react-bootstrap';


const $ = window.$;

class DispatchCallsDetailContainer extends Component {
    constructor(props) {
        super(props);
        console.log("props available to DispcallsDetcont", this.props);
        this.state = {
            callData: this.props.data
        }


    }

    componentDidMount = (e) => {
        if (!this.state.callData.id) {
            console.log("pk", this.props.pk);


            // i need to fetch for this specific call
            // the this.props.data is sending me an enpty object so i need at fetch request for the specific call #
            //     thats in url
            fetch(`/api/dispatchcall/${this.props.pk}/er/`).then((response) => {
                if (response.status !== 200) {
                    console.log("problem");
                    return;
                }
                return response.json();
            }).then(json => {
                this.setState({callData: json});
                console.log("response here i am", json)
            });
        }


        // see https://bootstrapious.com/p/bootstrap-sidebar
        $(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
                $(this).toggleClass('active');
            });
        });
    };


    render() {
        // console.log('here navDisplay', this.state.displayNav);

        let specificCall = this.state.callData;
        console.log('this props here state call data', this.state.callData);

        if (!this.state.callData.id) {
            return <div>Loading...</div>
        }




        return (
            <div>

                {this.props.showNav ? (
                <div>
                    <div className="wrapper2 row faux-nav">

                        <nav id="sidebar" className="Row">

                            <ul className="list-unstyled components">
                                <li className="active"><Button variant="danger" className="switch btn-outline-light"
                                                               onClick={(e) => {
                                                                   this.props.route("/dispatchcall/")
                                                               }}>Call List</Button></li>


                                <li className="nav-start-call"><Button variant="danger"
                                                                       className="switch btn-outline-light"
                                                                       onClick={(e) => {
                                                                           this.props.route("/callCreate\\/")
                                                                       }}>Start A Call</Button></li>
                                <li className="nav-logout">
                                    <button className="btn btn-light switch logout-calllist"><a
                                        className="logout-button" href="https://efficient-emergency.herokuapp.com/">Click
                                        to Logout</a>
                                    </button>
                                </li>
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
                </div>
                 ) : null}

                <ul>

                    <li key={specificCall.id} className="detail-li">
                        <h3 className="detail-detail"><strong>Call ID #: </strong>{specificCall.id} </h3>
                        <h3 className="detail-detail"><strong>Caller Phone # : </strong>{specificCall.phone}</h3>

                        <h3 className="detail-detail"><strong>Call Date: </strong>{specificCall.date}</h3>
                        <h3 className="detail-detail"><strong>Dispatcher: </strong>{specificCall.user.username}</h3>


                        <h3 className="images-provider-detail-page">

                            {specificCall.scene_images.map((image) =>
                                <ModalDetailComponent key={image.id} specificCall={this.state.callData} image={image}/>
                            )}
                        </h3>

                    </li>
                </ul>


                {this.props.showNav ? (
                    <section>
                        <TextMedical route={this.props.route} dispatchId={this.state.callData}/>
                    </section>
                ) : null}

            </div>

        )
    }
}


export default DispatchCallsDetailContainer;

class TextMedical extends Component {
    constructor(props) {
        super(props);


    }


    sendTextMessage = (e) => {
        e.preventDefault();
        console.log('debug', this.props);

        console.log("dispatchid", this.props.dispatchId);


        let BASE_URL = "https://efficient-emergency.herokuapp.com/";

        let phone = "8644177693";
        var formData = new FormData();
        formData.append('phone', phone);
        const conf = {
            method: "POST",
            body: formData,

        };


        fetch(`${BASE_URL}api/sendtext/${this.props.dispatchId.id}/er/`, conf)
            .then(response => {
                return response.text();
            }).then(function (response) {
                // console.log(response);
                console.log("fetch response completed")

            }
        );
    };


    render() {
        return (
            <div className="er-buttons">

                <div className="er-buttons">
                    <Button className="send-to-field btn btn-secondary">Send To Prisma Trauma <p
                        className="er-phone">864-111-2222</p></Button>
                    <Button className="send-to-field btn btn-secondary" onClick={this.sendTextMessage}>Send To GC EMS <p
                        className="er-phone">864-802-1417</p></Button>
                    <Button className="send-to-field btn btn-secondary">Send To Thorne Ambulance <p
                        className="er-phone">864-555-7777</p></Button>
                </div>


            </div>


        )
    }
}


class ModalDetailComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        }
    }

    handleClose = (e) => {
        this.setState({active: false});
    };

    handleToggle = (e) => {
        this.setState({active: !this.state.active});

    };

    render() {
        let specificCall = this.props.specificCall;
        let image = this.props.image;


        return (
            <div>

                <Image className='img-thumbnail detail-images' src={image.image} onClick={this.handleToggle}/>


                <Modal className="detail-modal-main" show={this.state.active} onHide={this.handleClose}>
                    <Modal.Header closeButton> </Modal.Header>
                    <Modal.Body>
                        <Image className='detail-modal' src={image.image}/>
                    </Modal.Body>
                </Modal>
            </div>

        )
    }
}
