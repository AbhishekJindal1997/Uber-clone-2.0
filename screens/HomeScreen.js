import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GGOGLE_MAPS_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            tintColor: "white",
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        <View style={tw`border-b border-white mb-5`}>
          <GooglePlacesAutocomplete
            styles={toInputBoxStyles}
            textInputProps={{
              placeholderTextColor: "gray",
              returnKeyType: "search",
            }}
            onFail={(error) => console.error(error)}
            fetchDetails={true}
            minLength={2}
            enablePoweredByContainer={false}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={300}
            placeholder='Where From ?'
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              dispatch(setDestination(null));
            }}
            query={{
              key: GGOGLE_MAPS_KEY,
              language: "en",
            }}
          />
        </View>

        <NavOptions />
      </View>
      <NavFavourites />
    </SafeAreaView>
  );
};

export default HomeScreen;

const toInputBoxStyles = StyleSheet.create({
  container: {
    flex: 0,
  },
  textInput: {
    backgroundColor: "black",
    color: "white",
    fontSize: 18,
  },
});
