import React from 'react';

interface ComponentProps {
    number: string | number | Date;
}

/**
 * 数字千分位展示 
 * @param props 
 */
const FormatNumber: React.FC<ComponentProps> = (props) => {
    const { number } = props;

    const getNumber = () => {
        return (number + '').replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
    }
    // const getNumber = () => {
    //     return (number+'').replace(/,/g, '');
    // }

    return (
        <>{getNumber()}</>
    );
};

export default FormatNumber;
