import React, { Component } from 'react';
import { Button, List, Card, ImageLoad } from '@/yyd_modules';
import Pager from '@/components/Pager';
import { connect } from 'dva';
import { UploadFilesEntity, ComponentProps, ComponentState } from '@/models/yyd/imagePicker';
import Zmage from 'react-zmage'
import { ZmageBackgroud } from '@/models/global'

import {
  PlusOutlined,
} from '@/yyd_modules/Icon';

import UploadForm from './uploadForm';


class ImagePicker extends Component<
  ComponentProps, ComponentState
  > {

  componentDidMount() {
    // const { modelState: { pageOptions } } = this.props;
    // console.log('ImagePicker', this.props);
    // console.log('ImagePicker.modelState', this.props.modelState);
    this.init();
  }

  init = () => {
    const { modelState: { pageOptions } } = this.props;
    this.getList(pageOptions);
  }

  getList = (pageOptions?: any) => {
    const { dispatch, modelState: { queryParams } } = this.props;
    dispatch({
      type: 'imagePicker/getList',
      payload: { ...pageOptions, ...{ queryParams: queryParams } }
    });
  }

  onShowAdd = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'imagePicker/updateModelState',
      payload: { modelVisible: true, current: undefined },
    });
  };

  render() {
    const {
      modelState: { list, pageOptions },
      getListLoading,
    } = this.props;

    //分页配置
    const pagerConfig = {
      pageIndex: pageOptions?.pageIndex,
      pageSize: pageOptions?.pageSize,
      recordCount: pageOptions?.recordCount,
      onChange: (pageIndex: number) => {
        const { modelState: { pageOptions } } = this.props;
        this.getList({
          ...pageOptions,
          pageIndex: pageIndex
        });
      },
      onShowSizeChange: (pageIndex: number, pageSize: number) => {
        const { modelState: { pageOptions } } = this.props;
        this.getList({
          ...pageOptions,
          pageIndex: 1,
          pageSize: pageSize
        });
      }
    };

    return (
      <>
        {/* <GridContent> */}
        <div className="image-picker-wrap">
          {/* <SearchForm {...this.props} /> */}
          <Button
            type="dashed"
            className="width-100 mb-lg"
            onClick={this.onShowAdd}
          >
            <PlusOutlined />
                上传新图片
              </Button>


          <List<UploadFilesEntity>
            rowKey="fileId"
            className={`width-100`}
            grid={{ gutter: 24, xxl: 8, xl: 8, lg: 4, md: 2, sm: 2, xs: 1 }}
            loading={getListLoading}
            dataSource={list}
            pagination={false}
            renderItem={item => (
              <List.Item key={item.fileId}>
                <Card
                  hoverable
                  bodyStyle={{ padding: 0 }}
                  actions={[
                    <Button type="link" block onClick={() => {
                      // console.log(item);
                      // let url = item.domain + '/' + item.filePath + '/' + item.fileName + '.' + item.extendName;
                      // console.log(url);
                      if (this.props.onPicked) {
                        this.props.onPicked([item]);
                      }
                    }}>
                      {/* <CheckOutlined /> */}
                      选择
                    </Button>

                  ]}
                >

                  <div onClick={() => Zmage.browsing({ src: item.domain + '/' + item.filePath + '/' + item.fileName + '.' + item.extendName, backdrop: ZmageBackgroud })}>
                    <ImageLoad imgSrc={`${item.domain}/${item.filePath}/${item.fileName}_300x400.${item.extendName}`} className="image_item" />
                  </div>
                </Card>
              </List.Item>
            )}
          />

          {/* <div className={`pager-panel`}> */}
          <div className="text-right">
            <Pager {...pagerConfig} />
          </div>
          {/* </div> */}
        </div>
        {/* </GridContent > */}
        <UploadForm {...this.props} />
      </>
    );
  }
};

// export default ImagePicker;
export default connect(
  ({
    imagePicker,
    loading,
  }: {
    imagePicker: ComponentState;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    modelState: imagePicker,
    getListLoading: loading.effects['imagePicker/getList']
  }),
)(ImagePicker);
