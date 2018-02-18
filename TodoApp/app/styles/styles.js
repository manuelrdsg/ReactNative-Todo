'use strict';
var React = require('react-native');
var { StyleSheet } = React;

const styles = StyleSheet.create({
  container: {
    //padding: 10,
    flex: 1,
    backgroundColor: '#fefffe'
  },
  text_imput: {
    height: 40,
    width: '80%',
    //fontSize:25
  },
  list_row: {
    flexDirection: "row",
    alignItems: "center"
  },
  item: {
    padding: 10,
    paddingTop:10,
    marginLeft: 10,
    fontSize: 25,
    height: 44,
    color: 'grey'
  },
  head: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 45
  },
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  button_del: {
    justifyContent: 'flex-end'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding:10
  }
});

module.exports = styles;