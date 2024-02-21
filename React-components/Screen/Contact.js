import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import CustomButton3 from "../Button/CustomButton3";
import DashedLine from "../Others/DashedLine";
import InternetLinks from "../Others/InternetLinks";
import { AirbnbRating } from "react-native-ratings";
import * as MailComposer from "expo-mail-composer";

const Contact = () => {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("Rất kém");

  const sendEmail = async () => {
  
    try {
      const { status } = await MailComposer.composeAsync({
        recipients: ['dangchph33497@fpt.edu.vn'],
        subject: topic,
        body: content + "\nReview: " + review + " :" +rating +" sao",
      });
      if (status === 'sent') {
        console.log('Email sent!');
      } else {
        console.log('Email not sent.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  const handleRatingCompleted = (rating) => {
    setRating(rating);
    let reviewText = "";
    switch (rating) {
      case 1:
        reviewText = "Rất kém";
        break;
      case 2:
        reviewText = "Kém";
        break;
      case 3:
        reviewText = "Trung bình";
        break;
      case 4:
        reviewText = "Tốt";
        break;
      case 5:
        reviewText = "Xuất sắc";
        break;
      default:
        reviewText = "Rất kém";
    }
    setReview(reviewText);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đánh Giá</Text>
      <View style={styles.ratingBox}>
        <View style={styles.hr} />
        <AirbnbRating
          count={5}
          reviews={["Rất kém", "Kém", "Trung bình", "Tốt", "Xuất sắc"]}
          defaultRating={1}
          size={26}
          onFinishRating={handleRatingCompleted}
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
      <CustomButton3 title="Gửi Phản Hồi" onPress={sendEmail} />
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
