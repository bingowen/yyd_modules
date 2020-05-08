import React from 'react';
import IconFile from '@/yyd_modules/IconFile';

import { UploadFilesEntity } from '@/models/filePicker';

import { FormatTime, FormatFileSize } from '@/yyd_modules';

interface FileLoadProps {
  fileItem: UploadFilesEntity
}

const FileLoad: React.FC<FileLoadProps> = (props: FileLoadProps) => {
  const { fileItem } = props;

  return (
    <div className="d-flex p-sm">
      <div>
        <IconFile width={64} height={64} fileExtendName={fileItem.extendName}></IconFile>
      </div>
      <div className="flex-1 pl-md" style={{ width: 0 }}>
        <div className="text-truncate">{fileItem.fileOldName}</div>
        <div className="text-grey-7">大小：<FormatFileSize fileByte={fileItem.fileSize} />&nbsp;&nbsp;&nbsp;&nbsp;类型：{fileItem.extendName}</div>
        <div className="text-grey-7">时间：<FormatTime time={fileItem.createDate} /></div>
      </div>
    </div>

  );
};

export default FileLoad;
