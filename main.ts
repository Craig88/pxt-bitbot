
/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="\uf1b9"
namespace bitbot {

    let neoStrip: neopixel.Strip;

    /**
      * Enumeration of motors.
      */
    export enum Motor {
        //% block="left"
        Left,
        //% block="right"
        Right,
        //% block="all"
        All
    }

    /**
      * Enumeration of line sensors.
      */
    export enum LineSensor {
        //% block="left"
        Left,
        //% block="right"
        Right
    }

    /**
      * Enumeration of light sensors.
      */
    export enum LightSensor {
        //% block="left"
        Left,
        //% block="right"
        Right
    }

    /**
     * Return a neo pixel strip.
     */
    //% blockId="bitbot_neo" block="neo strip"
    export function neo(): neopixel.Strip {
        if (!neoStrip) {
            neoStrip = neopixel.create(DigitalPin.P13, 12, NeoPixelMode.RGB)
        }

        return neoStrip;
    }

    /**
      * Drive motor(s) forward or reverse.
      *
      * @param motor motor to drive.
      * @param speed speed of motor
      */
    //% blockId="bitbot_motor" block="drive motor %motor|speed %speed"
    export function motor(motor: Motor, speed: number): void {
        let forward = (speed >= 0);

        if (speed > 100) {
            speed = 100;
        } else if (speed < -100) {
            speed = 100;
        } else if (speed < 0) {
            speed = -speed;
        }

        let realSpeed = 0; // Math.round((speed * 1023) / 100);
        if (!forward) {
            realSpeed = 1023 - realSpeed;
        }

        if ((motor == Motor.Left) || (motor == Motor.All)) {
            pins.analogWritePin(AnalogPin.P0, realSpeed);
            pins.digitalWritePin(DigitalPin.P8, forward ? 0 : 1);
        }

        if ((motor == Motor.Right) || (motor == Motor.All)) {
            pins.analogWritePin(AnalogPin.P1, realSpeed);
            pins.digitalWritePin(DigitalPin.P12, forward ? 0 : 1);
        }
    }

    /**
      * Sound a buzz.
      *
      * @param flag Flag to set (0) for off and (1) for on.
      */
    //% blockId="bitbot_buzz" block="buzz sound %flag"
    export function buzz(flag: number): void {
        pins.digitalWritePin(DigitalPin.P14, flag === 0 ? 0 : 1);
    }

    /**
      * Read line sensor.
      *
      * @param sensor Line sensor to read.
      */
    //% blockId="bitbot_read_line" block="read line sensor %sensor"
    export function readLine(sensor: LineSensor): number {
        if (sensor == LineSensor.Left) {
            return pins.digitalReadPin(DigitalPin.P11);
        } else {
            return pins.digitalReadPin(DigitalPin.P5);
        }
    }

    /**
      * Read light sensor.
      *
      * @param sensor Light sensor to read.
      */
    //% blockId="bitbot_read_light" block="read light sensor %sensor"
    export function readLight(sensor: LightSensor): number {
        if (sensor == LightSensor.Left) {
            pins.digitalWritePin(DigitalPin.P16, 0);
            return pins.analogReadPin(AnalogPin.P2);
        } else {
            pins.digitalWritePin(DigitalPin.P16, 1);
            return pins.analogReadPin(AnalogPin.P2);
        }
    }

    /**
      * Shows all LEDs to a given color (range 0-255 for r, g, b).
      *
      * @param rgb RGB color of the LED
      */
    //% blockId="bitbot_neo_show_color" block="show color %rgb=neopixel_colors"
    export function neoShowColor(rgb: number) {
        neo().showColor(rgb);
    }

    /**
      * Show leds.
      */
    //% blockId="bitbot_neo_show" block="show leds"
    export function neoShow(): void {
        neo().show();
    }

    /**
      * Clear leds.
      */
    //% blockId="bitbot_neo_clear" block="clear leds"
    export function neoClear(): void {
        neo().clear();
    }

    /**
      * Shows a rainbow pattern on all LEDs.
      */
    //% blockId="bitbot_neo_show_rainbow" block="show led rainbow"
    export function neoShowRainbow(): void {
        neo().showRainbow(1, 360);
    }

    /**
     * Shift LEDs forward and clear with zeros.
     */
    //% blockId="bitbot_neo_shift" block="shift led pixels"
    export function neoShift(): void {
        neo().shift(1);
    }

    /**
     * Rotate LEDs forward.
     */
    //% blockId="bitbot_neo_rotate" block="rotate led pixels"
    export function neoRotate(): void {
        neo().rotate(1);
    }

    /**
     * Set the brightness of the strip.
     *
     * @param brightness a measure of LED brightness in 0-255. eg: 255
     */
    //% blockId="bitbot_neo_brightness" block="set led brightness %brightness"
    export function neoBrightness(brightness: number): void {
        neo().setBrigthness(brightness);
    }
}
