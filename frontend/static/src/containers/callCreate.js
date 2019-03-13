import {Button, Form} from "react-bootstrap";
import React, { Component } from 'react';



class DispatchCurrentCallContainer extends Component {
    constructor(props) {
        super(props);

        this.state ={
            user: '',
            phone: '',
            date: ''
        };


    };


    render() {
        return (
            <div>

                <h2>Testing Dispatch Current Call Page</h2>

                <Form>
                </Form>

            </div>


        )
    }
}

export default DispatchCurrentCallContainer;