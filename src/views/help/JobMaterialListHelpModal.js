import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";




const JobMaterialListHelpModal = () => {
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
                    <Modal.Title>Add Materials Help</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>

                        {/* <div class="modal-body">
                            <img width="750" height="450" src="Images/AddMaterialstoJob.png"/>
                        </div> */}


                                <h5>How to Add Materials to a Job</h5>  
                                    <p> 
                                    1.	Click on “Add Materials” from Job Details page
                                    </p>
                                    <p>
                                    2.	Select one Inventory Item to be assigned to the job, then fill out the remaining field
                                    </p>
                                    <p>
                                    3.	Click on “OK”
                                    </p>                             
                                    
                   
                    <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>


                    

                    
                </Modal.Body>
            </Modal>
        </>
    )
}
export default JobMaterialListHelpModal;




