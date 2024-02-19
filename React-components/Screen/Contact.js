import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import CustomButton3 from "../Button/CustomButton3";
import DashedLine from "../Others/DashedLine";
import InternetLinks from "../Others/InternetLinks";
import { Rating, AirbnbRating } from "react-native-ratings";
import Mailer from 'react-native-mail';

const Contact = () => {
  const sendFeedback= () => {
    handleEmail = () => {
      const to = ['dangchph33497@fpt.edu.vn'] // string or array of email addresses
      email(to, {
          cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
          bcc: 'mee@mee.com', // string or array of email addresses
          subject: 'Show how to use',
          body: 'Some body right here'
      }).catch(console.error)
  }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đánh Giá</Text>
      <View style={styles.ratingBox}>
        <View style={styles.hr} />
        <AirbnbRating
          count={5}
          reviews={["Terrible", "Bad", "Meh", "OK", "Good"]}
          defaultRating={1}
          size={26}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Chủ Đề:<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Phản Hồi của Bạn:<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={styles.inputFeedback}
          numberOfLines={4}
          placeholder="Type your feedback here"
        />
      </View>
      <CustomButton3 title="Gửi Phản Hồi" onPress={sendFeedback}/>
      <DashedLine />
      <InternetLinks />
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 2,
    marginStart: 20,
    color: "#36454F",
    textAlign: "left",
  },
  inputContainer:{
     width: "90%",
  },
  input: {
    marginBottom: 13,
    marginEnd: 20,
    marginStart: 20,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    paddingStart: 15,
    shadowRadius: 20,
    opacity: 0.9,
  },
  inputFeedback: {
    height: 160,
    padding: 10,
    marginBottom: 20,
    marginEnd: 20,
    marginStart: 20,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    paddingStart: 15,
    shadowRadius: 20,
    opacity: 0.9,
    textAlignVertical: "top",
  },
  ratingBox: {
    width: "90%",
    borderWidth: 0.2,
    marginBottom: 2,
  },
});
