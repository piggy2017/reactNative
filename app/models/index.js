import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

export default function Users() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>这是模态框页面</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1f99b0',
    },
});
