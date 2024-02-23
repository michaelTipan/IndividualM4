import { View, Text, StyleSheet, FlatList } from "react-native"
import {Button, ListItem, FAB} from "@rneui/base"
import {getAllContacts} from "../rest_client/contactos"
import { useState } from "react"

export const ContactsList=({navigation})=>{
    const [contactsList, setContactsList] = useState([]);

    const ContactItem=({contact})=>{
      return <ListItem>
        <ListItem.Content>
          <ListItem.Title>{contact.nombre} {contact.apellido} </ListItem.Title>
          <ListItem.Subtitle>{contact.celular} </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
    }

    fnRefreshList=(contacts)=>{
      setContactsList(contacts);
    }
    return <View style={styles.container}>
        <Text>LISTA DE CONTACTOSSS</Text>
        <Button
          title="Consultar"
          onPress={()=>{
            getAllContacts(fnRefreshList);
          }}
        />
        <FlatList
          data={contactsList}
          renderItem={({item})=>{
            return <ContactItem contact={item} />
          }}
        />
        <FAB 
          title="+"
          onPress={()=>{navigation.navigate("ContactsFormNav")}}
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
  