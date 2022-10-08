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

        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
              // marginLeft: 8,
              // marginRight: 8,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onFail={(error) => console.error(error)}
          fetchDetails={true}
          minLength={2}
          enablePoweredByContainer={false}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={300} // fetches result after 400ms once we stop typing
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

        {/* <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          query={{
            key: "AIzaSyDQKjuay0HDB6hrE2YMIhfaLyh3UUCN7XA",
            language: "en",
          }}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
        /> */}

        <NavOptions />
      </View>
      <NavFavourites />
    </SafeAreaView>
  );
};

export default HomeScreen;

// Default cSS
// const styles = StyleSheet.create({
//   text: {
//     color: "blue",
//   },
// });
