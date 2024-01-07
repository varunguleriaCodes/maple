import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
const Popup=(props)=>{
    console.log(props)
    return (
        <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Error Popup
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{marginTop:'-15px'}}>
          <p>
            {props.error_message}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Okay</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default Popup