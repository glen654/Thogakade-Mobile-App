import {Text, View, StyleSheet} from "react-native";
import {Link} from "expo-router";
import {Card, Paragraph, Title} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Index(){
    return(
        <View style={styles.container}>
            <Title style={styles.title}>Dashboard</Title>

            <View style={styles.cardContainer}>
                <Card style={styles.customerCard}>
                    <Card.Content style={styles.cardContent}>
                        <MaterialCommunityIcons name="account-group" size={40} color="white" />
                        <Title style={styles.cardTitle}>Customer</Title>
                        <Paragraph style={styles.cardText}>View customer details and manage customers.</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Link href="/customer" style={styles.cardLink}>Go to Customer</Link>
                    </Card.Actions>
                </Card>

                <Card style={styles.itemCard}>
                    <Card.Content style={styles.cardContent}>
                        <MaterialCommunityIcons name="cube-outline" size={40} color="white" />
                        <Title style={styles.cardTitle}>Item</Title>
                        <Paragraph style={styles.cardText}>Manage items and their details.</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Link href="/item" style={styles.cardLink}>Go to Item</Link>
                    </Card.Actions>
                </Card>

                <Card style={styles.orderCard}>
                    <Card.Content style={styles.cardContent}>
                        <MaterialCommunityIcons name="cart-outline" size={40} color="white" />
                        <Title style={styles.cardTitle}>Place Order</Title>
                        <Paragraph style={styles.cardText}>Place new orders and track them.</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Link href="/placeorder" style={styles.cardLink}>Place an Order</Link>
                    </Card.Actions>
                </Card>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "bold",
        fontSize: 24,
    },
    cardContainer: {
        width: "100%",
        alignItems: "center",
    },
    cardContent: {
        alignItems: "center",
    },
    cardTitle: {
        color: "white",
        marginTop: 8,
    },
    cardText: {
        color: "white",
        textAlign: "center",
    },
    customerCard: {
        alignItems: "center",
        marginBottom: 16,
        width: "80%",
        borderRadius: 10,
        backgroundColor: "#D84040",
        padding: 10,
    },
    itemCard: {
        alignItems: "center",
        marginBottom: 16,
        width: "80%",
        borderRadius: 10,
        backgroundColor: "#155E95",
        padding: 10,
    },
    orderCard: {
        alignItems: "center",
        marginBottom: 16,
        width: "80%",
        borderRadius: 10,
        backgroundColor: "#d37e10",
        padding: 10,
    },
    cardLink: {
        color: "#ffffff",
        fontWeight: "bold",
    },
})

export default Index;