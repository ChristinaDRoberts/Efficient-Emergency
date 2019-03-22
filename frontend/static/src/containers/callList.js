import React, {Component} from 'react';
import {Button, Image} from 'react-bootstrap';
import divWithClassName from "react-bootstrap/es/utils/divWithClassName";


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

    handleToggle = (e) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling
        //this removes the class name of "d-none" off of the images
        // e.target.nextSibling.classList.toggle('d-none');
        this.setState({active: !this.state.active});
    };

    render() {
        var call = this.props.call;
        return (
            <div className="card">
                <div className="card-body">
                    <p>Call #:{call.id}</p>
                    <p>Phone:{call.phone}</p>
                    {/*<p>Date:{call.date}</p>*/}
                    <Button onClick={this.handleToggle}>Show Images</Button>

                    <ul className={this.state.active ? '' : 'd-none'} id="image-drop-down">
                        <li>
                            {call.scene_images.map((image, index) =>
                                <Image className="img-thumbnail" key={index} src={image.image}/>
                            )}
                            <Button onClick={(e) => {
                                this.props.route("dispatcherCallsDetail")
                            }}>See/Send Call Detail Page</Button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}


class OpenImagesOnCallList extends Component {
    constructor(props) {
        super(props);

    }



    render() {
        // <img src={call.image} alt=""/>

        let calls = this.props.callList.map((call) =>
            <Card key={call.id} call={call} route={this.props.route}/>);


                return(
                <div>
                    <div className="topDispatch">
                        <h2>Welcome Dispatcher ! Create A New Call, Or Revisit Previous Calls</h2>

                        <Button variant="danger" className="switch" onClick={(e) => {
                            this.props.route("callCreate")
                        }}>Start A Call</Button>

                    </div>

                    <div className="card-deck">
                        {calls}
                    </div>

                </div>
                )
                }
            }

