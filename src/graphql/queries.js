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
        inventory {
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
        job {
          id
          name
          startDate
          endDate
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
