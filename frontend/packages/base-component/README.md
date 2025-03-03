# Cola Grid 表格工具栏基础组件

这是一个基于 Web Components 实现的表格工具栏组件，提供了常见的表格操作功能。

## 功能特性

- 插入行
- 隐藏列
- 筛选
- 分组
- 排序
- 调整行高
- 分享

## 安装

```bash
npm install @cola-grid/base-component
```

## 使用方法

```html
<script type="module">
  import '@cola-grid/base-component';
</script>

<cola-toolbar
  canInsertRow
  canHideColumns
  canFilter
  canGroup
  canSort
  canAdjustRowHeight
  canShare
></cola-toolbar>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| canInsertRow | boolean | true | 是否显示插入行按钮 |
| canHideColumns | boolean | true | 是否显示隐藏列按钮 |
| canFilter | boolean | true | 是否显示筛选按钮 |
| canGroup | boolean | true | 是否显示分组按钮 |
| canSort | boolean | true | 是否显示排序按钮 |
| canAdjustRowHeight | boolean | true | 是否显示调整行高按钮 |
| canShare | boolean | true | 是否显示分享按钮 |

## 事件

| 事件名 | 说明 |
|--------|------|
| insert-row | 点击插入行按钮时触发 |
| hide-column | 点击隐藏列按钮时触发 |
| filter | 点击筛选按钮时触发 |
| group | 点击分组按钮时触发 |
| sort | 点击排序按钮时触发 |
| adjust-row-height | 点击调整行高按钮时触发 |
| share | 点击分享按钮时触发 |

## 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 运行测试
npm run test
``` 