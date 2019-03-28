import React, {Component} from 'react';
import {Button, Image, Row, Modal, Container,} from 'react-bootstrap';

// import ModalImage from 'react-modal-image'
const $ = window.$;

class DispatchCallLogContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            callList: []
        }


    };


    componentDidMount() {
        fetch('/api/dispatchcall/').then((response) => {
            if (response.status !== 200) {
                console.log("problem")
            }

            return response.json();
        }).then(json => {
            let callList = [...this.state.callList];
            callList.push(json);
            console.log('json', json);
            this.setState({callList: json});


        });

    }

    render() {

        return (
            <OpenImagesOnCallList callList={this.state.callList} route={this.props.route}/>


        )
    }
}

export default DispatchCallLogContainer;

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }

    handleClose = (e) => {
    this.setState({ active: false });
  };

    handleToggle = (e) => {
        this.setState({active: !this.state.active});

    };

    render() {

        var call = this.props.call;
        return (

            <div className="card">

                <div className="card-body call-list-card">
                    <p>Call #:{call.id}</p>
                    <p>Phone:{call.phone}</p>

                    <Button className="btn btn-secondary" onClick={this.handleToggle}>Show Images</Button>
                    <Modal show={this.state.active} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Scene Images</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <ul  id="image-drop-down">
                                <li >
                                    {call.scene_images.map((image, index) =>
                                        <Image className="img-thumbnail" key={index} src={image.image}/>
                                    )}

                                </li>
                            </ul>

                        </Modal.Body>

                    </Modal>

                    <Button className="btn btn-outline-dark" onClick={(e) => {
                                        this.props.route(`/dispatchcall/${call.id}/`, call)

                                    }}>See/Send Call Detail Page</Button>



            </div>

    </div>
    )
    }
}


class OpenImagesOnCallList extends Component {
    constructor(props) {
        super(props);

    }

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
        // <img src={call.image} alt=""/>

        let calls = this.props.callList.map((call) =>
            <Card key={call.id} call={call} route={this.props.route}/>);


        return (
            <div>
                <div className="topDispatch">
                    <h2 className="wecome-dispatcher">Create A New Call Or Revisit Previous Calls</h2>
                <div>
                   <div className="faux-nav row wrapper2">
                    <nav id="sidebar" className="Row">

                        <ul className="list-unstyled components">
                            <li className="active nav-li"><Button variant="danger" className="switch btn-outline-light" onClick={(e) => {
                                this.props.route("/dispatchcall/")
                                }}>Call List</Button></li>
                            <li className="nav-start-call nav-li"><Button variant="danger" className="switch btn-outline-light" onClick={(e) => {
                                this.props.route("/callCreate\\/")
                                }}>Start A Call</Button></li>
                            <li className="nav-logout nav-li"><button className="btn btn-light logout logout-calllist"><a className="logout-button" href="https://efficient-emergency.herokuapp.com/">Logout</a>
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
                </div>






                </div>

                <div className="card-columns">
                    {calls}
                </div>



            </div>
        )
    }
}

