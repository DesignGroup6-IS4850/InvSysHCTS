import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";


const NewCustomerHelpModal = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);


    return(
        <>
            <Button variant="primary" size="sm" onClick={handleOpen}>Help</Button>
            <Modal
                size="md"
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    background: 0,
                    boxShadow: "none",
                }}
                scrollable
                show={open}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Customer Help</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>


                    {/* <div class="modal-body">
                        <img width="750" height="450" src="Images/GenerateInvoice.png"/>
                    </div> */}
                        




                    <h5>How to Add New Customers</h5> 
                    <p>
                    1.	Fill out New Customer form with relevant information                                                               
                    </p>
                    <p>
                    2.	Click on “Submit”
                    </p>
                    <p>
                    • If successfully added, an “Add Successful” notification will appear. Simply close pop-up to proceed.</p>
                   
                
                <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>


                    

                    
                </Modal.Body>
            </Modal>
        </>
    )
}
export default NewCustomerHelpModal;
