import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";








const CustomerHelpModal = () => {
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
                    <Modal.Title>Customers Help</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>
                <h5>How to Add a Customer</h5>
                    <p>
                    1.	Click on “Customer” tab from the sidebar or navbar 
                    </p>
                    <p>
                    2.	Click on “Add New Customer” 
                    </p>
                    <p>
                    3.	Fill out New Customer form with relevant information
                    </p>
                    <p>
                    4.	Click on “Submit”
                    </p>
                    <p>
                    • If successfully added, an “Add Successful” notification will appear. Simply close pop-up to proceed.
                    </p>


                <h5>Searching and Editing Customers </h5>

                    <p>1.	Click on “Customer” tab from any page in the application</p>
                    <p>2.	A Customer can be searched in the “Filter” field using any related information</p>
                    <p>•	Inventory items can also be filtered by viewing all matches within individual list (or tables)</p>
                    <p>•	If the current selection does not contain the desired Customer, number of items listed per page can be increased</p>
                    <p>•	Or, customer may be located on a different page, select the next page using the controls at bottom of list</p>   
                    <p>3.	Click on the desired Customer to make updates to customer’s information</p>
                    <p>4.	Make all necessary updates to any field</p>
                    <p>•	Or, click on “Delete” to completely remove Inventory Item from application </p>
                    <p>•	If successfully updated, an “Update Successful” notification will appear.  Simply close pop-up to proceed.</p>
                 
                   
                    <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>


                    
                </Modal.Body>
            </Modal>
        </>
    )
}
export default CustomerHelpModal;