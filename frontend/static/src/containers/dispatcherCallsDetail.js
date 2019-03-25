import React, {Component} from 'react';
import {Button, Image, Modal} from 'react-bootstrap';


class DispatchCallsDetailContainer extends Component {
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

        let specificCall = this.props.data;

        return (

            <div>

                    <ul>
                        <li key={specificCall.id}>
                            <p className="detail-detail">Call ID #: {specificCall.id} </p>
                            <p className="detail-detail">Caller Phone # : {specificCall.phone}</p>
                            <p className="detail-detail">Call Date: {specificCall.date}</p>
                            <p className="detail-detail">Dispatcher: {specificCall.user.username}</p>



                            <p className="images-provider-detail-page">
                                {specificCall.scene_images.map((image) =>
                                    <Image className='img-thumbnail detail-images'  src={image.image} onClick={this.handleToggle}/>

                                    // <Modal show={this.state.active} onHide={this.handleClose}>
                                    //     <Modal.Header closeButton>
                                    //         <Modal.Title>Scene Images</Modal.Title>
                                    //     </Modal.Header>
                                    //
                                    //     <Modal.Body>
                                    //         <p className="images-provider-detail-page">
                                    //             {specificCall.scene_images.map((image) =>
                                    //             <Image className='img-thumbnail detail-images'  src={image.image}/>
                                    //     </p>
                                    //
                                    //     </Modal.Body>
                                    // </Modal>

                                )}
                            </p>

                        </li>
                    </ul>



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
            <div className="er-buttons">
                 <Button className="btn btn-secondary return-to-call-list"  onClick={(e) => {
                    this.props.route("/dispatchcall/")
                }}>Return To Call List Page </Button>

                <div className="er-buttons">
                <Button className="send-to-field btn btn-secondary" >Send To Prisma Trauma <p className="er-phone">864-111-2222</p></Button>
                <Button className="send-to-field btn btn-secondary" >Send To GC EMS <p className="er-phone">864-802-1417</p></Button>
                <Button className="send-to-field btn btn-secondary" >Send To Thorne Ambulance <p className="er-phone">864-555-7777</p></Button>
                </div>



            </div>


                )
            }
            }
