//#region import 样式文件
//#endregion import 样式文件
//@ts-nocheck
//#region import 组件、插件等

import { Button, Modal, Skeleton, Upload } from '@/yyd_modules';
import { InboxOutlined } from '@/yyd_modules/Icon';

import { Form } from 'antd';
import { connect } from 'dva';
import React, { Component } from 'react';
import { FormInstance } from 'antd/lib/form';
import { ComponentProps, ComponentState } from '@/models/filePicker';
const { Dragger } = Upload;
import { errorMessage, successMessage } from '@/utils/utils';
//#endregion import 组件、插件等

//#region 定义常量

// const { TextArea } = Input;

//#endregion 定义常量



//#region Component定义
class UploadForm extends Component<ComponentProps, ComponentState> {
  constructor(props: any) {
    super(props);


  }
  //#region 相关参数定义

  formRef = React.createRef<FormInstance>();

  //#endregion 相关参数定义

  //#region Component生命周期
  componentDidUpdate(prevProps: ComponentProps, prevState: ComponentState, snapshot: any) {
    //判断保存状态是否变更，如果变更了，得到当前的变更值，做相关业务

  }

  //#endregion Component生命周期

  //#region 业务方法



  onClose = () => {
    this.updateModelState({ modelVisible: false });
    this.getList();
  };

  updateModelState(payload: object) {
    const { dispatch } = this.props;
    dispatch({
      type: 'filePicker/updateModelState',
      payload: payload,
    });
  }

  getList() {
    const { dispatch, modelState: { pageOptions } } = this.props;
    dispatch({
      type: 'filePicker/getList',
      payload: {
        ...pageOptions,
        pageIndex: 1
      },
    });
  }
  //#endregion 业务方法




  //#region UI渲染
  render() {
    const {
      modelState: { current },
    } = this.props;

    const modalFooter = [
      <Button key="back" onClick={this.onClose}>
        关闭
      </Button>
    ];

    const props = {
      name: 'file',
      multiple: true,
      action: '/api/center/uploadify/uploadFile',
      method: 'post',
      headers: { token: localStorage.getItem("token") },
      data: { folder: '', action: 'save', fileGroup: 'center' },
      onChange(info: any) {
        // console.log('info',info);
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          successMessage(`${info.file.name} 上传成功.`);
        } else if (status === 'error') {
          errorMessage(`${info.file.name} 上传失败.`);
        }
      },
    };

    return (
      <Modal
        title={`${this.props.modelState?.editId ? '修改' : '添加'}新图片`}
        width={640}
        destroyOnClose={true}
        maskClosable
        onCancel={this.onClose}
        visible={this.props.modelState.modelVisible}
        footer={modalFooter}
      >
        <Skeleton loading={this.props.getEntityLoading} active title paragraph={{ rows: 2 }}>
          <Form
            ref={this.formRef}
            name="form-edit"
            initialValues={current}
            onFinishFailed={this.onClose}
            {...{
              labelCol: { span: 5 },
              wrapperCol: { span: 16 },
            }}
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">单击或拖动文件到此区域即可上传文件</p>
              <p className="ant-upload-hint">
                支持单个或多个文件同时进行上传
              </p>
            </Dragger>

          </Form>
        </Skeleton>
      </Modal>
    );
  }
  //#endregion UI渲染
}


// export default EditForm;
export default connect(
  ({
    filePicker,
  }: {
    filePicker: ComponentState;
  }) => ({
    modelState: filePicker
  }),
)(UploadForm);
//#endregion Component定义
