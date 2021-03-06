/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = `mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    id
    name
    description
    address
    organization
    coordinator
    coordinatorPhone
    coordinatorEmail
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
export const updateEvent = `mutation UpdateEvent($input: UpdateEventInput!) {
  updateEvent(input: $input) {
    id
    name
    description
    address
    organization
    coordinator
    coordinatorPhone
    coordinatorEmail
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
export const deleteEvent = `mutation DeleteEvent($input: DeleteEventInput!) {
  deleteEvent(input: $input) {
    id
    name
    description
    address
    organization
    coordinator
    coordinatorPhone
    coordinatorEmail
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
export const createReward = `mutation CreateReward($input: CreateRewardInput!) {
  createReward(input: $input) {
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
export const updateReward = `mutation UpdateReward($input: UpdateRewardInput!) {
  updateReward(input: $input) {
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
export const deleteReward = `mutation DeleteReward($input: DeleteRewardInput!) {
  deleteReward(input: $input) {
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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
    rewardPoints
    accountType
    eventHistory {
      id
      name
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    name
    email
    rewardPoints
    accountType
    eventHistory {
      id
      name
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    name
    email
    rewardPoints
    accountType
    eventHistory {
      id
      name
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
