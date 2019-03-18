import React, {Component} from 'react';



class DispatchCallsDetailContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //i dont want a list of calls, i want details for individual call
            // dispatchCalls: []
            specificCall: {}
        }

    }

    componentDidMount() {
        //my queryset is alredy set up to only get info filtered to this user
        fetch(`/api/dispatchcall/${this.props.dispatchInfo.id}/scene/`).then((response) => {
        // fetch(`/api/dispatchCall/`).then((response) => {
            if (response.status !== 200) {
                console.log("problem")
            }

            // this returns picture id, images, and dispatch call info

            return response.json();
        }).then(json => {
            this.setState({specificCall: json});
            console.log('json', json);

        });


    }


    render() {
        // this wont work bc dipatchInfo is on child component not parent component
        // let call = this.props.dispatchInfo.id
        //dont map, i want to print this info out for a specific call
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

