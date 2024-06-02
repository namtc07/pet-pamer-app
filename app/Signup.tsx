import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons"; // Import Ionicons từ thư viện @expo/vector-icons

function Signup() {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={24} color="#FF8D4D" />
      </TouchableOpacity>
    </View>
  );
}

export default Signup;
