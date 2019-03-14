import React, {Component} from 'react';
import {Container, Form, Button} from 'react-bootstrap';


class DispatchCallLogContainer extends Component {
    constructor(props) {
        super(props);


    };

    // list of the previous calls., api request filtered by user - get request
    //include images

    render() {
        return (
            <div>
                <div className="topDispatch">
                    <h2>Testing Dispatch Call Log Page</h2>
                    {/*button to start call*/}
                    <Button variant="danger" className="switch" onClick={(e) => {
                        this.props.route("callCreate")
                    }}>Start A Call</Button>

                </div>

                <div>
                    write map function that lists out all the call data in dispatchcall api
                    <ul>

                        {this.props.imageCollection.map((image) => {
                            return (
                                <li key={image.id}>
                                    {image.image}
                                </li>
                            );
                        })}
                    </ul>

                </div>

            </div>


        )
    }
}

export default DispatchCallLogContainer;