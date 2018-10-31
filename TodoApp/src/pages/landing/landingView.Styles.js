
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        //padding: 10,
        flex: 1,
        backgroundColor: '#fefffe'
    },
    text_imput: {
        height: 40,
        width: '80%',
        fontSize: 16,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding:10
    },
    debug_bar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '2%',
        marginRight: '2%'
    },
    debug_text: {
        fontWeight: "bold", 
        fontSize: 17, 
        color: "orange" 
    },
    separator: {
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "5%",
        marginRight: "5%"
    }
});