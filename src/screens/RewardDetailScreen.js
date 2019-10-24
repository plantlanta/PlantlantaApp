import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Auth } from 'aws-amplify';
import VolunteerRewardDetail from '../components/volunteer/VolunteerEventDetail';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const RewardDetailScreen = () => {
  const [accountType, setAccountType] = useState();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(user => {
      setAccountType(user.attributes['custom:accountType']);
    });
  }, []);

  if (accountType === 'volunteer') {
    return <VolunteerRewardDetail />;
  }
  if (accountType === 'admin') {
    return <VolunteerRewardDetail />;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default RewardDetailScreen;
