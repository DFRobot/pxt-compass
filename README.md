# Compass

MAX:bot Compass Module
---------------------------------------------------------

## Table of Contents

* [URL](#url)
* [Summary](#summary)
* [Blocks](#blocks)
* [Example](#example)
* [License](#license)

## URL
project URL: ```https://github.com/DFRobot/pxt-compass```

## Summary

This library provides support for the QMC5883L,All you need to do is copy the URL above and search in makecode to download the library.

## Blocks
Initialize the compass, which will reset the hardware and begin continuous measurement mode:

Get data magnetometer and temperature values from the compass.

From the perspective of reading on a compass direction, returns 0-359 ° integer

Used to calibrate the compass, after using the calibration function, approximately 2s-3s is used to calibrate the operation and rotate the compass in the horizontal direction for a week.

You can adjust the performance of the chip with the following methods:

Allowable values for rate are 10, 50, 100, or 200 Hertz. range may be 2 or 8 (Gauss). ovl may be 512, 256, 128, or 64.

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
