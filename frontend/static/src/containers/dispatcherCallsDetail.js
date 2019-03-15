import React, {Component} from 'react';
import {Button} from 'react-bootstrap';


class DispatchCallsDetailContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dispatchCalls: []
        }

    }

    componentDidMount() {
        //my queryset is alredy set up to only get info filtered to this user
        //how do i empty heroku database
        fetch(`/api/dispatchCall/`).then((response) => {
            if (response.status !== 200) {
                console.log("problem")
            }

            // this returns picture id, images, and dispatch call info

            return response.json();
        }).then(json => {
            this.setState({dispatchCalls: json});
            console.log('json', json);

        });


    }


    render() {
        let call = this.state.dispatchCalls.map((dispatchCall) =>
            <li key={dispatchCall.id}><img src={dispatchCall.image} alt=""/>
                <p>{dispatchCall.id}</p>
                <p>{dispatchCall.phone}</p>
                <p>{dispatchCall.date}</p>
                <p>{dispatchCall.user}</p>
                <p>
                    {dispatchCall.scene_images.map((image) =>
                        <img src={image.image}/>
                    )}
                </p>
            </li>
        );

        return (

            <div>
                {call}
            </div>
        )


    }
}


export default DispatchCallsDetailContainer;


//
// {/*<li key={call.id}><img src={call.image} alt=""/>*/}
//                    {/*<p>{call.id}</p>*/}
//                    {/*<p>{call.phone}</p>*/}
//                    {/*<P>{call.date}</P>*/}
//                    {/*<p>{call.user}</p>*/}
//                {/*</li>*/}