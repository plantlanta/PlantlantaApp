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
import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';

import { useNavigationParam } from 'react-navigation-hooks';


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


const EditRewardScreen = () => {
  const rewardId = useNavigationParam('id');
  const reward = useNavigationParam('reward');
  const [name, setName] = useState(reward.name);
  const [description, setDescription] = useState(reward.description);
  const [brand, setBrand] = useState(reward.brand);
  const [link, setLink] = useState(reward.link);
  const [couponString, setCouponString] = useState(reward.coupon.join(", "));
  const [rewardPointValue, setRewardPointValue] = useState(reward.rewardPointValue.toString());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState(requiredFields);
  const [creator, setCreator] = useState(reward.creator);
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


  useEffect(() => {
    setErrors({
      name: name.length === 0,
      description: description.length === 0,
      brand: brand.length === 0,
      rewardPointValue: rewardPointValue.length === 0
    });
  }, [
    name,
    description,
    brand,
    rewardPointValue
  ]);

  // const setFields = () => {
  //   API.graphql(
  //     graphqlOperation(queries.getReward, {
  //       id: rewardId
  //     })
  //   ).then(res => {
  //     setName(res.data.getReward.name);
  //     setDescription(res.data.getReward.description);
  //     setBrand(res.data.getReward.brand);
  //     setLink(res.data.getReward.link);
  //     setCouponString(res.data.getReward.coupon.join(", "));
  //     setRewardPointValue(res.data.getReward.rewardPointValue.toString());
  //     setStartDate(res.data.getReward.startDate);
  //     setEndDate(res.data.getReward.endDate);
  //     setCreator(res.data.getReward.creator);
  //   });
  // }

  const handleBlur = field => {
    setTouched({
      ...touched,
      [field]: true
    });
  };

  const shouldMarkError = field => {
    return errors[field] && touched[field];
  };


  const updateReward = () => {
    var coupon = couponString.split(", ");
    const input = {
        id: rewardId,
        name: name,
        description: description,
        brand: brand,
        link: link,
        coupon: coupon,
        rewardPointValue: rewardPointValue,
        startDate: startDate,
        endDate: endDate,
        creator: creator
    };
    console.log(input)
    API.graphql(graphqlOperation(mutations.updateReward, { input })).then(
      reward => {
        console.log(reward);
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
                        ? 'Reward Name is required'
                        : 'Reward Name'}
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
                        firstInput.current_root.focus();
                      }}
                    />
                  </Item>
                  <Item style={styles.itemStyle} floatingLabel>
                    <Label style={styles.labelStyle}>Reward Description</Label>
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
                        secondInput.current._root.focus();
                      }}
                    />
                  </Item>
                  <Item
                    style={styles.itemStyle}
                    floatingLabel
                    error={shouldMarkError('brand')}
                  >
                    <Label
                      style={
                        shouldMarkError('brand')
                          ? styles.labelStyleError
                          : styles.labelStyle
                      }
                    >
                      {shouldMarkError('brand')
                        ? 'Brand is required'
                        : 'Brand'}
                    </Label>
                    {shouldMarkError('brand') ? (
                      <Icon name="close-circle" />
                    ) : null}
                    <Input
                      style={styles.input}
                      keyboardType="default"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref={thirdInput}
                      value={brand}
                      onChangeText={text => setBrand(text)}
                      onBlur={() => {
                        handleBlur('brand');
                      }}
                      thirdInput={() => {
                        thirdInput.current._root.focus();
                      }}
                    />
                  </Item>
                  <Item
                    style={styles.itemStyle}
                    floatingLabel
                    error={shouldMarkError('link')}
                  >
                    <Label
                      style={
                        shouldMarkError('link')
                          ? styles.labelStyleError
                          : styles.labelStyle
                      }
                    >
                      {shouldMarkError('link')
                        ? 'Link is required'
                        : 'Link'}
                    </Label>
                    {shouldMarkError('link') ? (
                      <Icon name="close-circle" />
                    ) : null}
                    <Input
                      style={styles.input}
                      keyboardType="default"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref={fourthInput}
                      value={link}
                      onChangeText={text => setLink(text)}
                      onBlur={() => {
                        handleBlur('link');
                      }}
                      thirdInput={() => {
                        fourthInput.current._root.focus();
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
                      ref={fifthInput}
                      value={rewardPointValue}
                      onChangeText={text => setRewardPointValue(text)}
                      onBlur={() => {
                        handleBlur('rewardPointValue');
                      }}
                      onSubmitEditing={() => {
                        fifthInput.current._root.focus();
                      }}
                    />
                  </Item>
                  <Item style={styles.itemStyle} floatingLabel>
                    <Label style={styles.labelStyle}>Coupon</Label>
                    <Input
                      style={styles.input}
                      keyboardType="default"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      ref={sixthInput}
                      value={couponString}
                      onChangeText={text => setCouponString(text)}
                      onSubmitEditing={() => {
                        sixthInput.current._root.focus();
                      }}
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
                        updateReward();
                        Alert.alert(
                          'Success!',
                          'Your reward has been updated!',
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
                    <Text style={styles.buttonText}>Update Reward</Text>
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

export default EditRewardScreen;
