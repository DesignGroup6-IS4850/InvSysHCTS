import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";




const InvoiceHelpModal = () => {
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
                    <Modal.Title>Invoice Help</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>


                        {/* <div class="modal-body">
                            <img width="750" height="450" src="Images/GenerateInvoice.png"/>
                        </div> */}


                                <h5>How to Generate an Invoice</h5>  
                                    <p>
                                    1. After a job has been quoted and materials have been added click on the "Generate Invoice" Button.
                                    </p>
                                    <p>
                                        • Multiple invoices can be created in case of any changes occur during a job
                                    </p>
                                    <p>
                                	•	   Invoices can also be selected and filtered from this page
                                    </p>                             
                                  
                                




                   
                    <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>


                    

                    
                </Modal.Body>
            </Modal>
        </>
    )
}
export default InvoiceHelpModal;


