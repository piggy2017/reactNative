import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Link } from 'expo-router'; // 导入Link组件，用于页面导航

export default function Videos() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>这是视频页面</Text>
            <Link href="/models" asChild>
                <Text style={{ color: '#1f99b0', marginTop: 20 }}>点击打开模态框页</Text>
            </Link>
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
        color: '#e29477',
    },
});
