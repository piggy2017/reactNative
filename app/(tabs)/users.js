import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Button, Share, Platform } from 'react-native';

export default function Users() {

    const onShareFunc = async () => {
        console.log('点击了分享按钮');
        const url = 'https://www.baidu.com';
        const message = Platform.OS === 'android' ? `这是分享的内容: \n ${url}` : '这是分享的内容:'; // 安卓需要在message中添加url
        await Share.share({
            message,   // ios和安卓都需要设置message，安卓需要在message中添加url
            url,       // iOS可以单独设置url
        });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>这是用户页面</Text>
            <TouchableOpacity>
                <Button title="点击进行分享" onPress={onShareFunc} />
            </TouchableOpacity>
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
