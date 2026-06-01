# myApp

这是一个基于 Expo SDK 56 的 React Native 示例项目，使用 Expo Router 做文件路由，当前主要用于练习移动端基础组件、Tab 导航、Stack 导航、动态路由、模态页、列表刷新、网络请求封装和系统分享能力。

## 技术栈

- Expo SDK: `~56.0.4`
- Expo Router: `~56.2.7`
- React Native: `0.85.3`
- React: `19.2.3`
- UI 图标: `@expo/vector-icons`
- 网络请求 URL 拼接: `urlcat`
- 代码格式化: `prettier`

Expo SDK 56 对应的版本要求请参考 Expo 官方版本文档：<https://docs.expo.dev/versions/v56.0.0/>

## 环境要求

Expo SDK 56 官方版本表要求最低 Node.js 为 `22.13.x`。建议使用 Node.js 22 LTS 或更新版本。

```bash
node -v
npm -v
```

## 安装依赖

```bash
npm install
```

如果希望严格按照 `package-lock.json` 安装，可以使用：

```bash
npm ci
```

## 启动项目

```bash
npm start
```

启动后可以按终端提示使用：

- 扫描二维码在真机中打开
- 按 `a` 打开 Android 模拟器
- 按 `i` 打开 iOS 模拟器
- 按 `w` 打开 Web 版本

也可以直接运行：

```bash
npm run android
npm run ios
npm run web
```

如果真机扫码无法连接，可以尝试 Expo 的 tunnel 模式：

```bash
npx expo start --tunnel
```

## 项目结构

```text
.
├── app/                     # Expo Router 文件路由目录
│   ├── _layout.js           # 全局 Stack 布局
│   ├── (tabs)/              # Tab 路由分组，不出现在 URL 路径中
│   │   ├── _layout.js       # 底部 Tab 导航配置
│   │   ├── index.js         # 首页 Tab
│   │   ├── videos.js        # 视频页 Tab
│   │   └── users.js         # 用户页 Tab
│   ├── list/index.js        # 列表页
│   ├── details/index.js     # 普通详情页
│   ├── activeDetails/[id].js # 动态详情页
│   └── models/index.js      # 模态框页
├── components/shared/       # 公共组件
│   ├── Loading.js
│   └── NetworkError.js
├── util/request.js          # fetch 请求封装
├── assets/                  # 图标、favicon 等静态资源
├── app.json                 # Expo 应用配置
└── package.json             # 依赖和 npm scripts
```

## 当前功能

- 使用 `expo-router` 的文件路由作为应用入口，`package.json` 中的 `main` 为 `expo-router/entry`。
- 当前页面入口位于 `app/` 目录；根目录的 `App.js` 保留了早期示例代码，不是当前 Expo Router 的入口。
- `app/_layout.js` 配置全局 Stack 导航、页面切换动画、导航栏样式和模态页。
- `app/(tabs)/_layout.js` 配置三个底部 Tab：首页、视频页、用户页。
- 首页展示 `FlatList`、下拉刷新、触底回调、Alert 弹窗、屏幕尺寸读取和自定义导航栏按钮。
- 列表页演示 `Link`、`router.navigate`、`router.push` 三种跳转方式。
- 动态详情页 `app/activeDetails/[id].js` 使用 `useLocalSearchParams` 读取路由参数，并根据参数设置页面标题。
- 用户页使用 React Native `Share` API 演示系统分享。
- 视频页可以跳转打开模态框页面。
- `components/shared/Loading.js` 和 `NetworkError.js` 提供加载中与网络错误状态。
- `util/request.js` 封装 `GET`、`POST`、`PUT`、`DELETE` 请求。

## 网络配置

请求基础地址从环境变量读取：

```text
EXPO_PUBLIC_API_URL
```

如果未配置，默认使用：

```text
https://jsonplaceholder.typicode.com
```

可以在本地 `.env` 中配置：

```bash
EXPO_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

注意：`.gitignore` 已忽略 `.env`，不要把本地环境变量或密钥提交到 Git 仓库。

## 常用命令

```bash
# 启动开发服务器
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web

# 格式化 JS/TS/JSON 文件
npm run format
```

## Git 提交建议

首次提交前建议检查状态：

```bash
git status
```

添加 README：

```bash
git add README.md
```

添加项目源码时，确认 `.env` 没有被提交：

```bash
git add app components util assets App.js app.json index.js package.json package-lock.json README.md LICENSE
```
