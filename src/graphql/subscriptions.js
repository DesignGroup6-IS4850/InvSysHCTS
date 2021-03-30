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
      inventory {
        items {
          id
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
      inventory {
        items {
          id
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
      inventory {
        items {
          id
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
export const onUpdateJobInventory = /* GraphQL */ `
  subscription OnUpdateJobInventory {
    onUpdateJobInventory {
      id
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
export const onDeleteJobInventory = /* GraphQL */ `
  subscription OnDeleteJobInventory {
    onDeleteJobInventory {
      id
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
