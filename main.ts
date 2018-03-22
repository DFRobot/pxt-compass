/**
 *This is DFRobot: the electronic compass user control library.
 */
//% weight=10 color=#00CED1 icon="\uf14e" block="compass"
namespace CMPS11 {
    const CMPS11_ADDRESS = 0x60

    let PITCH = 0
    let ROLL = 0
    let BEARING = 0
    let FINE = 0
    let SOFTVER = 0

    function i2cWriteByte(value: number) {
        pins.i2cWriteNumber(CMPS11_ADDRESS, value, NumberFormat.UInt8BE)
    }

    function i2cRead(num: number) {
        return pins.i2cReadBuffer(CMPS11_ADDRESS, num);
    }

    function getSoftVer() {
        i2cWriteByte(0)
        return i2cRead(1)[0]
    }

    /**
     * This function is used to get all of the sensor data,
     * and every time you need to get any data you have to 
     * perform this function.
    */
    //% weight=80
    //% blockId=CMPS11_getData block="Getting data"
    export function getData(): void {
        i2cWriteByte(2)
        let data = pins.createBuffer(4)
        data = i2cRead(4)
        let highByte = data[0]
        let lowByte = data[1]
        PITCH = data[2]
        ROLL = data[3]
        BEARING = ((highByte<<8)+lowByte)/10
        FINE = ((highByte<<8)+lowByte)%10
        SOFTVER = getSoftVer()
    }

    /**
     * Get the electronic compass software version.
    */
    //% weight=70
    //% blockId=CMPS11_softVer block="Software version"
    export function softVer(): number {
        let num = SOFTVER
        SOFTVER = 0
        return num
    }

    /**
     * Get the pitch Angle data.
    */
    //% weight=60
    //% blockId=CMPS11_pitch block="Pitch"
    export function pitch(): number {
        let num = PITCH
        PITCH = 0
        return num
    }

    /**
     * Gets the roll Angle data.
    */
    //% weight=50
    //% blockId=CMPS11_roll block="Roll"
    export function roll(): number {
        let num = ROLL
        ROLL = 0
        return num
    }

    /**
     * Gets the integral part of the bearing Angle.
    */
    //% weight=40
    //% blockId=CMPS11_bearing block="Bearing(integer)"
    export function bearing(): number {
        let num = BEARING
        BEARING = 0
        return num
    }

    /**
     * Obtain the Bearing Angle decimal fraction..
    */
    //% weight=30
    //% blockId=CMPS11_fine block="Bearing(decimal)"
    export function fine(): number {
        let num = FINE
        FINE = 0
        return num
    }

    /**
     * Serial port printing data.
    */
    //% weight=20
    //% blockId=CMPS11_SerialDisplay block="Serial Display Data"
    export function SerialDisplay(): void {
        let SoftVersion = "SoftVersion: " + CMPS11.softVer() + "\n"
        let Bearing = "Bearing: " + CMPS11.bearing() + "." + CMPS11.fine() + "\n"
        let Pitch = "Pitch: " + CMPS11.pitch() + "\n"
        let Roll = "Roll: " + CMPS11.roll() + "\n"
        serial.writeString(SoftVersion)
        serial.writeString(Bearing)
        serial.writeString(Pitch)
        serial.writeString(Roll)
        serial.writeString("\n")
    }
}