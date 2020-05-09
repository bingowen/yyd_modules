/*@ts-nocheck 禁止ts语法检查*/
import 'braft-editor/dist/index.css'
import React, { Component, RefObject } from 'react';
import BraftEditor from 'braft-editor'
import { PictureOutlined, FileZipOutlined } from '@ant-design/icons';
import { Drawer, ImagePicker, FilePicker } from '../../';
//@ts-ignore：忽略语法检查
import { ContentUtils } from 'braft-utils'
// import { FormInstance } from 'antd/lib/form';


export interface ComponentProps {
    controls?: string[];
    extendControls?: any;
    placeholder?: string;
    onChange?: (editorState: any) => void;
    value?: string;
}

export interface ComponentState {
    editorState?: any;
    insertImageVisiable?: boolean;
    insertFileVisiable?: boolean;
    prevValue?: string;
    value?: string;
}


class Editor extends Component<ComponentProps, ComponentState>{

    constructor(props: ComponentProps) {
        super(props);
        this.state = {
            insertImageVisiable: false,
            insertFileVisiable: false,
            value: props.value ? props.value : '',
            prevValue: props.value ? props.value : '',
            editorState: BraftEditor.createEditorState(props.value ? props.value : ''),
        };
    }

    /**
     * form.item name所对应的值改变的时候，会触发这里的
     * 注意：form.item第一个元素必须是本组件，不然不会生效
     * @param nextProps 
     * @param nextState 
     */
    static getDerivedStateFromProps(nextProps: ComponentProps, nextState: ComponentState) {
        // console.log('getDerivedStateFromProps', nextProps, nextState);
        const { prevValue, value } = nextState;
        const newState: Partial<ComponentState> = { prevValue: prevValue, value: value };
        //此时内部改变了state值，需要处理成一致
        if (prevValue !== value) {
            newState.prevValue = value;
            newState.value = value;
            newState.editorState = BraftEditor.createEditorState(newState.value);
            return newState;
        }
        //如果内部的state一致，但是props的value变了，那么取props的值
        if (prevValue === value && nextProps.value !== value) {
            newState.prevValue = nextProps.value;
            newState.value = nextProps.value;
            newState.editorState = BraftEditor.createEditorState(newState.value);
            return newState;
        }
        // newState.editorState = BraftEditor.createEditorState(newState.value);
        return newState;
    }

    triggerChange = (value: any) => {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };


    render() {
        const { editorState, insertImageVisiable, insertFileVisiable } = this.state;
        const insertImage = {
            key: 'insertImage',
            type: 'component',
            component: (
                <button type="button" className="control-item button upload-button" data-title="插入图片" onClick={() => {
                    this.setState({
                        insertImageVisiable: true
                    });
                }}>
                    <PictureOutlined />
                </button>
            )
        }
        const insertDownloadFile = {
            key: 'insertDownloadFile',
            type: 'component',
            component: (
                <button type="button" className="control-item button upload-button" data-title="添加文件下载" onClick={() => {
                    this.setState({
                        insertFileVisiable: true
                    });
                }}>
                    <FileZipOutlined />
                </button>
            )
        }
        const config = {
            controls: this.props.controls ? this.props.controls : [
                'fullscreen', 'separator',
                'undo', 'redo', 'separator',
                'font-size', 'line-height', 'letter-spacing', 'separator',
                'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
                'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
                'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
                'link', 'separator', 'hr', 'separator',
                // 'media', 'separator',//去掉自带媒体库，使用自定义扩展
                'clear', 'separator'
            ],
            extendControls: this.props.extendControls ? this.props.extendControls : [insertImage, insertDownloadFile],
            placeholder: this.props.placeholder ? this.props.placeholder : '',
            onChange: this.props.onChange ? this.props.onChange : (() => { }),
            value: this.props.value ? this.props.value : '',
        }
        // console.log(editorState.toHTML());



        return (<>
            <BraftEditor
                value={editorState}
                //@ts-ignore
                controls={config.controls}
                extendControls={config.extendControls} placeholder={config.placeholder} onChange={(editorState: any) => {
                    this.setState({
                        editorState: editorState,
                        prevValue: editorState.toHTML(),
                        value: editorState.toHTML()
                    })

                    // if (config.onChange) {
                    //     config.onChange(editorState)
                    // }
                    this.triggerChange(editorState.toHTML());
                }} />
            <Drawer
                title="插入图片"
                placement="bottom"
                closable={false}
                onClose={() => {
                    this.setState({
                        insertImageVisiable: false
                    });
                }}
                height="402"
                visible={insertImageVisiable}
            >
                <ImagePicker onPicked={(images: any) => {
                    images.forEach((item: any) => {
                        let url = item.domain + '/' + item.filePath + '/' + item.fileName + '.' + item.extendName;
                        // console.log(url);
                        //ContentUtils介绍：https://github.com/margox/braft-utils
                        this.setState({
                            editorState:
                                ContentUtils.insertHTML(this.state.editorState, '<p class="media-wrap image-wrap"><img fileId="' + item.fileId + '" src="' + url + '"/></p><p></p>')
                            // ContentUtils.insertMedias(this.state.editorState, [{
                            //     type: 'IMAGE',
                            //     url: url
                            // }])
                            //ContentUtils.insertText(this.state.editorState, '你好啊！')
                        });
                        setTimeout(() => {
                            this.setState({
                                prevValue: this.state.editorState.toHTML(),
                                value: this.state.editorState.toHTML()
                            })
                        })
                    });
                    this.setState({
                        insertImageVisiable: false
                    });
                }}></ImagePicker>
            </Drawer>
            <Drawer
                title="插入下载文件"
                placement="bottom"
                closable={false}
                onClose={() => {
                    this.setState({
                        insertFileVisiable: false
                    });
                }}
                height="466"
                visible={insertFileVisiable}
            >
                <FilePicker onPicked={(images: any) => {
                    images.forEach((item: any) => {
                        console.log(item);
                        // let url = item.domain + '/' + item.filePath + '/' + item.fileName + '.' + item.extendName;
                        this.setState({
                            editorState:
                                ContentUtils.insertHTML(this.state.editorState, '<p class="editor-attachment"><a fileId="' + item.fileId + '" href="' + item.domain + '/api/center/download/attachment/' + item.fileId + '/' + item.fileName + '" target="_blank">' + item.fileOldName + '</a></p><p></p>')
                            //ContentUtils.insertText(this.state.editorState, '你好啊！')
                        });

                        setTimeout(() => {
                            this.setState({
                                prevValue: this.state.editorState.toHTML(),
                                value: this.state.editorState.toHTML()
                            })
                        })
                    });
                    this.setState({
                        insertFileVisiable: false
                    });
                }}></FilePicker>
            </Drawer>
        </>)

    }
}

export default Editor;
// export default connect(
//     ({
//         editor,
//     }: {
//         editor: ComponentState;
//     }) => ({
//         modelState: editor
//     }),
// )(Editor);