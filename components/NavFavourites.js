import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

const NavFavourites = () => {
  const data = [
    {
      id: "123",
      icon: "home",
      location: "Home",
      destination: "Glen Forrest Boulevard, Waterloo, ON, Canada",
    },
    {
      id: "456",
      icon: "briefcase",
      location: "Work",
      destination: "YNCU, Executive Place, Kitchener, ON, Canada",
    },
    {
      id: "789",
      icon: "time",
      location: "Recent",
      destination: "King Street North, Waterloo, ON, Canada",
    },
  ];
  return (
    <View>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => {
          <View style={[tw`bg-gray-200`, { height: 0.5 }]} />;
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { location, destination, icon } }) => (
          <TouchableOpacity style={tw`flex-row items-center p-3`}>
            <Icon
              style={tw`mr-2 rounded-full bg-gray-700 p-3`}
              name={icon}
              type='ionicon'
              color='white'
              size={18}
            />
            <View>
              <Text style={tw`text-white font-semibold text-lg`}>
                {location}
              </Text>
              <Text style={tw`text-gray-300`}>{destination}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavFavourites;

const styles = StyleSheet.create({});
