import React, {Component} from 'react';
import {Button, Modal, Image} from 'react-bootstrap';

// no data is being passed into here,

class EMSCallsDetailContainer extends Component {
    constructor(props) {
        super(props);
        console.log("emt data", this.props.data)
    }



    render() {

        let specificCall = this.props.data;
        console.log('this props here', this.props);

        return (

            <div>

                    <ul>

                        testing

                        {/*<li key={specificCall.id} className="detail-li">*/}
                             {/*<h3 className="detail-detail"><strong>Call ID #: </strong>{specificCall.id} </h3>*/}
                            {/*<h3 className="detail-detail"><strong>Caller Phone # : </strong>{specificCall.phone}</h3>*/}

                            {/*<h3 className="detail-detail"><strong>Call Date: </strong>{specificCall.date}</h3>*/}
                            {/*/!*<h3 className="detail-detail"><strong>Dispatcher: </strong>{specificCall.user.username}</h3>*!/*/}

                            {/*<h3 className="images-provider-detail-page" >*/}

                                {/*{specificCall.scene_images.map((image) =>*/}
                                     {/*<ModalDetailComponent key={image.id} specificCall={this.props.data} image={image}/>*/}

                                {/*)}*/}
                            {/*</h3>*/}

                        {/*</li>*/}
                    </ul>

            </div>
                )
            }

        }


export default EMSCallsDetailContainer;



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