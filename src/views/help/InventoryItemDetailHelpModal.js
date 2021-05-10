import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";


const InventoryItemDetailHelpModal = () => {
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
                    <Modal.Title>Update Inventory</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>


                    {/* <div class="modal-body">
                        <img width="750" height="450" src="Images/GenerateInvoice.png"/>
                    </div> */}
                        




                <h5>How to Update Inventory Items</h5> 
                    <p>
                    1.	Update the form with relevant information                                                               
                    </p>
                    <p>
                    2.	Click on “Submit”
                    </p>
                    <p>
                    • If successfully updated, an "Update Successful” notification will appear. Simply close pop-up to proceed.</p>
                   
                
                <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>


                    

                    
                </Modal.Body>
            </Modal>
        </>
    )
}
export default InventoryItemDetailHelpModal