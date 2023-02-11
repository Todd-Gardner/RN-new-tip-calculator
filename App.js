import { StatusBar } from "expo-status-bar";
import { StrictMode, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,//--------this isn't working used ...Opacity as hack
  View,
} from "react-native";
import logo from "./assets/logo.png";

// FIX: Remove the StrictMode
// FIX: The keyboardAvoidingView is not working
// Change: Different logo - it's too big
// Feature: Add split bill tool
// Feature: Add scan tool to choose what you had from the bill and autofill amounts
// See comments below for more

export default function App() {
  const [people, setPeople] = useState();
  const [bill, setBill] = useState();
  const [hours, setHours] = useState();
  const [tip, setTip] = useState("0.00");
  const [total, setTotal] = useState((0).toFixed(2)); //or have toFixed in calc function

  const calculateTip = () => {
    // $2.00/person per hour for tip?
    const tip = hours * 2 * people;
    setTip(tip);
    const total = +bill + +tip; // + is used to convert string to number
    setTotal(total);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity onPress={Keyboard.dismiss}>
        <StrictMode>
          <Image style={styles.logo} source={logo} alt="logo" />
          <Text style={styles.title}>Welcome to the NEW Tip Calculator!</Text>
          <Text style={styles.instructions}>
            Please enter the total bill amount and how many hours you were at
            the table.
          </Text>
          <Text style={styles.instructions}>
            The tip amount will be displayed below.
          </Text>
          {/* TODO: Add: how was the service? - image button or dropdown with different rates
            Add: custom amount/rate field 
            Change: Tip/total to same line?*/}
          <TextInput
            style={styles.input}
            placeholder="Number of Guests"
            keyboardType="numeric"
            onChangeText={ (text) => setPeople(text) }
            onBlur={Keyboard.dismiss}//hack to dismiss keyboard
            // value={people} //.toString() needed?
          />
          <TextInput
            style={styles.input}
            placeholder="Total Bill Amount"
            keyboardType="numeric"
            onChangeText={(text) => setBill(text)}
            // value={bill}
          />
          <TextInput
            style={styles.input}
            placeholder="Hours at Table"
            keyboardType="numeric"
            onChangeText={(text) => setHours(text)}
            // value={hours}
          />
          <TouchableOpacity style={styles.button} onPress={calculateTip}>
            <Text style={styles.buttonText}>Calculate Tip</Text>
          </TouchableOpacity>
          <Text style={styles.tip}>Tip: ${tip}</Text>
          <Text style={styles.total}>Total: ${total}</Text>
          <StatusBar style="auto" />
        </StrictMode>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue", // will be restaurant colors
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 159,
    height: 159, //200
    marginBottom: 10,
  },
  title: {
    color: "#004d40",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  input: {
    borderColor: "#004d40",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 300,
  },
  button: {
    backgroundColor: "#004d40",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  tip: {
    color: "#004d40",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  total: {
    color: "#004d40",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
