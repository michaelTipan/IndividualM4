import { View, Text, StyleSheet, Alert } from "react-native"
import { Input, Button } from "@rneui/base"
import { useState } from "react"
import { saveLaptopRest, updateLaptopRest, deleteLaptopRest } from "../rest_client/Laptops"

export const LaptopsForm = ({ navigation, route }) => {
    let laptopRetrieved = route.params.laptopParam;
    let isNew = true;
    if (laptopRetrieved != null) {
        isNew = false;
    }
    console.log("isNew: ", isNew);
    console.log("laptopRetrieved: ", laptopRetrieved);

    const [marca, setMarca] = useState(isNew ? null : laptopRetrieved.marca);
    const [procesador, setProcesador] = useState(isNew ? null : laptopRetrieved.procesador);
    const [memoria, setMemoria] = useState(isNew ? null : laptopRetrieved.memoria);
    const [disco, setDisco] = useState(isNew ? null : laptopRetrieved.disco);

    console.log(route.params.laptopParam);

    const showMessage = (mesagge) => {
        Alert.alert("CONFIRMACIÓN", mesagge);
        navigation.goBack();
    }

    const createLaptop = () => {
        console.log("saveLaptop");
        saveLaptopRest(
            {
                marca: marca,
                procesador: procesador,
                memoria: memoria,
                disco: disco
            },
            showMessage
        );
    }

    const updateLaptop = () => {
        console.log("Actualizando Laptop");
        updateLaptopRest(
            {
                id: laptopRetrieved.id,
                marca: marca,
                procesador: procesador,
                memoria: memoria,
                disco: disco
            },
            showMessage
        );
    }

    const confirmDelete = () => {
        Alert.alert(
            "CONFIRMACIÓN",
            "¿Está seguro que quiere eliminar?",
            [
                { text: "CANCELAR" },
                {
                    text: "SI",
                    onPress:deleteLaptop
                }
            ]);
    }

    const deleteLaptop=()=>{
        deleteLaptopRest({
            id:laptopRetrieved.id
        },showMessage);
    }

    <Input />
    return <View style={styles.container}>
        <Input
            value={marca}
            placeholder="MARCA"
            onChangeText={(value) => {
                setMarca(value);
            }}
        />
        <Input
            value={procesador}
            placeholder="PROCESADOR"
            onChangeText={(value) => {
                setProcesador(value);
            }}
        />
        <Input
            value={memoria}
            placeholder="MEMORIA"
            onChangeText={(value) => {
                setMemoria(value);
            }}
        />
        <Input
            value={disco}
            placeholder="DISCO"
            onChangeText={(value) => {
                setDisco(value);
            }}
        />
        <Button
            title="GUARDAR"
            onPress={isNew ? createLaptop : updateLaptop}
        />
        {
            isNew ? <View></View> : <Button
                title="ELIMINAR"
                onPress={confirmDelete}
            />
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
