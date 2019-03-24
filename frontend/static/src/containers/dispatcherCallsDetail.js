import React, {Component} from 'react';
import {Button, Image} from 'react-bootstrap';


class DispatchCallsDetailContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let specificCall = this.props.data;

        return (

            <div>
            <div className="card detail-card">
                <div className="card-body detail-body">
                    <ul>
                        <li key={specificCall.id}>
                            <p className="detail-detail">Call ID #: {specificCall.id} </p>
                            <p className="detail-detail">Caller Phone # : {specificCall.phone}</p>
                            <p className="detail-detail">Call Date: {specificCall.date}</p>
                            <p className="detail-detail">Dispatcher: {specificCall.user.username}</p>

                            <p className="images-provider-detail-page">
                                {specificCall.scene_images.map((image) =>
                                    <Image className='img-thumbnail detail-images'  src={image.image}/>
                                )}
                            </p>

                        </li>
                    </ul>
                </div>
            </div>


            <section>
                <TextMedical route={this.props.route}/>
            </section>
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
                <Button className="send-to-field" >Send Detail Page To Prisma Trauma <p>864-111-2222</p></Button>
                <Button className="send-to-field" >Send Call Detail Page To GC EMS <p>864-333-4444</p></Button>
                <Button className="send-to-field" >Send Call Detail Page To Thorne Ambulance <p>864-555-7777</p></Button>
                </div>

                <Button onClick={(e) => {
                    this.props.route("/dispatchcall/")
                }}>Return To Call List Page </Button>

                </div>


                )
            }
            }
