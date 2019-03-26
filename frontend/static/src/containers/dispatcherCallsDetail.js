import React, {Component} from 'react';
import {Button, Image, Modal} from 'react-bootstrap';
import divWithClassName from "react-bootstrap/es/utils/divWithClassName";


class DispatchCallsDetailContainer extends Component {
    constructor(props) {
        super(props);


    }



    render() {

        let specificCall = this.props.data;

        return (

            <div>

                    <ul>
                        <li key={specificCall.id} className="detail-li">
                             <h3 className="detail-detail"><strong>Call ID #: </strong>{specificCall.id} </h3>
                            <h3 className="detail-detail"><strong>Caller Phone # : </strong>{specificCall.phone}</h3>

                            <h3 className="detail-detail"><strong>Call Date: </strong>{specificCall.date}</h3>
                            <h3 className="detail-detail"><strong>Dispatcher: </strong>{specificCall.user.username}</h3>

                             <Button className="btn btn-secondary return-to-call-list"  onClick={(e) => {
                    this.props.route("/dispatchcall/")
                }}>Return To Call List Page </Button>

                            <h3 className="images-provider-detail-page" >

                                {specificCall.scene_images.map((image) =>
                                     <ModalDetailComponent specificCall={this.props.data} image={image}/>

                                )}
                            </h3>

                        </li>
                    </ul>



            <section>
                <TextMedical route={this.props.route}/>
            </section>

                <button className="btn btn-light logout"><a className="logout-button" href="https://efficient-emergency.herokuapp.com/">Click to Logout</a>
                 </button>
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
                 {/*<Button className="btn btn-secondary return-to-call-list"  onClick={(e) => {*/}
                    {/*this.props.route("/dispatchcall/")*/}
                {/*}}>Return To Call List Page </Button>*/}

                <div className="er-buttons">
                <Button className="send-to-field btn btn-secondary" >Send To Prisma Trauma <p className="er-phone">864-111-2222</p></Button>
                <Button className="send-to-field btn btn-secondary" >Send To GC EMS <p className="er-phone">864-802-1417</p></Button>
                <Button className="send-to-field btn btn-secondary" >Send To Thorne Ambulance <p className="er-phone">864-555-7777</p></Button>
                </div>



            </div>


                )
            }
            }


class ModalDetailComponent extends Component{
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

    render(){
        let specificCall = this.props.specificCall;
        let image = this.props.image;



    return(
        <div>

            <Image  className='img-thumbnail detail-images'  src={image.image} onClick={this.handleToggle}/>


                <Modal className="detail-modal-main" show={this.state.active} onHide={this.handleClose}>
                    <Modal.Header closeButton> </Modal.Header>
                        <Modal.Body>
                            <Image className='detail-modal'  src={image.image}/>
                        </Modal.Body>
                </Modal>
        </div>

    )
    }
}
