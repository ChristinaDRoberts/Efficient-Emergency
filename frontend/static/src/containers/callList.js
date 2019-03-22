import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
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


class OpenImagesOnCallList extends Component{
    constructor(props){
        super(props);
           this.state = {
               active: false
           }
    }

    handleToggle = (e) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling
        //this removes the class name of "d-none" off of the images
        e.target.nextSibling.classList.toggle('d-none');
    };

    render(){

        let calls = this.props.callList.map((call) =>
            <li key={call.id}><img src={call.image} alt=""/>

                <p>Call #:{call.id}</p>
                <p>Phone:{call.phone}</p>
                <p>Date:{call.date}</p>
                <Button onClick={this.handleToggle}>Show Images</Button>
                <ul className=' d-none'>

                    <li>
                    {call.scene_images.map((image, index) =>
                             <img className='img-thumbnail' alt="thumbnail" key={index} src={image.image}/>


                    )}
                    </li>
                </ul>
            </li>
        );
        return(
            <div>
                <div className="topDispatch">
                    <h2>Welcome Dispatcher ! Create A New Call, Or Revisit Previous Calls</h2>

                    <Button variant="danger" className="switch" onClick={(e) => {
                        this.props.route("callCreate")
                    }}>Start A Call</Button>

                </div>

                <div className="card-deck">

                    <ul className="card-body">
                        {calls}
                    </ul>

                </div>

            </div>


        )
    }

}
