import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Platform
} from 'react-native';
import {
  Container,
  Item,
  Input,
  DatePicker,
  Content,
  Label,
  Icon
} from 'native-base';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  input: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000'
  },
  inputError: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#F00'
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: '#fff'
  },
  itemStyle: {
    marginTop: 15,
    marginBottom: 5,
    alignItems: 'flex-start'
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#64dd17',
    padding: 15,
    marginTop: 30,
    borderRadius: 3
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  labelStyle: {
    color: '#161'
  },
  labelStyleError: {
    color: '#F00'
  }
});

const requiredFields = {
  name: true,
  address: true,
  organization: true,
  coordinatorPhone: true,
  coordinatorEmail: true,
  rewardPointValue: true
};

const CreateEventScreen = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [organization, setOrganization] = useState('');
  const [coordinator, setCoordinator] = useState('');
  const [coordinatorPhone, setCoordinatorPhone] = useState('');
  const [coordinatorEmail, setCoordinatorEmail] = useState('');
  const [minVolunteers, setMinVolunteers] = useState('');
  const [maxVolunteers, setMaxVolunteers] = useState('');
  const [rewardPointValue, setRewardPointValue] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState(requiredFields);
  const [touched, setTouched] = useState(() => {
    const temp = { ...requiredFields };
    Object.keys(temp).forEach(key => {
      temp[key] = false;
    });
    return temp;
  });
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();
  const seventhInput = useRef();
  const eigthInput = useRef();
  const ninthInput = useRef();
  const tenthInput = useRef();

  useEffect(() => {
    setErrors({
      name: name.length === 0,
      address: address.length === 0,
      organization: organization.length === 0,
      coordinatorPhone: coordinatorPhone.length === 0,
      coordinatorEmail: coordinatorEmail.length === 0,
      rewardPointValue: rewardPointValue.length === 0
    });
  }, [
    name,
    address,
    organization,
    coordinatorPhone,
    coordinatorEmail,
    rewardPointValue
  ]);

  const handleBlur = field => {
    setTouched({
      ...touched,
      [field]: true
    });
  };

  const shouldMarkError = field => {
    return errors[field] && touched[field];
  };

  const createEvent = () => {
    const input = {
      name,
      description,
      address,
      organization,
      coordinator,
      coordinatorPhone,
      coordinatorEmail,
      rewardPointValue,
      minVolunteers,
      maxVolunteers,
      startDate,
      endDate,
      volunteers: []
    };
    API.graphql(graphqlOperation(mutations.createEvent, { input })).then(
      event => {
        console.log(event);
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar /> */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.ios ? 'padding' : null}
        enabled
      >
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <Container style={styles.infoContainer}>
            <Content>
              <ScrollView style={styles.container}>
                <View style={styles.inner}>
                  <Item
                    style={styles.itemStyle}
                    error={shouldMarkError('name')}
                    floatingLabel
                  >
                    <Label
                      style={
                        shouldMarkError('name')
                          ? styles.labelStyleError
                          : styles.labelStyle
                      }
                    >
                      {shouldMarkError('name')
                        ? 'Event Name is required'
                        : 'Event Name'}
                    </Label>
                    {shouldMarkError('name') ? (
                      <Icon name="close-circle" />
                    ) : null}
                    <Input
                      style={styles.input}
                      keyboardType="default"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref={firstInput}
                      value={name}
                      onChangeText={text => setName(text)}
                      onBlur={() => {
                        handleBlur('name');
                      }}
                      onSubmitEditing={() => {
                        secondInput.current_root.focus();
                      }}
                    />
                  </Item>
                  <Item style={styles.itemStyle} floatingLabel>
                    <Label style={styles.labelStyle}>Event Description</Label>
                    <Input
                      style={styles.input}
                      keyboardType="default"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref={secondInput}
                      value={description}
                      onChangeText={text => setDescription(text)}
                      onSubmitEditing={() => {
                        thirdInput.current._root.focus();
                      }}
                    />
                  </Item>
                  <Item
                    style={styles.itemStyle}
                    floatingLabel
                    error={shouldMarkError('address')}
                  >
                    <Label
                      style={
                        shouldMarkError('address')
                          ? styles.labelStyleError
                          : styles.labelStyle
                      }
                    >
                      {shouldMarkError('address')
                        ? 'Event Address is required'
                        : 'Event Address'}
                    </Label>
                    {shouldMarkError('address') ? (
                      <Icon name="close-circle" />
                    ) : null}
                    <Input
                      style={styles.input}
                      keyboardType="default"
                      returnKeyType="done"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref={thirdInput}
                      value={address}
                      onChangeText={text => setAddress(text)}
                      onBlur={() => {
                        handleBlur('address');
                      }}
                      onSubmitEditing={() => {
                        fourthInput.current._root.focus();
                      }}
                    />
                  </Item>
                  <Item
                    style={styles.itemStyle}
                    floatingLabel
                    error={shouldMarkError('organization')}
                  >
                    <Label
                      style={
                        shouldMarkError('organization')
                          ? styles.labelStyleError
                          : styles.labelStyle
                      }
                    >
                      {shouldMarkError('organization')
                        ? 'Organization is required'
                        : 'Organization'}
                    </Label>
                    {shouldMarkError('organization') ? (
                      <Icon name="close-circle" />
                    ) : null}
                    <Input
                      style={styles.input}
                      keyboardType="default"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref={fourthInput}
                      value={organization}
                      onChangeText={text => setOrganization(text)}
                      onBlur={() => {
                        handleBlur('organization');
                      }}
                      onSubmitEditing={() => {
                        fifthInput.current._root.focus();
                      }}
                    />
                  </Item>
                  <Item style={styles.itemStyle} floatingLabel>
                    <Label style={styles.labelStyle}>Coordinator</Label>
                    <Input
                      style={styles.input}
                      keyboardType="default"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref={fifthInput}
                      value={coordinator}
                      onChangeText={text => setCoordinator(text)}
                      onSubmitEditing={() => {
                        sixthInput.current._root.focus();
                      }}
                    />
                  </Item>
                  <Item
                    style={styles.itemStyle}
                    floatingLabel
                    error={shouldMarkError('coordinatorPhone')}
                  >
                    <Label
                      style={
                        shouldMarkError('coordinatorPhone')
                          ? styles.labelStyleError
                          : styles.labelStyle
                      }
                    >
                      {shouldMarkError('coordinatorPhone')
                        ? 'Coordinator Phone Number Required'
                        : 'Coordinator Phone Number'}
                    </Label>
                    {shouldMarkError('coordinatorPhone') ? (
                      <Icon name="close-circle" />
                    ) : null}
                    <Input
                      style={styles.input}
                      keyboardType="phone-pad"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref={sixthInput}
                      value={coordinatorPhone}
                      onChangeText={text => setCoordinatorPhone(text)}
                      onBlur={() => {
                        handleBlur('coordinatorPhone');
                      }}
                      onSubmitEditing={() => {
                        seventhInput.current._root.focus();
                      }}
                    />
                  </Item>
                  <Item
                    style={styles.itemStyle}
                    floatingLabel
                    error={shouldMarkError('coordinatorEmail')}
                  >
                    <Label
                      style={
                        shouldMarkError('coordinatorEmail')
                          ? styles.labelStyleError
                          : styles.labelStyle
                      }
                    >
                      {shouldMarkError('coordinatorEmail')
                        ? 'Coordinator Email Required'
                        : 'Coordinator Email'}
                    </Label>
                    {shouldMarkError('coordinatorEmail') ? (
                      <Icon name="close-circle" />
                    ) : null}
                    <Input
                      style={styles.input}
                      keyboardType="email-address"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref={seventhInput}
                      value={coordinatorEmail}
                      onChangeText={text => setCoordinatorEmail(text)}
                      onBlur={() => {
                        handleBlur('coordinatorEmail');
                      }}
                      onSubmitEditing={() => {
                        eigthInput.current._root.focus();
                      }}
                    />
                  </Item>
                  <Item
                    style={styles.itemStyle}
                    floatingLabel
                    error={shouldMarkError('rewardPointValue')}
                  >
                    <Label
                      style={
                        shouldMarkError('rewardPointValue')
                          ? styles.labelStyleError
                          : styles.labelStyle
                      }
                    >
                      {shouldMarkError('rewardPointValue')
                        ? 'Reward Point Value required'
                        : 'Reward Point Value'}
                    </Label>
                    {shouldMarkError('rewardPointValue') ? (
                      <Icon name="close-circle" />
                    ) : null}
                    <Input
                      style={styles.input}
                      keyboardType="number-pad"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref={eigthInput}
                      value={rewardPointValue}
                      onChangeText={text => setRewardPointValue(text)}
                      onBlur={() => {
                        handleBlur('rewardPointValue');
                      }}
                      onSubmitEditing={() => {
                        ninthInput.current._root.focus();
                      }}
                    />
                  </Item>
                  <Item style={styles.itemStyle} floatingLabel>
                    <Label style={styles.labelStyle}>Minimum Volunteers</Label>
                    <Input
                      style={styles.input}
                      keyboardType="number-pad"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref={ninthInput}
                      value={minVolunteers}
                      onChangeText={text => setMinVolunteers(text)}
                      onSubmitEditing={() => {
                        tenthInput.current._root.focus();
                      }}
                    />
                  </Item>
                  <Item style={styles.itemStyle} floatingLabel>
                    <Label style={styles.labelStyle}>Maximum Volunteers</Label>
                    <Input
                      style={styles.input}
                      keyboardType="number-pad"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref={tenthInput}
                      value={maxVolunteers}
                      onChangeText={text => setMaxVolunteers(text)}
                    />
                  </Item>
                  <Item style={styles.itemStyle} stackedLabel>
                    <Label style={styles.labelStyle}>Start Date</Label>
                    <DatePicker
                      defaultDate={startDate}
                      minimumDate={startDate}
                      locale="en-US"
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType="fade"
                      androidMode="default"
                      textStyle={styles.input}
                      onDateChange={date => {
                        if (date > endDate) {
                          setStartDate(date);
                          setEndDate(date);
                        } else {
                          setStartDate(date);
                        }
                      }}
                    />
                  </Item>
                  <Item style={styles.itemStyle} stackedLabel>
                    <Label style={styles.labelStyle}>End Date</Label>
                    <DatePicker
                      defaultDate={endDate}
                      minimumDate={startDate}
                      locale="en-US"
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType="fade"
                      androidMode="default"
                      textStyle={styles.input}
                      value={endDate}
                      onDateChange={date => setEndDate(date)}
                    />
                  </Item>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => {
                      if (Object.keys(errors).some(k => errors[k])) {
                        Alert.alert(
                          'Error',
                          'Please fill out all required fields',
                          [
                            {
                              text: 'OK'
                            }
                          ],
                          { cancelable: false }
                        );
                        setTouched(requiredFields);
                      } else {
                        createEvent();
                        Alert.alert(
                          'Success!',
                          'Your event has been created!',
                          [
                            {
                              text: 'OK',
                              onPress: () => console.log('OK Pressed')
                            }
                          ],
                          { cancelable: false }
                        );
                      }
                    }}
                  >
                    <Text style={styles.buttonText}>Create Event</Text>
                  </TouchableOpacity>
                  <View style={{ flex: 1 }} />
                </View>
              </ScrollView>
            </Content>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateEventScreen;
