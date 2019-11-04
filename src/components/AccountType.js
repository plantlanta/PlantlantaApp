import { useState } from 'react';
import { Auth } from 'aws-amplify';

const AccountType = () => {
  const [accountType, setAccountType] = useState();

  const getAccountType = () => {
    if (accountType == null) {
      Auth.currentAuthenticatedUser().then(user => {
        setAccountType(user.attributes['custom:accountType']);
      });
    }
    return accountType;
  };

  return getAccountType();
};

export default AccountType;
