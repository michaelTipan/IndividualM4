import { View, Text, StyleSheet, FlatList, TouchableHighlight } from "react-native"
import { Button, ListItem, FAB } from "@rneui/base"
import { getAllLaptops } from "../rest_client/Laptops"
import { useState, useEffect } from "react"

export const LaptopsList = ({ navigation }) => {
  const [laptopsList, setLaptopsList] = useState([]);
  useEffect(()=>{
    getAllLaptops(fnRefreshList);
  },[]);

  const LaptopItem = ({ laptop }) => {
    return <TouchableHighlight onPress={()=>{
      navigation.navigate("LaptopsFormNav",{laptopParam:laptop});
    }}>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>{laptop.marca} {laptop.procesador} </ListItem.Title>
          <ListItem.Subtitle>{laptop.memoria} </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableHighlight>

  }

  fnRefreshList = (laptops) => {
    setLaptopsList(laptops);
  }
  return <View style={styles.container}>
    <Text>LISTA DE LAPTOPS</Text>
    <FlatList
      data={laptopsList}
      renderItem={({ item }) => {
        return <LaptopItem laptop={item} />
      }}
    />
    <FAB
      title="+"
      onPress={() => { navigation.navigate("LaptopsFormNav",{}) }}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column', // eje principal: vertical
    alignItems: 'stretch',  // eje secundario: horizontal
    justifyContent: 'flex-start', // JefPerez
  },
});
