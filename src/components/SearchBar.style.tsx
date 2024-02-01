import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      justifyContent: 'center'
    },
    inputStyle: {
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: '#ffffff',
      borderRadius: 20,
      color: 'black',
      fontSize: 16,
      borderWidth: 1
    },
    predictionsContainer: {
      backgroundColor: '#ffffff',
      padding: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderWidth: 1
    },
    predictionRow: {
      paddingBottom: 15,
      marginBottom: 15,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    }
  })