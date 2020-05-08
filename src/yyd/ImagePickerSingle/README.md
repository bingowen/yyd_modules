## 图片选择组件支持两种使用方式

1、与 Form 组件一起使用，改组件必须放在Form.Item的第一个元素，否则不会联动FormItem的value，demo如下：

```tsx
<Form.Item name="coverImage">
    <ImagePickerSingle onChange={
        (value: string) => {
        console.log(value);
        }
    } width={150} height={150} name="设置封面图" />
</Form.Item>
```
与Form一起使用时候，支持的参数：

> - width 图片区域宽度
> - height 图片区域高度
> - onChange 图片路径改变后回调，一般用户选择了图片会触发
> - name 图片选择器名称，会显示的，必须使用
> - dialogHeight 图片选择框高度
> - thumbnail 图片缩略图，选择后返回图片是缩略图，默认：300x300

与Form一起使用时候，不支持的参数：

> - value 初始化图片路径

与 Form 组件一起使用，只需通过setFieldValue就可以影响该组件的值，不需要指定value属性


2、不与 Form 组件一起使用，demo如下：

```tsx
<ImagePickerSingle onChange={
(value: string) => {
    console.log(value);
}
} width={150} height={150} value="" name="设置封面图" />
```
不与Form一起使用时候，支持的参数：

> - width 图片区域宽度
> - height 图片区域高度
> - onChange 图片路径改变后回调，一般用户选择了图片会触发
> - name 图片选择器名称，会显示的，必须使用
> - dialogHeight 图片选择框高度
> - thumbnail 图片缩略图，选择后返回图片是缩略图，默认：300x300
> - value 初始化图片路径

不与 Form 组件一起使用，可通过修改value的值来影响该组件的值
