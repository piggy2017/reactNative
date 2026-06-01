import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    RefreshControl,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useRouter, Stack } from 'expo-router'; // 导入Link组件，用于页面导航

export default function List() {
    const router = useRouter();
    const [flatList, setFlatList] = useState([
        { id: '1', name: '张三' },
        { id: '2', name: '李四' },
        { id: '3', name: '王五' },
        { id: '4', name: '赵六' },
        { id: '5', name: '孙七' },
        { id: '6', name: '周八' },
        { id: '7', name: '吴九' },
        { id: '8', name: '郑十' },
        { id: '9', name: '冯十一' },
        { id: '10', name: '陈十二' },
        { id: '11', name: '褚十三' },
        { id: '12', name: '卫十四' },
        { id: '13', name: '蒋十五' },
        { id: '14', name: '沈十六' },
        { id: '15', name: '韩十七' },
        { id: '16', name: '杨十八' },
        { id: '17', name: '朱十九' },
        { id: '18', name: '秦二十' },
        { id: '19', name: '尤二十一' },
        { id: '20', name: '许二十二' },
        { id: '21', name: '何二十三' },
        { id: '22', name: '吕二十四' },
        { id: '23', name: '施二十五' },
        { id: '24', name: '张二十六' },
        { id: '25', name: '孔二十七' },
    ]);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };
    const onEndReachedFunc = () => {
        console.log('列表页触底了，加载更多数据');
        // 模拟加载更多数据
    };

    const customJump = (item) => {
        console.log('点击了', item.name);

        // router.navigate 跳转到指定页面(最常用),如果目标页面已经在Stack中，则会跳转到该页面，否则会新建一个页面并跳转过去
        // router.push 跳转到指定页面(每次都会新建一个页面并跳转过去)，如果目标页面已经在Stack中，则会强制新建一个页面并跳转过去
        // router.back 返回上一个页面
        // router.replace 跳转到指定页面(替换当前页面),从Stack中移除当前页面，并跳转到目标页面.

        // 下面的两种写法都可以实现跳转到详情页，并且传递参数id和name,推荐使用第二种写法，因为第一种写法需要手动拼接参数，容易出错，而第二种写法则是通过对象的形式传递参数，更加清晰和安全
        // router.navigate(`/details?name=${item.name}&id=${item.id}`);  // navigate和push的区别在于，navigate如果目标页面已经在Stack中，则会跳转到该页面，否则会新建一个页面并跳转过去，而push每次都会新建一个页面并跳转过去
        router.navigate({
            pathname: '/details',
            params: {
                name: item.name,
                id: item.id,
            },
        });
    };

    const goActive = (item) => {
        console.log('点击了', item.name);
        router.push({
            pathname: `/activeDetails/${item.id}`,
            params: {
                name: item.name,
                id: item.id,
            },
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ title: '列表页' }} />
            <Text>这是一个专门的列表页</Text>
            <Link href="../" style={styles.link} asChild>
                <TouchableOpacity>
                    <Text style={styles.linkText}>
                        点击返回到上一级页面,给Link标签加上asChild属性,就可以在Link内部使用其他组件了
                    </Text>
                </TouchableOpacity>
            </Link>
            <FlatList
                data={flatList}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) =>
                    (index <= 10 && (
                        <Link href={`/activeDetails/${item.id}?name=${item.name}`} asChild>
                            <Text
                                style={{
                                    padding: 20,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#ccc',
                                }}
                            >
                                {item.name}--点击跳转到详情页
                            </Text>
                        </Link>
                    )) ||
                    (index > 10 && index <= 20 && (
                        <Text
                            style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#666' }}
                            onPress={() => customJump(item)}
                        >
                            {item.name}
                        </Text>
                    )) || (
                        <Text
                            style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#999' }}
                            onPress={() => goActive(item)}
                        >
                            --{item.name}---
                        </Text>
                    )
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={'#1f99b0'}
                    />
                }
                ListEmptyComponent={<Text>暂无数据</Text>}
                ListHeaderComponent={<Text style={styles.flatHeader}>这是列表头</Text>}
                ListFooterComponent={<Text style={styles.flatFooter}>没有更多数据了...</Text>}
                onEndReachedThreshold={0.1}
                onEndReached={onEndReachedFunc}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatHeader: {
        fontSize: 18,
        color: 'green',
        backgroundColor: '#ddd',
        width: '100%',
        textAlign: 'center',
        padding: 10,
    },
    flatFooter: {
        fontSize: 14,
        color: 'gray',
        backgroundColor: '#ddd',
        width: '100%',
        textAlign: 'center',
        padding: 10,
    },
    link: {
        margin: 20,
        fontSize: 16,
        color: 'green',
    },
    linkText: {
        fontSize: 20,
        color: 'green',
    },
});
