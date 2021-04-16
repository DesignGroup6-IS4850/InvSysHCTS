/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateInventoryItem = /* GraphQL */ `
  subscription OnCreateInventoryItem {
    onCreateInventoryItem {
      id
      name
      quantity
      description
      brand
      category
      jobs {
        items {
          id
          jobQuantity
          jobPrice
          createdAt
          updatedAt
        }
        nextToken
      }
      _version
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInventoryItem = /* GraphQL */ `
  subscription OnUpdateInventoryItem {
    onUpdateInventoryItem {
      id
      name
      quantity
      description
      brand
      category
      jobs {
        items {
          id
          jobQuantity
          jobPrice
          createdAt
          updatedAt
        }
        nextToken
      }
      _version
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInventoryItem = /* GraphQL */ `
  subscription OnDeleteInventoryItem {
    onDeleteInventoryItem {
      id
      name
      quantity
      description
      brand
      category
      jobs {
        items {
          id
          jobQuantity
          jobPrice
          createdAt
          updatedAt
        }
        nextToken
      }
      _version
      createdAt
      updatedAt
    }
  }
`;
export const onCreateJob = /* GraphQL */ `
  subscription OnCreateJob {
    onCreateJob {
      id
      name
      startDate
      endDate
      completed
      customer {
        id
        name
        email
        phone
        address
        _version
        createdAt
        updatedAt
      }
      inventory {
        items {
          id
          jobQuantity
          jobPrice
          createdAt
          updatedAt
        }
        nextToken
      }
      invoices {
        items {
          id
          number
          transDate
          dueDate
          _version
          createdAt
          updatedAt
        }
        nextToken
      }
      laborItems {
        items {
          id
          description
          quantity
          rate
          createdAt
          updatedAt
        }
        nextToken
      }
      _version
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateJob = /* GraphQL */ `
  subscription OnUpdateJob {
    onUpdateJob {
      id
      name
      startDate
      endDate
      completed
      customer {
        id
        name
        email
        phone
        address
        _version
        createdAt
        updatedAt
      }
      inventory {
        items {
          id
          jobQuantity
          jobPrice
          createdAt
          updatedAt
        }
        nextToken
      }
      invoices {
        items {
          id
          number
          transDate
          dueDate
          _version
          createdAt
          updatedAt
        }
        nextToken
      }
      laborItems {
        items {
          id
          description
          quantity
          rate
          createdAt
          updatedAt
        }
        nextToken
      }
      _version
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteJob = /* GraphQL */ `
  subscription OnDeleteJob {
    onDeleteJob {
      id
      name
      startDate
      endDate
      completed
      customer {
        id
        name
        email
        phone
        address
        _version
        createdAt
        updatedAt
      }
      inventory {
        items {
          id
          jobQuantity
          jobPrice
          createdAt
          updatedAt
        }
        nextToken
      }
      invoices {
        items {
          id
          number
          transDate
          dueDate
          _version
          createdAt
          updatedAt
        }
        nextToken
      }
      laborItems {
        items {
          id
          description
          quantity
          rate
          createdAt
          updatedAt
        }
        nextToken
      }
      _version
      createdAt
      updatedAt
    }
  }
`;
export const onCreateJobInventory = /* GraphQL */ `
  subscription OnCreateJobInventory {
    onCreateJobInventory {
      id
      jobQuantity
      jobPrice
      job {
        id
        name
        startDate
        endDate
        completed
        customer {
          id
          name
          email
          phone
          address
          _version
          createdAt
          updatedAt
        }
        inventory {
          nextToken
        }
        invoices {
          nextToken
        }
        laborItems {
          nextToken
        }
        _version
        createdAt
        updatedAt
      }
      inventoryItem {
        id
        name
        quantity
        description
        brand
        category
        jobs {
          nextToken
        }
        _version
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateJobInventory = /* GraphQL */ `
  subscription OnUpdateJobInventory {
    onUpdateJobInventory {
      id
      jobQuantity
      jobPrice
      job {
        id
        name
        startDate
        endDate
        completed
        customer {
          id
          name
          email
          phone
          address
          _version
          createdAt
          updatedAt
        }
        inventory {
          nextToken
        }
        invoices {
          nextToken
        }
        laborItems {
          nextToken
        }
        _version
        createdAt
        updatedAt
      }
      inventoryItem {
        id
        name
        quantity
        description
        brand
        category
        jobs {
          nextToken
        }
        _version
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteJobInventory = /* GraphQL */ `
  subscription OnDeleteJobInventory {
    onDeleteJobInventory {
      id
      jobQuantity
      jobPrice
      job {
        id
        name
        startDate
        endDate
        completed
        customer {
          id
          name
          email
          phone
          address
          _version
          createdAt
          updatedAt
        }
        inventory {
          nextToken
        }
        invoices {
          nextToken
        }
        laborItems {
          nextToken
        }
        _version
        createdAt
        updatedAt
      }
      inventoryItem {
        id
        name
        quantity
        description
        brand
        category
        jobs {
          nextToken
        }
        _version
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLaborItem = /* GraphQL */ `
  subscription OnCreateLaborItem {
    onCreateLaborItem {
      id
      description
      quantity
      rate
      job {
        id
        name
        startDate
        endDate
        completed
        customer {
          id
          name
          email
          phone
          address
          _version
          createdAt
          updatedAt
        }
        inventory {
          nextToken
        }
        invoices {
          nextToken
        }
        laborItems {
          nextToken
        }
        _version
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLaborItem = /* GraphQL */ `
  subscription OnUpdateLaborItem {
    onUpdateLaborItem {
      id
      description
      quantity
      rate
      job {
        id
        name
        startDate
        endDate
        completed
        customer {
          id
          name
          email
          phone
          address
          _version
          createdAt
          updatedAt
        }
        inventory {
          nextToken
        }
        invoices {
          nextToken
        }
        laborItems {
          nextToken
        }
        _version
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLaborItem = /* GraphQL */ `
  subscription OnDeleteLaborItem {
    onDeleteLaborItem {
      id
      description
      quantity
      rate
      job {
        id
        name
        startDate
        endDate
        completed
        customer {
          id
          name
          email
          phone
          address
          _version
          createdAt
          updatedAt
        }
        inventory {
          nextToken
        }
        invoices {
          nextToken
        }
        laborItems {
          nextToken
        }
        _version
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer {
    onCreateCustomer {
      id
      name
      email
      phone
      address
      _version
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer {
    onUpdateCustomer {
      id
      name
      email
      phone
      address
      _version
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer {
    onDeleteCustomer {
      id
      name
      email
      phone
      address
      _version
      createdAt
      updatedAt
    }
  }
`;
export const onCreateInvoice = /* GraphQL */ `
  subscription OnCreateInvoice {
    onCreateInvoice {
      id
      number
      transDate
      dueDate
      items {
        items {
          id
          description
          quantity
          rate
          _version
          createdAt
          updatedAt
        }
        nextToken
      }
      job {
        id
        name
        startDate
        endDate
        completed
        customer {
          id
          name
          email
          phone
          address
          _version
          createdAt
          updatedAt
        }
        inventory {
          nextToken
        }
        invoices {
          nextToken
        }
        laborItems {
          nextToken
        }
        _version
        createdAt
        updatedAt
      }
      _version
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInvoice = /* GraphQL */ `
  subscription OnUpdateInvoice {
    onUpdateInvoice {
      id
      number
      transDate
      dueDate
      items {
        items {
          id
          description
          quantity
          rate
          _version
          createdAt
          updatedAt
        }
        nextToken
      }
      job {
        id
        name
        startDate
        endDate
        completed
        customer {
          id
          name
          email
          phone
          address
          _version
          createdAt
          updatedAt
        }
        inventory {
          nextToken
        }
        invoices {
          nextToken
        }
        laborItems {
          nextToken
        }
        _version
        createdAt
        updatedAt
      }
      _version
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInvoice = /* GraphQL */ `
  subscription OnDeleteInvoice {
    onDeleteInvoice {
      id
      number
      transDate
      dueDate
      items {
        items {
          id
          description
          quantity
          rate
          _version
          createdAt
          updatedAt
        }
        nextToken
      }
      job {
        id
        name
        startDate
        endDate
        completed
        customer {
          id
          name
          email
          phone
          address
          _version
          createdAt
          updatedAt
        }
        inventory {
          nextToken
        }
        invoices {
          nextToken
        }
        laborItems {
          nextToken
        }
        _version
        createdAt
        updatedAt
      }
      _version
      createdAt
      updatedAt
    }
  }
`;
export const onCreateInvoiceItem = /* GraphQL */ `
  subscription OnCreateInvoiceItem {
    onCreateInvoiceItem {
      id
      description
      quantity
      rate
      invoice {
        id
        number
        transDate
        dueDate
        items {
          nextToken
        }
        job {
          id
          name
          startDate
          endDate
          completed
          _version
          createdAt
          updatedAt
        }
        _version
        createdAt
        updatedAt
      }
      _version
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInvoiceItem = /* GraphQL */ `
  subscription OnUpdateInvoiceItem {
    onUpdateInvoiceItem {
      id
      description
      quantity
      rate
      invoice {
        id
        number
        transDate
        dueDate
        items {
          nextToken
        }
        job {
          id
          name
          startDate
          endDate
          completed
          _version
          createdAt
          updatedAt
        }
        _version
        createdAt
        updatedAt
      }
      _version
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInvoiceItem = /* GraphQL */ `
  subscription OnDeleteInvoiceItem {
    onDeleteInvoiceItem {
      id
      description
      quantity
      rate
      invoice {
        id
        number
        transDate
        dueDate
        items {
          nextToken
        }
        job {
          id
          name
          startDate
          endDate
          completed
          _version
          createdAt
          updatedAt
        }
        _version
        createdAt
        updatedAt
      }
      _version
      createdAt
      updatedAt
    }
  }
`;
