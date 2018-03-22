#include "pxt.h"

using namespace pxt;

namespace AMC5883L {
    //%
    StringData* cpp_division(int x, int y){
        int n = 2;
        if (n == 0) return ManagedString("").leakData();
        return ManagedString(uBit.serial.read(n, MicroBitSerialMode::ASYNC)).leakData();
    }


}

