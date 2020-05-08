import React, { Component } from 'react';
import { Row, Col, Drawer, ImagePicker } from '@/yyd_modules';
import TweenOne from 'rc-tween-one';
import Zmage from 'react-zmage'
import { ZmageBackgroud } from '@/models/global'

import {
    EyeOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
    PlusOutlined
} from '@/yyd_modules/Icon';

var TweenOneGroup = TweenOne.TweenOneGroup;

import styles from './style.less';

interface ComponentProps {
    height?: string | number | undefined;
    width?: string | number | undefined;
    value?: string;
    onChange?: (value: string) => void;
    name?: string;
    dialogHeight?: number;
    thumbnail?: string;
}
interface ComponentState {
    insertImageVisiable?: boolean;
    prevValue?: string;
    value?: string;
}

/**
 * 单个图片选择
 * 图册选择图片；打开大图；删除已选；重新选择
 * @param props 
 */
class ImagePickerSingle extends Component<ComponentProps, ComponentState>{
    constructor(props: ComponentProps) {
        super(props);
        this.state = {
            insertImageVisiable: false,
            value: props.value ? props.value : '',
            prevValue: props.value ? props.value : '',
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
            return newState;
        }
        //如果内部的state一致，但是props的value变了，那么取props的值
        if (prevValue === value && value !== nextProps.value) {
            newState.prevValue = nextProps.value;
            newState.value = nextProps.value;
            return newState;
        }
        return newState;
        // if (nextProps.value !== undefined || value !== nextProps.value) {
        //     newState.value = nextProps.value;
        // }
        // return newState;
    }

    triggerChange = (value: any) => {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    render() {
        const { width, height, name, dialogHeight, thumbnail } = this.props;
        const { value, insertImageVisiable } = this.state;
        let _thumbnail = '_300x300';
        if (thumbnail) {
            _thumbnail = '_' + thumbnail;
        }
        // console.log(this.state);
        return (
            <>
                <div className="p-sm rounded-md text-hover" style={{ boxSizing: 'content-box', background: '#fafafa', border: '1px solid #d9d9d9', width: width, height: height }}>
                    <TweenOneGroup>
                        <div className={styles.itemWrapper} >
                            {value ?
                                <>
                                    <div>
                                        <img alt="img" src={value} style={{ width: width, height: height }} />
                                    </div>
                                    <div className={styles.actionsWrap} style={{ width: width, height: height }}>
                                        <Row className={`text-center ` + styles.actions} >
                                            <Col span={8} className="text-lg text-hover">
                                                <EyeOutlined onClick={() => {
                                                    Zmage.browsing({ src: value.replace(_thumbnail, ''), backdrop: ZmageBackgroud })
                                                }} />
                                            </Col>
                                            <Col span={8} className="text-lg text-hover">
                                                <DeleteOutlined onClick={() => {
                                                    this.setState({
                                                        value: ''
                                                    })
                                                    this.triggerChange('');
                                                }} />
                                            </Col>
                                            <Col span={8} className="text-lg text-hover">
                                                <PlusCircleOutlined onClick={() => {
                                                    this.setState({
                                                        insertImageVisiable: true
                                                    })
                                                }} />
                                            </Col>
                                        </Row>
                                    </div>
                                </> :
                                <div className="text-hover"
                                    //@ts-ignore
                                    style={{ width: width, height: height, paddingTop: (height / 2 - 22) }}
                                    onClick={() => {
                                        this.setState({
                                            insertImageVisiable: true
                                        })
                                    }}
                                >
                                    <div>
                                        <PlusOutlined />
                                    </div>
                                    <div>
                                        {name}
                                    </div>
                                </div>
                            }
                        </div>
                    </TweenOneGroup>
                </div>
                {/* </Spin> */}

                <Drawer
                    title={name}
                    placement="bottom"
                    closable={false}
                    onClose={() => {
                        this.setState({
                            insertImageVisiable: false
                        });
                    }}
                    height={dialogHeight ? dialogHeight : 402}
                    visible={insertImageVisiable}
                >
                    <ImagePicker onPicked={(images: any) => {
                        images.forEach((item: any) => {
                            let url = item.domain + '/' + item.filePath + '/' + item.fileName + _thumbnail + '.' + item.extendName + '?id=' + item.fileId;
                            this.setState({
                                value: url
                            });
                            this.triggerChange(url);
                        });
                        this.setState({
                            insertImageVisiable: false
                        });
                    }}></ImagePicker>
                </Drawer>
            </>
        );
    }
};

export default ImagePickerSingle;
