


/**
 *This is DFRobot: the electronic compass user control library.
 */
//% weight=10 color=#00CED1 icon="\uf14e" block="compass"
namespace QMC5883L {


    /**
     * sdfsdf
     */
    export enum Oversampling { 
        //% block="OS512"
        _OS512 = 1,
        //% block="OS256"
        _OS256 = 2,
        //% block="OS128"
        _OS128 = 3,
        //% block="OS64"
        _OS64 = 4
    }



    /**
     * Set Over sampling.
     * oversampling:Sampling, refers to the use is greater than the signal bandwidth 
     * (2 times or more) of sampling rate on the analog signal sampling, the sampling 
     * rate is the only one that can rebuild analog signal sampling rate, usually the 
     * sampling process of analog to digital.
     * oversampling:过采样，是指用大于信号带宽（2倍或以上）的采样率对模拟信号进行采样，
     * 这种采样率是能够唯一重建模拟信号的采样率，一般是模拟到数字的采样过程。
    */
    //% weight=70
    //% blockId=QMC5883L_setOversampling
    //% block="Set over sampling %index"
    export function QMC5883L_setOversampling(index: Oversampling): void {

    }

}