#include "pxt.h"
#include "math"

using namespace pxt;

namespace AMC5883L {
    //%
    StringData* cpp_division(int x, int y){
        int a = x / y;
        int b = x % y;
        char buf[20];
        sprintf(buf, "|%d|%d|", a, b);
        atan2(10, 50);
        return ManagedString(buf).leakData();
    }


}

