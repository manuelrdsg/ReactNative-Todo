'use strict';
var React = require('react-native');
var { StyleSheet } = React;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    paddingTop: 22
  },
  buttonContainer: {
    margin: 20
  },
  text_imput: {
    height: 40,
    width: '100%',
    borderColor: "blue",
    borderWidth: 1,
    fontSize:25
  },
  pizza: {
    padding:10,
    fontSize: 42
  },
  list_row: {
    flexDirection: "row",
    alignItems: "center"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  head: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 45
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
});

module.exports = styles;