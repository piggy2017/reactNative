import { StyleSheet, View, Text, Button, ScrollView, FlatList, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router'; // 导入Link组件，用于页面导航

const { width, height } = Dimensions.get('window'); // 通过Dimensions.get('window'),获取屏幕宽高

export default function Details() {
    const { id, name } = useLocalSearchParams(); // 使用useLocalSearchParams hook获取路由参数
    const navigation = useNavigation(); // 使用useNavigation hook获取导航对象

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>这是一个专门的详情页</Text>
            <Text>details-ID: {id}</Text>
            <Text>details-Name: {name}</Text>

            <Button
                style={styles.button}
                title="手动改变页面的title"
                onPress={() => navigation.setOptions({ title: '自定义标题' })}
            />

            <Link href="../" style={styles.link} asChild>
                <Text>返回列表页</Text>
            </Link>
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
    link: {
        margin: 20,
        fontSize: 16,
        color: 'green',
    },
    button: {
        margin: 20,
        padding: 10,
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: 5,
    },
});
