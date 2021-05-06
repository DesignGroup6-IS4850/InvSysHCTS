/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createInventoryItem = /* GraphQL */ `
  mutation CreateInventoryItem(
    $input: CreateInventoryItemInput!
    $condition: ModelInventoryItemConditionInput
  ) {
    createInventoryItem(input: $input, condition: $condition) {
      id
      name
      quantity
      description
      brand
      category
      lowInventoryThreshold
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
export const updateInventoryItem = /* GraphQL */ `
  mutation UpdateInventoryItem(
    $input: UpdateInventoryItemInput!
    $condition: ModelInventoryItemConditionInput
  ) {
    updateInventoryItem(input: $input, condition: $condition) {
      id
      name
      quantity
      description
      brand
      category
      lowInventoryThreshold
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
export const deleteInventoryItem = /* GraphQL */ `
  mutation DeleteInventoryItem(
    $input: DeleteInventoryItemInput!
    $condition: ModelInventoryItemConditionInput
  ) {
    deleteInventoryItem(input: $input, condition: $condition) {
      id
      name
      quantity
      description
      brand
      category
      lowInventoryThreshold
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
export const createJob = /* GraphQL */ `
  mutation CreateJob(
    $input: CreateJobInput!
    $condition: ModelJobConditionInput
  ) {
    createJob(input: $input, condition: $condition) {
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
      notes
      _version
      createdAt
      updatedAt
    }
  }
`;
export const updateJob = /* GraphQL */ `
  mutation UpdateJob(
    $input: UpdateJobInput!
    $condition: ModelJobConditionInput
  ) {
    updateJob(input: $input, condition: $condition) {
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
      notes
      _version
      createdAt
      updatedAt
    }
  }
`;
export const deleteJob = /* GraphQL */ `
  mutation DeleteJob(
    $input: DeleteJobInput!
    $condition: ModelJobConditionInput
  ) {
    deleteJob(input: $input, condition: $condition) {
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
      notes
      _version
      createdAt
      updatedAt
    }
  }
`;
export const createJobInventory = /* GraphQL */ `
  mutation CreateJobInventory(
    $input: CreateJobInventoryInput!
    $condition: ModelJobInventoryConditionInput
  ) {
    createJobInventory(input: $input, condition: $condition) {
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
        notes
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
        lowInventoryThreshold
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
export const updateJobInventory = /* GraphQL */ `
  mutation UpdateJobInventory(
    $input: UpdateJobInventoryInput!
    $condition: ModelJobInventoryConditionInput
  ) {
    updateJobInventory(input: $input, condition: $condition) {
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
        notes
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
        lowInventoryThreshold
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
export const deleteJobInventory = /* GraphQL */ `
  mutation DeleteJobInventory(
    $input: DeleteJobInventoryInput!
    $condition: ModelJobInventoryConditionInput
  ) {
    deleteJobInventory(input: $input, condition: $condition) {
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
        notes
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
        lowInventoryThreshold
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
export const createLaborItem = /* GraphQL */ `
  mutation CreateLaborItem(
    $input: CreateLaborItemInput!
    $condition: ModelLaborItemConditionInput
  ) {
    createLaborItem(input: $input, condition: $condition) {
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
        notes
        _version
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateLaborItem = /* GraphQL */ `
  mutation UpdateLaborItem(
    $input: UpdateLaborItemInput!
    $condition: ModelLaborItemConditionInput
  ) {
    updateLaborItem(input: $input, condition: $condition) {
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
        notes
        _version
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteLaborItem = /* GraphQL */ `
  mutation DeleteLaborItem(
    $input: DeleteLaborItemInput!
    $condition: ModelLaborItemConditionInput
  ) {
    deleteLaborItem(input: $input, condition: $condition) {
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
        notes
        _version
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
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
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
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
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
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
export const createInvoice = /* GraphQL */ `
  mutation CreateInvoice(
    $input: CreateInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    createInvoice(input: $input, condition: $condition) {
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
        notes
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
export const updateInvoice = /* GraphQL */ `
  mutation UpdateInvoice(
    $input: UpdateInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    updateInvoice(input: $input, condition: $condition) {
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
        notes
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
export const deleteInvoice = /* GraphQL */ `
  mutation DeleteInvoice(
    $input: DeleteInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    deleteInvoice(input: $input, condition: $condition) {
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
        notes
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
export const createInvoiceItem = /* GraphQL */ `
  mutation CreateInvoiceItem(
    $input: CreateInvoiceItemInput!
    $condition: ModelInvoiceItemConditionInput
  ) {
    createInvoiceItem(input: $input, condition: $condition) {
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
          notes
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
export const updateInvoiceItem = /* GraphQL */ `
  mutation UpdateInvoiceItem(
    $input: UpdateInvoiceItemInput!
    $condition: ModelInvoiceItemConditionInput
  ) {
    updateInvoiceItem(input: $input, condition: $condition) {
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
          notes
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
export const deleteInvoiceItem = /* GraphQL */ `
  mutation DeleteInvoiceItem(
    $input: DeleteInvoiceItemInput!
    $condition: ModelInvoiceItemConditionInput
  ) {
    deleteInvoiceItem(input: $input, condition: $condition) {
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
          notes
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
