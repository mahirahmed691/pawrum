import React from 'react';
import { ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import Colors from '../utils/colors';

export default function Spinner() {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={Colors.secondary} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
