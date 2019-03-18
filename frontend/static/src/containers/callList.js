import React, {Component} from 'react';
import {Button} from 'react-bootstrap';


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

    // list of the previous calls., api request filtered by user - get request


    render() {

        let calls = this.state.callList.map((call) =>
            <li key={call.id}><img src={call.image} alt=""/>
                <p>I am a call</p>
                <p>{call.id}</p>
                <p>{call.phone}</p>
                <p>{call.date}</p>
                <p className="d-none">
                    {/*button user that will set state write a method for this, which should be diplayed, toggle to remove display none*/}
                    {call.scene_images.map((image, index) =>
                        <img key={index} src={image.image}/>
                    )}
                </p>
            </li>
        );
        return (
            <div>
                <div className="topDispatch">
                    <h2>Welcome Dispatcher ! Create A New Call, Or Revisit Previous Calls</h2>

                    <Button variant="danger" className="switch" onClick={(e) => {
                        this.props.route("callCreate")
                    }}>Start A Call</Button>

                </div>

                <div>

                    <ul>

                        {calls}
                    </ul>

                </div>

            </div>


        )
    }
}

export default DispatchCallLogContainer;