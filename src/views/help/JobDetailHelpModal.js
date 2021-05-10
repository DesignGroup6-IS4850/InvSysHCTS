import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";




const JobDetailHelpModal = () => {
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
                    <Modal.Title>Job Details Help</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>
                                {/* <h5>How to Add Inventory</h5>   */}
                                    <p>
                                    1. This card allows you to update a job if necessary
                                    </p>
                                    <p>
                                    2.	Update 'Start Date' to update the start of a job
                                    </p>
                                    <p>
                                    3.	Update 'End Date' to update the end of a job
                                    </p>                             
                                    <p>
                                    4.	Click on "Update"
                                    </p>
                                





                   
                    <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>


                    

                    
                </Modal.Body>
            </Modal>
        </>
    )
}
export default JobDetailHelpModal;
