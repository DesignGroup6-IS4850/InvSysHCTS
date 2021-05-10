import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";


const JobsHelpModal = () => {
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
                    <Modal.Title>Jobs Help</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>


                    {/* <div class="modal-body">
                        <img width="750" height="450" src="Images/GenerateInvoice.png"/>
                    </div> */}
                        




                <h5>How to Add Jobs</h5> 
                    <p>
                    1. Click on “Jobs” tab from any page in the application 
                    </p>
                    <p>
                    2.	Click on “Add New Job”
                    </p>
                    <p>
                    3.	Fill out New Job form with relevant information                                    </p>                             
                    <p>
                    4.	Click on “Submit”
                    </p>
                    <p>
                    • If successfully added, an “Add Successful” notification will appear. Simply close pop-up to proceed.
                    </p>
                <h5>Searching and Editing Inventory Items </h5>
                    <p>1.	Click on “Jobs” tab from any page in the application</p>
                    <p>2.	A Job can be searched in the “Filter” field using any related information</p>
                    <p>•	Jobs can also be filtered by viewing all matches within individual list (or tables)</p>
                    <p>•	If the current selection does not contain the desired Job, number of items listed per page can be increased</p>
                    <p>•	Or, a Job may be located on a different page, select the next page using the controls at bottom of list</p>   
                    <p>3.	Click on the desired Job to make updates to customer’s information</p>
                    <p>A Job can also be located and selected from the “Home” or “Calendar” tab.</p>
                    <p>4.	Make all necessary updates to any field</p>
                    <p>•	Or, click on “Delete” to completely remove the Job from application</p>
                    <p>5.	Click on “Update”</p>                  
                    <p>•	If successfully updated, an “Update Successful” notification will appear.  Simply close pop-up to proceed.</p>
                  
                
                
                
                <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>


                    

                    
                </Modal.Body>
            </Modal>
        </>
    )
}
export default JobsHelpModal;









