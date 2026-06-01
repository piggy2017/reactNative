import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    SafeAreaView,
    RefreshControl,
    FlatList,
    Alert,
    Dimensions,
    Image,
} from 'react-native';
// SafeAreaView 是一个组件，可以确保内容不会被手机的状态栏、刘海等遮挡，提供一个安全的显示区域。
// RefreshControl 是一个组件，通常与 ScrollView 或 FlatList 结合使用，提供下拉刷新功能。
// FlatList 是一个高性能的组件，用于渲染长列表数据，支持懒加载、分段加载等功能。
import { useState, useEffect } from 'react';
import { Link, Stack } from 'expo-router'; // 导入Link组件，用于页面导航
// 自定义Loading组件
import Loading from '../../components/shared/Loading';
import NetworkError from '../../components/shared/NetworkError';
import request, { get } from '../../util/request';

const { width, height } = Dimensions.get('window'); // 通过Dimensions.get('window'),获取屏幕宽高

function LeftIcon() {
    return <Image style={styles.leftIcon} source={require('../../assets/favicon.png')} />;
}

export default function App() {
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [netError, setNetError] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (type) => {
        try {
            // 能请求到数据的接口
            // const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await get(type ? '/users' : '/fehwjh5');
            console.log(data);
            if (data && Array.isArray(data)) {
                setList(data);
            }
        } catch (err) {
            console.log('err:', err);
            setNetError(true);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
                setRefreshing(false);
            }, 1000);
        }
    };

    const reloadData = () => {
        console.log('重新加载数据');
        setIsLoading(true);
        setNetError(false);
        fetchData(true);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchData(true);
    };

    const onEndReachedFunc = () => {
        console.log('触底了，加载更多数据');
        // 模拟加载更多数据
    };

    const onPressOne = () => {
        Alert.alert('提示', '你点击了按钮1', [
            { text: '取消', onPress: () => console.log('取消') },
            { text: '确定', onPress: () => console.log('确定') },
        ]);
    };

    const renderItem = ({ item }) => <Text style={styles.item}>{item.name}</Text>;

    if (isLoading) {
        return <Loading />;
    }

    if (netError) {
        return <NetworkError title="网络走丢啦!" reloadData={reloadData} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* 给首页添加自定义标题和右边按钮 */}
            <Stack.Screen
                options={{
                    headerTitle: '这是首页',
                    headerStyle: { backgroundColor: '#f4511e' }, // 导航栏整体样式
                    headerTintColor: '#fff', // 导航栏标题、按钮、图标的颜色
                    headerTitleStyle: { fontWeight: 'bold' }, // 导航栏标题的样式
                    headerLeft: () => <LeftIcon />, // 导航栏左边的组件，可以是一个图标或者文本
                    headerRight: () => (
                        <Button
                            title="右边按钮"
                            onPress={() => Alert.alert('你点击了右边的按钮')}
                        />
                    ),
                }}
            />
            {/* <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={'#1f99b0'}/>
      }>
        <Text>hello world 111222!</Text>
        <StatusBar style="auto" />
        <Text style={styles.title}>Text</Text>
        <Text style={[styles.title, styles.title2]}>测试使用多个样式对象,在同一个dom上生效.</Text>
        <Text style={{fontSize: 16, color: 'blue'}}>测试使用内联样式</Text>
        <Text>count: {count}</Text>
        <Button title='点击我，count加1' onPress={() => setCount(count + 1)}></Button>
        <View>
          {
            list.length>0 && list.map((item,index) => <Text style={styles.title} key={item.id}>{item.name}</Text>)
          }
        </View>
        <Text style={styles.titleContent}>
          陈克明食品因将‘手擀’注册为商标并用于机器生产的挂面产品，引发消费者质疑其涉嫌虚假宣传。央视报道指出，该行为利用描述性词汇注册商标，误导公众认为产品为手工制作。国家知识产权局已依职权宣告该商标无效，公司随后发布声明，决定全面停止使用‘手擀’相关表述的产品生产与销售。尽管公司辩称注册为保护品牌，但公众普遍认为此举存在道德与法律风险，损害消费者信任。
        </Text>

        <Button title='点击我，获取数据' onPress={fetchData}></Button>
      </ScrollView> */}
            <StatusBar style="auto" />
            <Text>新的首页(入口页)</Text>
            <Text style={styles.title}>
                屏幕宽度:{width} x 屏幕高度:{height}
            </Text>
            <Button title="点击我，alert1" onPress={onPressOne}></Button>
            <Link href="/list" style={styles.link}>
                跳转到专门的列表页
            </Link>

            <FlatList
                data={flatList}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
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
            ></FlatList>
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
    },
    title2: {
        marginTop: 20,
        padding: 20,
    },
    titleContent: {
        fontSize: 32,
        color: 'black',
    },
    item: {
        fontSize: 16,
        color: 'blue',
        backgroundColor: '#eee',
        marginBottom: 10,
        width: '100%',
        textAlign: 'center',
        height: 50,
        lineHeight: 50,
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
        color: 'blue',
    },
    leftIcon: {
        width: 24,
        height: 24,
        marginLeft: 10,
    },
});
