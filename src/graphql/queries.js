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
    }
    nextToken
  }
}
`;
