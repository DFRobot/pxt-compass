#include "pxt.h"

using namespace pxt;

namespace AMC5883L {
    //%
    StringData* cpp_division(int size){
        int n = size;
        if (n == 0) return ManagedString("").leakData();
        return ManagedString(uBit.serial.read(n, MicroBitSerialMode::ASYNC)).leakData();
    }


}

