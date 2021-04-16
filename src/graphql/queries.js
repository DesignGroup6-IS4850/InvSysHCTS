/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getInventoryItem = /* GraphQL */ `
  query GetInventoryItem($id: ID!) {
    getInventoryItem(id: $id) {
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
export const listInventoryItems = /* GraphQL */ `
  query ListInventoryItems(
    $filter: ModelInventoryItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInventoryItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getJob = /* GraphQL */ `
  query GetJob($id: ID!) {
    getJob(id: $id) {
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
export const listJobs = /* GraphQL */ `
  query ListJobs(
    $filter: ModelJobFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getJobInventory = /* GraphQL */ `
  query GetJobInventory($id: ID!) {
    getJobInventory(id: $id) {
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
export const listJobInventorys = /* GraphQL */ `
  query ListJobInventorys(
    $filter: ModelJobInventoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobInventorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        jobQuantity
        jobPrice
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
        inventoryItem {
          id
          name
          quantity
          description
          brand
          category
          _version
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLaborItem = /* GraphQL */ `
  query GetLaborItem($id: ID!) {
    getLaborItem(id: $id) {
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
export const listLaborItems = /* GraphQL */ `
  query ListLaborItems(
    $filter: ModelLaborItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLaborItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          _version
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
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
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        phone
        address
        _version
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getInvoice = /* GraphQL */ `
  query GetInvoice($id: ID!) {
    getInvoice(id: $id) {
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
export const listInvoices = /* GraphQL */ `
  query ListInvoices(
    $filter: ModelInvoiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvoices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getInvoiceItem = /* GraphQL */ `
  query GetInvoiceItem($id: ID!) {
    getInvoiceItem(id: $id) {
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
export const listInvoiceItems = /* GraphQL */ `
  query ListInvoiceItems(
    $filter: ModelInvoiceItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvoiceItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        quantity
        rate
        invoice {
          id
          number
          transDate
          dueDate
          _version
          createdAt
          updatedAt
        }
        _version
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
