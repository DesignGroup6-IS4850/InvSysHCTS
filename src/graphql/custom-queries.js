/* eslint-disable */
// this is an auto generated file. This will be overwritten
export const getJobWithInventory = /* GraphQL */ `
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
          inventoryItem {
            id
            name
            brand
            description
            category
          }
        }
        nextToken
      }
      _version
      createdAt
      updatedAt
    }
  }
`;