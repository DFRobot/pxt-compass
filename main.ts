//The default I2C address of this chip
const QMC5883L_ADDR = 0x0D

//Register numbers
const QMC5883L_X_LSB = 0
const QMC5883L_X_MSB = 1
const QMC5883L_Y_LSB = 2
const QMC5883L_Y_MSB = 3
const QMC5883L_Z_LSB = 4
const QMC5883L_Z_MSB = 5
const QMC5883L_STATUS = 6
const QMC5883L_TEMP_LSB = 7
const QMC5883L_TEMP_MSB = 8
const QMC5883L_CONFIG = 9
const QMC5883L_CONFIG2 = 10
const QMC5883L_RESET = 11
const QMC5883L_RESERVED = 12
const QMC5883L_CHIP_ID = 13

//Bit values for the STATUS register
const QMC5883L_STATUS_DRDY = 1
const QMC5883L_STATUS_OVL = 2
const QMC5883L_STATUS_DOR = 4

//Oversampling values for the CONFIG register
const QMC5883L_CONFIG_OS512 = 0
const QMC5883L_CONFIG_OS256 = 64
const QMC5883L_CONFIG_OS128 = 128
const QMC5883L_CONFIG_OS64  = 192

//Range values for the CONFIG register
const QMC5883L_CONFIG_2GAUSS = 0
const QMC5883L_CONFIG_8GAUSS = 16

//Rate values for the CONFIG register
const QMC5883L_CONFIG_10HZ = 0
const QMC5883L_CONFIG_50HZ = 4
const QMC5883L_CONFIG_100HZ = 8
const QMC5883L_CONFIG_200HZ = 12

//Mode values for the CONFIG register
const QMC5883L_CONFIG_STANDBY = 0
const QMC5883L_CONFIG_CONT = 1


/**
 *This is DFRobot: the electronic compass user control library.
 */
//% weight=10 color=#00CED1 icon="\uf14e" block="compass"
namespace AMC5883L {
    let addr = 0
    let oversampling = 0
    let range = 0
    let rate = 0
    let mode = 0
    let xhigh = 0
    let xlow = 0
    let yhigh = 0
    let ylow = 0

    let X = 0;
    let Y = 0;
    let Z = 0;

    /**
     * The user can choose the step motor model.
     */
    export enum Sampling { 
        //% block="10HZ"
        _10HZ = 10,
        //% block="50HZ"
        _50HZ = 50,
        //% block="100HZ"
        _100HZ = 100,
        //% block="200HZ"
        _200HZ = 200
    }

    
    //% advanced=true shim=AMC5883L::cpp_division
    function cpp_division(x: number, _x: number, y: number, _y: number): number { 
        return 0
    }



    function i2cWriteByte(value: number) {
        pins.i2cWriteNumber(QMC5883L_ADDR, value, NumberFormat.UInt8BE)
    }

    function i2cReadByte(count: number) {
        return pins.i2cReadBuffer(addr, count)
    }

    function i2cRead(addr: number, reg: number, count: number) { 
        i2cWriteByte(reg)
        //let n =pins.i2cReadBuffer(addr, count).length
        //if (n != count) { 
        //    return 0
        //}
        return count
    }

    function i2cWrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function reconfig() { 
        i2cWrite(addr, QMC5883L_CONFIG, oversampling | range | rate | mode) 
    }

    function reset() { 
        i2cWrite(addr, QMC5883L_RESET, 0x01)
        reconfig()
    }

    function ready() {
        let c = i2cRead(addr, QMC5883L_STATUS, 1)
        //serial.writeNumber(c)
        if (!c) { 
            return 0;
        }
        let status = i2cReadByte(1)[0]
        return status & QMC5883L_STATUS_DRDY
    }


    

    /**
     * This function is used to get all of the sensor data,
     * and every time you need to get any data you have to 
     * perform this function.
    */
    //% weight=80
    //% blockId=AMC5883L_init
    //% block="Init"
    export function AMC5883L_init(): void {
        addr = QMC5883L_ADDR
        oversampling = QMC5883L_CONFIG_OS512
        range = QMC5883L_CONFIG_2GAUSS
        rate = QMC5883L_CONFIG_50HZ
        mode = QMC5883L_CONFIG_CONT
        reset()
    }

