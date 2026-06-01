// 这是一个Tab页面布局组件，包含了三个Tab页面：IndexTab、videosTab和usersTab
// (tabs)表示这是一个Tab页面布局组件，文件名为_layout.js，位于app/(tabs)目录下,(tabs)不会出现在路由中，路由中只会显示布局组件中的Tab页面
// 特别注意: (tabs)里面只能放置Tab页面，不属于Tab页面的其他页面应该放在app目录下，不能放在(tabs)目录下，否则会导致路由错误
import { TouchableOpacity } from 'react-native';

import { Tabs } from 'expo-router'; // 导入Stack组件，用于页面导航
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

function TabBarIcon(props) {
    return <SimpleLineIcons {...props} size={24} />;
}

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerTitleAlign: 'center', // 让安卓导航栏标题也居中
                tabBarActiveTintColor: '#1f99b0', // Tab页面被选中时，Tab图标和文字的颜色
                tabBarInactiveTintColor: 'gray', // Tab页面未被选中时，Tab图标和文字的颜色
                tabBarStyle: { backgroundColor: '#eee' }, // Tab栏的背景颜色
                // 去掉安卓Tab页面被选中时的背景色，默认情况下，安卓Tab页面被选中时，会有一个淡蓝色的背景色，这个属性可以去掉这个背景色，让Tab页面被选中时，只有图标和文字变色，而没有背景色
                // tabBarButton:(props)=>{
                //     return <TouchableOpacity {...props} activeOpacity={1} style={{...props.style, backgroundColor: 'transparent'}} />
                // }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'indexTab',
                    tabBarIcon: (props) => <TabBarIcon {...props} name="compass" />,
                }}
            />
            <Tabs.Screen
                name="videos"
                options={{
                    title: 'videosTab',
                    tabBarIcon: (props) => <TabBarIcon {...props} name="camrecorder" />,
                }}
            />
            <Tabs.Screen
                name="users"
                options={{
                    title: 'usersTab',
                    tabBarIcon: (props) => <TabBarIcon {...props} name="user" />,
                }}
            />
        </Tabs>
    );
}
