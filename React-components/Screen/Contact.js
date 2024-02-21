import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import CustomButton3 from "../Button/CustomButton3";
import DashedLine from "../Others/DashedLine";
import InternetLinks from "../Others/InternetLinks";
import { AirbnbRating } from "react-native-ratings";
import * as MailComposer from 'expo-mail-composer';
import { Alert } from "react-native";

const Contact = () => {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");

  const sendFeedback = async() => {
    if (!topic || !content) {
      Alert.alert("Error", "Please provide a topic and content for the feedback.");
      return;
    }
    try {
      const isAvailable = await MailComposer.isAvailableAsync();
      console.log(isAvailable);
      if (isAvailable) {
        await MailComposer.composeAsync({
          recipients: ["Dangchph33497@fpt.edu.vn"], 
          subject: topic,
          body: content,
        });
      } else {
        Alert.alert("Mail Composer Not Available", "Email functionality is not available on this device.");
      }
    } catch (error) {
      Alert.alert("Unable To Send Feedback", undefined, [
        {
          text: "Copy feedback email",
          onPress: () => Clipboard.setString("unleaded@reiner.design")
        },
        {
          text: "OK"
        }
      ]);
    }
  };
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
        <TextInput style={styles.input} onChangeText={(txt) => setTopic(txt)} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Phản Hồi của Bạn:<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={styles.inputFeedback}
          numberOfLines={4}
          placeholder="Type your feedback here"
          onChangeText={(txt) => setContent(txt)}
        />
      </View>
      <CustomButton3 title="Gửi Phản Hồi" onPress={sendFeedback} />
      <DashedLine />
      <InternetLinks />
    </View>
  );
}


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
  inputContainer: {
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
