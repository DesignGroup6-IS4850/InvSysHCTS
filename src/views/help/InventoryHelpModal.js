import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";




const InventoryHelpModal = () => {
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
                    <Modal.Title>Inventory Help</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    display: "inline-block",
                    textAlign: "left",
                    verticalAlign: "middle"
                }}>

                        {/* <div class="modal-body">
                            <img width="750" height="450" src="Images/GenerateInvoice.png"/>
                        </div> */}
                        

                        {/* <img src="/Images/GenerateInvoice.png"></img> */}
                        {/* <div class="modal-body">
                            <img width="750" height="450" src="Images/CompleteJob.png"/>

                        </div>
                         */}
                    
                      
                    
                                <h5>How to Add Inventory</h5>  
                                    <p>
                                    1. Click on “Inventory” tab from the sidebar or navbar 
                                    </p>
                                    <p>
                                    2.	Click on “Add New Inventory Item”
                                    </p>
                                    <p>
                                    3.	Fill out New Inventory Item form with relevant information
                                    </p>                             
                                    <p>
                                    4.	Click on “Submit”
                                    </p>
                                <h5>Searching and Editing Inventory Items</h5>
                                <p>1. Click on “Inventory” tab from any page in the application</p>
                                <p>2.Inventory items can be searched in the “Filter” field using any related information</p>
                                <p>• Inventory items can also be filtered by viewing all matches within individual list (or tables)</p>
                                <p>• If the current selection does not contain the desired item, number of items listed per page can be increased</p>
                                <p>• Or, item may be located on a different page, select the next page using the controls at bottom of list</p>
                                <p>3. Click on the desired Inventory Item to make updates to item information</p>
                                <p>4. Make all necessary updates to any field</p>
                                <p>• Or, click on “Delete” to completely remove Inventory Item from application </p>
                                <p>• If successfully updated, an “Update Successful” notification will appear.  Simply close pop-up to proceed.</p>
                                
                                {/* <p></p>
                                <p></p>
                                <p></p>
                                <p></p>
                                <p></p>
                                <p></p>
                                <p></p> */}





                   
                    <Button variant="primary" size="sm" onClick={handleClose}>Close</Button>


                    

                    
                </Modal.Body>
            </Modal>
        </>
    )
}
export default InventoryHelpModal;


























// import React, {Component} from 'react';
// import {Button, Modal} from "react-bootstrap";



// const InventoryModal = () => {
//     const [open, setOpen] = React.useState(false);

//     const handleOpen = () => setOpen(true);

//     const handleClose = () => setOpen(false);


//     return(
//         <>
//             <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#exampleModalScrollable">
//                 Help
//             </button>

//                 <div class="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
//                 <div class="modal-dialog modal-dialog-scrollable" role="document">
//                     <div class="modal-content">
//                     <div class="modal-header">
//                         <h5 class="modal-title" id="exampleModalScrollableTitle">Modal title</h5>
//                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                         <span aria-hidden="true">&times;</span>
//                         </button>
//                     </div>
                    
//                     <div class="modal-body">
//                                     <p>
//                                     1. Click on “Inventory” tab from the sidebar or navbar 
//                                     </p>
//                                     <p>
//                                     2.	Click on “Add New Inventory Item”
//                                     </p>
//                                     <p>
//                                     3.	Fill out New Inventory Item form with relevant information
//                                     </p>                             
//                                     <p>
//                                     4.	Click on “Submit”
//                                     </p>
//                                     <p>
//                                     •  If successfully added, an “Add Successful” notification will appear. Simply close pop-up to proceed.
//                                     </p>               
//                     </div>
//                     <div class="modal-footer">
//                         <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
//                     </div>
//                     </div>
//                 </div>
//                 </div>

            
//         </>
//     )
// }



// export default InventoryModal;