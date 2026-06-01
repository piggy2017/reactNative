import { StyleSheet, ActivityIndicator } from 'react-native';

export default function Loading() {
    return (
        <ActivityIndicator size="small" color="#1f99b0" style={styles.loading}></ActivityIndicator>
    );
}

const styles = StyleSheet.create({
    loading: {
        backgroundColor: '#fff',
        position: 'absolute',
        inset: 0,
        zIndex: 1,
    },
});
