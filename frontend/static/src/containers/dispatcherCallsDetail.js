import React, {Component} from 'react';
import {Button, Image} from 'react-bootstrap';


class DispatchCallsDetailContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //im going to need to get the whole list of calls, then im going to need to match the call id with the
            //button i pressed to get info for correct call
            calls : [],
            specificCall: {},
            dispatchCall: 119,
        };

    }

    componentDidMount() {
        //my queryset is alredy set up to only get info filtered to this user
        // cant use this bc dispatchInfo.id is not available as props
        // fetch(`/api/dispatchcall/${this.props.dispatchInfo.id}/scene/`).then((response) => {
        fetch(`/api/dispatchcall/`).then((response) => {
            // fetch(`/api/dispatchCall/`).then((response) => {
            if (response.status !== 200) {
                console.log("problem")
            }

            // this returns picture id, images, and dispatch call info

            return response.json();
        }).then(json => {
            this.setState({calls: json});
            // currently this is just displaying the info from dispatchCall hard coded
            console.log('Calls available', json);

        });
        // i want to write something that will get the specific call id from the call i clicked on. i
        // am not requesting from the specific api of that call bc i need all the info for that call


    }


    render() {

        let specificCall = this.props.data;

        return (

            <div>
                <ul>

                    <li key={specificCall.id}><img src={specificCall.image} alt=""/>
                        <p>Call ID #{specificCall.id} </p>
                        <p>Caller Phone # {specificCall.phone}</p>
                        <p>Call Date{specificCall.date}</p>

                        <p>
                            {specificCall.scene_images.map((image) =>
                                <Image src={image.image}/>
                            )}
                        </p>

                         </li>
                </ul>

                        <TextMedical route={this.props.route}/>

            </div>


        )


    }
}


export default DispatchCallsDetailContainer;

class TextMedical extends Component {
    constructor(props) {
        super(props)
    };


    render() {
        return (
            <div>


                <div>
                    <Button>Send Detail Page To Prisma Trauma <p>864-111-2222</p></Button>
                    <Button>Send Call Detail Page To GC EMS <p>864-333-4444</p></Button>
                    <Button>Send Call Detail Page To Thorne Ambulance <p>864-555-7777</p></Button>
                </div>

                 <Button onClick={(e) => {
                    this.props.route("/dispatchcall/")
                }}>Return To Call List Page </Button>

            </div>


        )
    }
}
