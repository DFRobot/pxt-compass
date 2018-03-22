#include "pxt.h"

using namespace pxt;

namespace AMC5883L {
    //%
    Buffer cpp_division(int a, int b){
        Buffer buf = createBuffer(2);
        buf[0] = a / b;
        buf[0] = a % b;
        return buf;
    }

}