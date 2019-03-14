import React, {Component} from 'react';
import { Button} from 'react-bootstrap';


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
            this.setState({callList: json});
            console.log('json', json);

        });

    }

    // list of the previous calls., api request filtered by user - get request


    render() {
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

                        {this.state.callList.map((call) => {
                            return (
                                //add redirect to the call detail page
                                <li key={call.id}><a href="#">
                                   Phone = {call.phone},    Call# = {call.id},    {call.date}</a>
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