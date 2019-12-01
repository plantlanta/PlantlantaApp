/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = `subscription OnCreateEvent {
  onCreateEvent {
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
export const onUpdateEvent = `subscription OnUpdateEvent {
  onUpdateEvent {
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
export const onDeleteEvent = `subscription OnDeleteEvent {
  onDeleteEvent {
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
export const onCreateReward = `subscription OnCreateReward {
  onCreateReward {
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
export const onUpdateReward = `subscription OnUpdateReward {
  onUpdateReward {
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
export const onDeleteReward = `subscription OnDeleteReward {
  onDeleteReward {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
