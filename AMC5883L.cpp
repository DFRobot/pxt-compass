#include "pxt.h"
#include "math.h"

using namespace pxt;

namespace AMC5883L {
    //%
    int cpp_division(int x, int _x, int y, int _y){
        int counta = 0;
        int a = _x;
        int countb = 0;
        int b = _y;
        while(a!=0) {
            a/=10;
            counta++;
        }
        while(b!=0) {
            b/=10;
            countb++;
        }
        float xx = _x / pow(10, counta);
        float yy = _y / pow(10, countb);
        xx = x + xx;
        yy = y + yy;

        int heding = 180.0 * atan2(yy, xx) / 3.14159265358979323846264338327950288;
        if (heding < 0){
            heding += 360;
        }
        return heding;
    }

    //%
    int cpp_yaw(int f, int h, int X, int Y){
        float Xh = X * cos(f) + Y * sin(h) * sin(f) - Z * cos(h) * sin(f);
        float Yh = Y * cos(h) + Z * sin(h);

        if(Xh<0){
            int a = 180 - atan2(Yh, Xh) * 180 / 3.14159265358979323846264338327950288;
            return a;
        }else if(Xh>0&&Yh<0){
            int b = -atan2(Yh, Xh) * 180 / 3.14159265358979323846264338327950288;
            return b;
        }else if(Xh>0&&Yh>0){
            int c = 360 - atan2(Yh, Xh) * 180 / 3.14159265358979323846264338327950288;
            return c;
        }else if(Xh==0 && Yh<0){
            return 90;
        }else if(Xh==0 && Yh>0){
            return 270;
        }
        return 0;
    }

}

