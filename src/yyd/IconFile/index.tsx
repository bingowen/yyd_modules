import React from 'react';
import { Excel, Word, PowerPoint, Zip, Html, Unknow, Image, Pdf, Video } from '../Icon';

interface ComponentProps {
    fileExtendName?: string;
    width?: number;
    height?: number;
}


const IconFile: React.FC<ComponentProps> = (props) => {
    const { fileExtendName } = props;

    const getComponent = () => {
        let component = <Unknow {...props} />;
        let extName = fileExtendName ? fileExtendName.toLowerCase() : '';
        switch (extName) {
            case '':
                component = <Unknow {...props} />;
                break;
            case 'doc':
            case 'docx':
                component = <Word {...props} />;
                break;
            case 'xls':
            case 'xlxs':
                component = <Excel {...props} />;
                break;
            case 'ppt':
            case 'pptx':
                component = <PowerPoint {...props} />;
                break;
            case 'zip':
            case 'rar':
                component = <Zip {...props} />;
                break;
            case 'html':
            case 'htm':
                component = <Html {...props} />;
                break;
            case 'jpg':
            case 'svg':
            case 'psd':
            case 'webp':
            case 'bmp':
            case 'png':
                component = <Image {...props} />;
                break;
            case 'mkv':
            case 'avi':
            case 'mp3':
            case 'mp4':
            case 'wmv':
            case 'flv':
            case 'rmvb':
                component = <Video {...props} />;
                break;
            case 'pdf':
                component = <Pdf {...props} />;
                break;
            default:
                break;
        };
        return component;
    }

    return (
        getComponent()
    );
};

export default IconFile;
