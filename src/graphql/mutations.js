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
      jobs {
        items {
          id
          jobQuantity
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
      jobs {
        items {
          id
          jobQuantity
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
      jobs {
        items {
          id
          jobQuantity
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
      inventory {
        items {
          id
          jobQuantity
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
      inventory {
        items {
          id
          jobQuantity
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
      inventory {
        items {
          id
          jobQuantity
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
export const createJobInventory = /* GraphQL */ `
  mutation CreateJobInventory(
    $input: CreateJobInventoryInput!
    $condition: ModelJobInventoryConditionInput
  ) {
    createJobInventory(input: $input, condition: $condition) {
      id
      jobQuantity
      job {
        id
        name
        startDate
        endDate
        inventory {
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
export const updateJobInventory = /* GraphQL */ `
  mutation UpdateJobInventory(
    $input: UpdateJobInventoryInput!
    $condition: ModelJobInventoryConditionInput
  ) {
    updateJobInventory(input: $input, condition: $condition) {
      id
      jobQuantity
      job {
        id
        name
        startDate
        endDate
        inventory {
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
export const deleteJobInventory = /* GraphQL */ `
  mutation DeleteJobInventory(
    $input: DeleteJobInventoryInput!
    $condition: ModelJobInventoryConditionInput
  ) {
    deleteJobInventory(input: $input, condition: $condition) {
      id
      jobQuantity
      job {
        id
        name
        startDate
        endDate
        inventory {
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
