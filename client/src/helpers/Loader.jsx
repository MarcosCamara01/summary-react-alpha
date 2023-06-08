import React from 'react';
import { TailSpin } from 'react-loader-spinner';

export const Loader = ({ size, color }) => {
    return (
        <TailSpin
            height={size}
            width={size}
            color={color}
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
}
