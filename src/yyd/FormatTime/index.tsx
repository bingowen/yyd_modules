import React from 'react';

interface ComponentProps {
    time: string | number | Date;
}

/**
 * 时间转换友好的显示格式
 * 输出格式：21小时28分钟15秒
 * @param props 
 */
const FormatTime: React.FC<ComponentProps> = (props) => {
    const { time } = props;

    const getDateTime = () => {
        let times = (new Date(time)).getTime() / 1000;
        let currentTime = new Date().getTime() / 1000;
        times = currentTime - times;
        //处理刚刚,1分钟内为刚刚
        if (times / 60 < 1) {
            return '刚刚';
        } else if (times / 60 / 60 < 1) {//一小时内显示分钟
            return Math.floor(times / 60) + '分钟前';
        } else if (times / 60 / 60 < 24) {//24小时内显示N小时前
            return Math.floor(times / 60 / 60) + '小时前';
        } else if (times / 60 / 60 / 24 / 365 < 1) {//1年内时间只显示月日时分秒
            return (time + '').substr(5);
        } else {
            return time;
        }
    }

    return (
        <>{getDateTime()}</>
    );
};

export default FormatTime;
