import React, {useEffect, useState} from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/Store";
import {deleteCustomer, getAllCustomers, saveCustomer, updateCustomer} from "../reducers/customerReducer";
import ICustomer from "../models/ICustomer";

function Customer(){
    const dispatch = useDispatch<AppDispatch>();
    const customers = useSelector((state:RootState) => state.customer);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleAdd = () => {
        if (!name || !address || !phone || !email) {
            alert("All fields are required!");
            return;
        }
        const newCustomer = new ICustomer(name, address, phone, email);
        dispatch(saveCustomer(newCustomer));
        resetForm();
    };

    const handleEdit = (customer: ICustomer) => {
        setName(customer.name);
        setAddress(customer.address);
        setEmail(customer.email);
        setPhone(customer.phone);
        setIsEditing(true);
    };

    const handleUpdate = () => {
        if (!name || !address || !phone || !email) {
            alert("All fields are required!");
            return;
        }
        const updatedCustomer = new ICustomer(name, address, phone, email);
        dispatch(updateCustomer({ email: email, customer: updatedCustomer }));
        dispatch(getAllCustomers());
        resetForm();
    };

    const handleDelete = (email: string) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            dispatch(deleteCustomer(email));
            dispatch(getAllCustomers());
        }
    };

    const resetForm = () => {
        setName("");
        setAddress("");
        setEmail("");
        setPhone("");
        setIsEditing(false);
    };

    useEffect(() => {
        dispatch(getAllCustomers());
    }, [dispatch]);

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Customer Management</Text>

            <TextInput
                style={styles.input}
                placeholder="Customer Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Customer Address"
                value={address}
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            <Button title={isEditing !== null ? "Update Customer" : "Save Customer"} onPress={handleAdd}/>
            <FlatList
                data={customers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.customerRow}>
                        <Text style={styles.customerText}>{item.name}</Text>
                        <Text style={styles.customerText}>{item.address}</Text>
                        <Text style={styles.customerText}>{item.email}</Text>
                        <Text style={styles.customerText}>{item.phone}</Text>
                        <TouchableOpacity onPress={() => handleEdit(item)}>
                            <MaterialCommunityIcons name="pencil" size={24} color="blue"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item.email)}>
                            <MaterialCommunityIcons name="delete" size={24} color="red"/>
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
    customerRow: {
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

export default Customer;