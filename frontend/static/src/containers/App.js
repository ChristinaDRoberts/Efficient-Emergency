import React, { Component } from 'react';
import DispatchCallLogContainer from "./callList"
import ClientContainer from "./callDetail"
import DispatchCurrentCallContainer from "./callCreate"
import DispatcherCallsDetailContainer from "./dispatcherCallsDetail.js"
import HeartbeatComponent from "./heartbeat.js"


import '../App1.css';
import {Container} from 'react-bootstrap';




class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentScreen: window.location,
            data : {}
        };
    }



     route = (currentScreen, data) => {
        // console.log("is it setting", currentScreen);
        //setting it tp oan object instead of string
        this.setState({currentScreen: {pathname: currentScreen}, data:data});
        // console.log("is it setting", currentScreen)

    };


  render(){
      console.log("TESTING", this.state.currentScreen.pathname);

    return(

        <div className="main">
             <Container className="Fluid">
                 <div className="mainheart"><HeartbeatComponent/></div>
                            {(() => {
                                switch (this.state.currentScreen.pathname) {
                                    case '/dispatchcall/':
                                        return <DispatchCallLogContainer route={this.route} />;

                                    case 'dispatcherCallsDetail':
                                        // let specificCall = props
                                        return <DispatcherCallsDetailContainer route={this.route} data={this.state.data}/>;

                                    case 'callCreate':
                                        return <DispatchCurrentCallContainer route={this.route}
                                                                             imageCollection={this.state.imageCollection}
                                                                             image_preview={this.state.image_preview}/>;

                                    default :

                                        var pathname = window.location.pathname;
                                        var pathParts = pathname.split("/");
                                        let dispatchCallId = parseInt(pathParts[2]);
                                        console.log("dispatchId", dispatchCallId);



                                        return <ClientContainer route={this.route} handleImage={this.handleImage}
                                                                      imageCollection={this.state.imageCollection}
                                                                        submitImage={this.submitImage}
                                                                        image={this.state.image}
                                                                        image_preview={this.state.image_preview}
                                                                        dispatchCallId={dispatchCallId} />;

                                }
                            })()}


             </Container>
        </div>
    )
  };

}


export default App;


// class ModalImages extends Component {
//     constructor(props) {
// 		this.state = {item : null}
// 	}
// 	passItemToModal(item){
// 		this.setState({
// 			detailModal: true,
// 			item: item
// 		})
// 	}
// 	closeDetailModal() {
// 		this.setState({
// 			detailModal: false
// 		})
// 	}
// 	openDetailModal() {
// 		this.setState({
// 			detailModal: true
// 		})
// 	}
// 	render(){
// 		return(
// 		<Grid passItemToModal={this.passItemToModal.bind(this)}></Grid>
// 		<Modal
// 			overlayClassName="detail-modal-overlay"
// 			className="detail-modal"
// 			isOpen={this.state.detailModal}
// 			onRequestClose={this.closeDetailModal.bind(this)}>
// 			{  this.state.item ? this.renderContent(this.state.item) : null };
// 		</Modal>
//     )
// 	}
//
// }
//
// export default ModalIMages
//
//




