#include "pxt.h"

using namespace pxt;

namespace AMC5883L {
    //%
    StringData* cpp_division(int x, int y){
        int a = x / y;
        int b = x % y;
        char buf[20];
        sprintf(buf, "|%d|%d|", a, b);
        return ManagedString(buf).leakData();
    }


}

