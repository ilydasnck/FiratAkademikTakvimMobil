import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MultipleSelectList from '../components/multipleSelectList';
import Calendar from '../components/calendar';

const index = () => {
  return (
    <View style={styles.container}>
      <MultipleSelectList style={styles.child2} />
      <Calendar style={styles.child1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  child1: {},
  child2: {
    backgroundColor: 'green',
    marginBottom: 20,
  },
});

export default index;
