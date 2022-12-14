import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import "intl";
import "intl/locale-data/jsonp/en";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <View style={tw`bg-white flex-1 h-full `}>
      <View style={tw`border-b border-gray-200 border-solid `}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-1 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>

        <Text style={tw`text-center py-3 text-xl mb-1 `}>
          Select a Ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>
      <View>
        <FlatList
          data={data}
          keyExrtactor={(item) => item.id}
          renderItem={({ item: { id, title, multiplier, image }, item }) => (
            <TouchableOpacity
              style={tw`flex-row -mt-2 justify-between items-center px-5 ${
                id === selected?.id && "bg-gray-400"
              }`}
              onPress={() => setSelected(item)}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                }}
                source={{
                  uri: image,
                }}
              />
              <View style={tw`-ml-6`}>
                <Text style={tw`text-xl font-semibold `}>{title}</Text>
                <Text>{travelTimeInformation?.duration.text}</Text>
              </View>
              <Text style={tw`text-xl`}>
                {new Intl.NumberFormat("en-gb", {
                  style: "currency",
                  currency: "CAD",
                }).format(
                  (travelTimeInformation?.duration.value *
                    SURGE_CHARGE_RATE *
                    multiplier) /
                    100
                )}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={tw`border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black m-3 py-3 mx-8 rounded-md ${
            !selected && "bg-gray-300"
          }`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
