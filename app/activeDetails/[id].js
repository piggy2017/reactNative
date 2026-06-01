import { StyleSheet, View, Text, Button, ScrollView, FlatList, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useLocalSearchParams, Stack } from 'expo-router'; // 导入Link组件，用于页面导航

const { width, height } = Dimensions.get('window'); // 通过Dimensions.get('window'),获取屏幕宽高

export default function List() {
    const { id, name } = useLocalSearchParams(); // 使用useLocalSearchParams hook获取路由参数

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Stack.Screen options={{ title: name }} />
            <Text>这是一个动态路由详情页</Text>
            <Text>ID: {id}</Text>
            <Text>Name: {name}</Text>
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
});
