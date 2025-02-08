import {Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Link} from "expo-router";
import React, {useEffect, useState} from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store/Store";
import {IItem} from "../models/IItem";
import {deleteItem, getAllItems, saveItem, updateItem} from "../reducers/itemReducer";

function Item(){
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state) => state.item);

    const [name,setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [isEditing, setIsEditing] = useState(false);


    const handleAdd = () => {
        if (!name || !quantity || !price) {
            alert("All fields are required!");
            return;
        }
        const newItem = new IItem(name, quantity, price);
        dispatch(saveItem(newItem));
        resetForm();
    };

    const handleEdit = (item: IItem) => {
        setName(item.name);
        setQuantity(item.quantity);
        setPrice(item.price);
        setIsEditing(true);
    };

    const handleUpdate = () => {
        if (!name || !quantity || !price) {
            alert("All fields are required!");
            return;
        }
        const upadatedItem = new IItem(name, quantity, price);
        dispatch(updateItem({ name: name, item: upadatedItem }));
        dispatch(getAllItems());
        resetForm();
    };

    const handleDelete = (name: string) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            dispatch(deleteItem(name));
            dispatch(getAllItems());
        }
    };

    const resetForm = () => {
        setName("");
        setQuantity(0);
        setPrice(0);
        setIsEditing(false);
    };

    useEffect(() => {
        dispatch(getAllItems());
    }, [dispatch]);


    return(
        <View style={styles.container}>
            <Text style={styles.title}>Item Management</Text>

            <TextInput
                style={styles.input}
                placeholder="Item Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Item Quantity"
                value={quantity.toString()}
                onChangeText={(text) =>  setQuantity(Number(text) || 0)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Item Price"
                value={price.toString()}
                onChangeText={(text) =>  setPrice(Number(text) || 0)}
                keyboardType="numeric"
            />
            <Button title={isEditing !== null ? "Update Item" : "Save Item"} onPress={handleAdd}/>
            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.itemRow}>
                        <Text style={styles.customerText}>{item.name}</Text>
                        <Text style={styles.customerText}>{item.quantity}</Text>
                        <Text style={styles.customerText}>{item.price}</Text>
                        <TouchableOpacity onPress={() => handleEdit(item)}>
                            <MaterialCommunityIcons name="pencil" size={24} color="blue" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleEdit(item.name)}>
                            <MaterialCommunityIcons name="delete" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            />

            <Link href="/" style={styles.link}>Back to Dashboard</Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        marginVertical: 5,
        borderRadius: 5,
        elevation: 2,
    },
    customerText: {
        flex: 1,
        paddingHorizontal: 5,
    },
    link: {
        marginTop: 20,
        color: "blue",
        textAlign: "center",
    },
});

export default Item;