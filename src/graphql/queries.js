/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = `query GetEvent($id: ID!) {
  getEvent(id: $id) {
    id
    name
    description
    address
    organization
    coordinator
    coordinatorPhone
    coordinatorEmail
    rewardPointValue
    minVolunteers
    maxVolunteers
    volunteers
    startDate
    endDate
    creator
    adminApproved
  }
}
`;
export const listEvents = `query ListEvents(
  $filter: ModelEventFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      address
      organization
      coordinator
      coordinatorPhone
      coordinatorEmail
      rewardPointValue
      minVolunteers
      maxVolunteers
      volunteers
      startDate
      endDate
      creator
      adminApproved
    }
    nextToken
  }
}
`;
export const getReward = `query GetReward($id: ID!) {
  getReward(id: $id) {
    id
    name
    description
    brand
    link
    coupon
    rewardPointValue
    startDate
    endDate
    creator
  }
}
`;
export const listRewards = `query ListRewards(
  $filter: ModelRewardFilterInput
  $limit: Int
  $nextToken: String
) {
  listRewards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      brand
      link
      coupon
      rewardPointValue
      startDate
      endDate
      creator
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    email
    rewardPoints
    accountType
    eventHistory {
      id
      timeIn
      timeOut
    }
    rewardHistory {
      id
      name
      link
      coupon
    }
    adminApproved
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      email
      rewardPoints
      accountType
      eventHistory {
        id
        timeIn
        timeOut
      }
      rewardHistory {
        id
        name
        link
        coupon
      }
      adminApproved
    }
    nextToken
  }
}
`;
