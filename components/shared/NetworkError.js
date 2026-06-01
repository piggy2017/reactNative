import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

export default function NetworkError(props) {
    const { reloadData } = props;
    return (
        <View style={styles.container}>
            <SimpleLineIcons name={'drawer'} size={160} color={'#ddd'}></SimpleLineIcons>
            <Text style={styles.title}>{props.title || '网络错误，请稍后重试'}</Text>
            <TouchableOpacity onPress={reloadData}>
                <Text style={styles.reloadButton}>重新加载</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
    },
    reloadButton: {
        marginTop: 20,
        fontSize: 16,
        color: 'blue',
        backgroundColor: '#eee',
    },
});