    /**
     * This function is used to get all of the sensor data,
     * and every time you need to get any data you have to 
     * perform this function.
    */
    //% weight=80
    //% blockId=AMC5883L_setSamplingRate
    //% block="set sampling rate %SamplingRate"
    export function AMC5883L_setSamplingRate(SamplingRate: Sampling): void {
        switch (SamplingRate) { 
            case Sampling._10HZ: rate = QMC5883L_CONFIG_10HZ;
                break;
            case Sampling._50HZ: rate = QMC5883L_CONFIG_50HZ;
                break;
            case Sampling._100HZ: rate = QMC5883L_CONFIG_100HZ;
                break;
            case Sampling._200HZ: rate = QMC5883L_CONFIG_200HZ;
                break;
        }
        reconfig()
    }

    /**
     * This function is used to get all of the sensor data,
     * and every time you need to get any data you have to 
     * perform this function.
    */
    //% weight=80
    //% blockId=AMC5883L_readRaw
    //% block="Read raw"
    export function AMC5883L_readRaw(): number {
        while (!ready()) { }
        if (!i2cRead(addr, QMC5883L_X_LSB, 6)) { 
            return 0
        }
        let data = i2cReadByte(6)
        let q = data[0]
        let w = data[1]
        let e = data[2]
        let r = data[3]
        let t = data[4]
        let u = data[5]
        //serial.writeString("|"+q+"|"+w+"|"+e+"|"+r+"|"+t+"|"+u+"|\r")

        let x = q | (w << 8)
        let y = e | (r << 8)
        let z = t | (u << 8)
        if (x > 32767) { 
            x = x-65536
        }
        if (y > 32767) { 
            y = y-65536
        }
        if (z > 32767) { 
            z = z-65536
        }
        X = x;
        Y = y;
        Z = z;
        return 1
    }

    /**
     * This function is used to get all of the sensor data,
     * and every time you need to get any data you have to 
     * perform this function.
    */
    //% weight=80
    //% blockId=AMC5883L_readHeading
    //% block="Read heading"
    export function AMC5883L_readHeading(): number {
        if(!AMC5883L_readRaw()) return 0
        let x = X
        let y = Y
        let z = Z
        //Update the observed boundaries of the measurements
        if (x < xlow) xlow = x
        if (x > xhigh) xhigh = x
        if (y < ylow) ylow = y
        if (y > yhigh) yhigh = y
        //Bail out if not enough data is available
        if (xlow == xhigh || ylow == yhigh) return 0
        //Recenter the measurement by subtracting the average
        x -= (xhigh + xlow) / 2
        y -= (yhigh + ylow) / 2
        //Rescale the measurement to the range observed
        let fx = x / (xhigh - xlow)
        let _fx = x % (xhigh - xlow)
        let fy = y / (yhigh - ylow)
        let _fy = y % (yhigh - ylow)

        return cpp_division(fx, _fx, fy, _fy)
   


      //  let fx = pins.createBuffer(2)
       // let fy = pins.createBuffer(2)
       // fx = cpp_division(x, xhigh - xlow);
        //fy = cpp_division(x, xhigh - xlow);

       // let heading = 180.0*
    }

    /**
     * This function is used to get all of the sensor data,
     * and every time you need to get any data you have to 
     * perform this function.
    */
    //% weight=80
    //% blockId=AMC5883L_x
    //% block="X"
    export function AMC5883L_x(): number {
        return X
    }
    /**
     * This function is used to get all of the sensor data,
     * and every time you need to get any data you have to 
     * perform this function.
    */
    //% weight=80
    //% blockId=AMC5883L_y
    //% block="Y"
    export function AMC5883L_y(): number {
        return Y
    }
    /**
     * This function is used to get all of the sensor data,
     * and every time you need to get any data you have to 
     * perform this function.
    */
    //% weight=80
    //% blockId=AMC5883L_z
    //% block="Z"
    export function AMC5883L_z(): number {
        return Z
    }



}