import React, { useState, useEffect, Fragment } from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import Invoice from './components/reports/Invoice'
// import invoice from './data/invoice'
import { API, graphqlOperation } from 'aws-amplify';

// import logo from './logo.svg';
// import './Invoice.css';

const InvoiceViewer = ({ match }) => {

  const [invoice, setInvoice] = useState({
    "id": '',
    "invoice_no": '',
    "balance": '',
    "company": '',
    "email": '',
    "phone": '',
    "address": '',
    "trans_date": '',
    "due_date": '',
    "items": []
  });


  useEffect(() => {
    fetchInvoice(match.params.id);
  }, []);

 /*  const invoice = {
    "id": '',
    "invoice_no": '',
    "balance": '',
    "company": '',
    "email": '',
    "phone": '',
    "address": '',
    "trans_date": '',
    "due_date": '',
    "items": []
  }; */

  // const fetchInvoice = useCallback(async (id) => {
    async function fetchInvoice(id) {

    const apiData = await API.graphql(graphqlOperation(` 
    query GetInvoice($id: ID!) {
        getInvoice(id: $id) {
          items {
            items {
              id
              quantity
              rate
              description
            }
          }
          job {
            id
            customer {
              address
              email
              id
              name
              phone
            }
          }
          id
          number
          transDate
          dueDate
          _version
        }
      }
  `, { id: id }));

    var invoiceResult = apiData.data.getInvoice;

      console.log("Invoice ID: " + id);

    var invoiceItems = [];
    apiData.data.getInvoice.items.items.map(itemResult => {
      console.log("Invoice Item: " + itemResult.description);
      invoiceItems.push({
        sno: itemResult.id,
        desc: itemResult.description,
        qty: itemResult.quantity,
        rate: itemResult.rate
      });
    });

    var printableInvoice = {
          "id": invoiceResult.id,
          "invoice_no": invoiceResult.number,
          "company": invoiceResult.job.customer.name,
          "email": invoiceResult.job.customer.email,
          "phone": invoiceResult.job.customer.phone,
          "address": invoiceResult.job.customer.address,
          "trans_date": invoiceResult.transDate,
          "due_date": invoiceResult.dueDate,
          "items": invoiceItems
        }

/*     invoice.id = invoiceResult.id;
    invoice.invoice_no = invoiceResult.number;
    invoice.balance = "$2,283.74";
    invoice.company = invoiceResult.job.customer.name;
    invoice.email = invoiceResult.job.customer.email;
    invoice.phone = invoiceResult.job.customer.phone;
    invoice.address = invoiceResult.job.customer.address;
    invoice.trans_date = invoiceResult.transDate;
    invoice.due_date = invoiceResult.dueDate;
    invoice.items = invoiceItems; */

    setInvoice(printableInvoice);

    console.log("Created printable invoice: " + invoice);

    console.log("Printable invoice item count: " + invoice.items.length);

    console.log("INVOICE item count: " + invoice.items.length);
  }


  return (
    <Fragment>
      <PDFViewer width="1000" height="600" className="invoice-viewer" >
        <Invoice invoice={invoice} />
      </PDFViewer>
    </Fragment>
  );




}

export default InvoiceViewer;