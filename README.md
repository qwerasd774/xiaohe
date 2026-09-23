# 小和 · 个人作品集

基于原生 HTML / CSS / JavaScript 构建的个人作品集单页网站，无任何前端框架与第三方库。桌面端为左侧深色信息栏 + 右侧滚动主内容的双栏布局，移动端自动切换为单栏流式布局。

## 主要功能

- **作品展示**：项目数据驱动渲染，新增项目只需在 `js/main.js` 的 `PROJECTS` 数组中添加一个对象
- **分类筛选**：筛选项根据项目数据自动生成，支持统计当前可见项目数量
- **介绍展开**：点击「展开介绍」查看项目补充说明，再次点击收起
- **深浅色主题切换**：导航栏右侧按钮切换深/浅色主题，选择通过 `localStorage` 记忆，刷新后保持
- **导航滚动高亮**：滚动页面时侧栏导航自动高亮当前区块（基于 IntersectionObserver）
- **入场动效**：区块滚动进入视口时淡入上移，并尊重系统「减少动效」偏好
- **容错处理**：项目配图加载失败时显示占位底色；禁用 JavaScript 时显示提示

## 技术栈

- HTML5（语义化标签、`noscript` 降级）
- CSS3（CSS 自定义属性实现主题变量、Flex / Grid 布局、媒体查询响应式）
- 原生 JavaScript（ES6+、IntersectionObserver、localStorage）

## 运行方式

纯静态页面，无需安装依赖。

方式一：直接用浏览器打开 `index.html`。

方式二：启动本地静态服务（推荐，体验与线上一致）：

```bash
# 在项目根目录执行，任选其一
python -m http.server 8765
npx serve .
```

然后访问 <http://localhost:8765>。

## 项目结构

```
lab04/
├── index.html      # 页面结构：侧栏（介绍/技能/导航）+ 主内容（作品/关于/联系）
├── css/style.css   # 全部样式：浅色变量在 :root，深色变量在 html[data-theme="dark"]
└── js/main.js      # 项目数据（PROJECTS）与全部交互逻辑
```

## 维护说明

- **新增项目**：编辑 `js/main.js` 顶部的 `PROJECTS` 数组，字段包括 `name`、`tagline`、`detail`、`tech`、`date`、`category`、`image`，筛选分类会自动更新
- **调整主题配色**：修改 `css/style.css` 中 `:root`（浅色）与 `html[data-theme="dark"]`（深色）两组变量即可全站生效
