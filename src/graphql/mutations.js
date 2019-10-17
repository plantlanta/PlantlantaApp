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
    rewardPointValue
    minVolunteers
    maxVolunteers
    volunteers
    startDate
    endDate
    creator
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
    rewardPointValue
    minVolunteers
    maxVolunteers
    volunteers
    startDate
    endDate
    creator
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
    rewardPointValue
    minVolunteers
    maxVolunteers
    volunteers
    startDate
    endDate
    creator
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
    eventHistory
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
    eventHistory
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
    eventHistory
  }
}
`;
