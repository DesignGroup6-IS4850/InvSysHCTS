import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";




const LaborHelpModal = () => {
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
                    <Modal.Title>Add Labor Help</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>





                    {/* <div class="modal-body">
                            <img width="750" height="450" src="Images/Add-Labor-to-Job.png"/>
                    </div>
                    <div class="modal-body">
                            <img width="750" height="450" src="Images/Add-Labor-to-Job1.png"/>
                    </div> */}
                                <h5>How to Add Labor to a Job</h5>  
                                    <p>
                                    1.	Click on “Add Labor Item” from Job Details page                                    </p>
                                    <p>
                                    2.	Fill out the labor information to be assigned                                    </p>
                                    <p>
                                    3.	Click on “OK”                                    </p>                             
                                    <p>• Labor information can be edited using the blue   button.  Or unassign labor from a job using the red   button                                    </p>
                    




                   
                    <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>


                    

                    
                </Modal.Body>
            </Modal>
        </>
    )
}
export default LaborHelpModal;


