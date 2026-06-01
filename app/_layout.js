// app/_layout.js
// 这个文件是整个应用的布局文件，所有的页面都会被这个布局包裹, 在所有的页面运行之前，都会先执行这个布局文件中的代码，所以我们可以在这里设置一些全局的样式或者导航配置
// 在这个布局文件中，我们使用了Stack组件来实现页面导航，Stack组件会自动处理页面的切换动画和导航栏的显示

import { Stack, useRouter } from 'expo-router'; // 导入Stack组件，用于页面导航
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function CloseButton() {
    const router = useRouter();
    return (
        <View style={{ with: 40 }}>
            <TouchableOpacity onPress={() => router.dismiss()}>
                <MaterialCommunityIcons color="#ed4864" name="close" size="40" />
            </TouchableOpacity>
        </View>
    );
}

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerTitleAlign: 'center', // 让安卓导航栏标题也居中
                animation: 'slide_from_right', //  页面切换动画，slide_from_right为左右切屏 , 设置为fade会有淡入淡出的效果
                headerStyle: { backgroundColor: '#1f99b0' },
                headerTintColor: 'black',
                headerTitleStyle: { fontWeight: 'bold' },
                headerBackButtonDisplayMode: 'minimal', // 让返回按钮只显示箭头，不显示文字
            }}
        >
            {/* 对(tabs)中的Tab页面进行包裹，设置headerShown为false, 去掉全局的导航栏 */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* 其他不属于Tab页面的页面也可以放在这里，这些页面会被这个Stack组件包裹，所以在这些页面切换时，也会有Stack组件设置的动画和导航栏样式 */}

            <Stack.Screen
                name="models/index"
                options={{
                    title: '模态框页',
                    presentation: 'modal', // 设置 modal 这个页面为模态框展示, 设置为 fullScreenModal 则会全屏展示模态框
                    headerRight: () => <CloseButton />,
                    animation: 'slide_from_bottom', // 设置模态框的切换动画为从底部弹出, 设置为fade会有淡入淡出的效果
                }}
            />
        </Stack>
    );
}
