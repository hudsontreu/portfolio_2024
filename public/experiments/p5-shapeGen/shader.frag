#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 vp = vec3(3.0);
vec3 vpdir = vec3(-3.0);

vec4 getc(float z) {
    float dpc = max(min(z, 1.0), -1.0) / 2.0 + 0.5;
    return vec4(vec3(1.0 - dpc - 0.3), 1.0);
}

float getdz(vec2 inp) {
    float x = inp.x;
    float y = inp.y;
    return -cos(y - x) - sin(x + y);
}

float getz(vec2 inp) {
    float x = inp.x;
    float y = inp.y;
    return -sin(y - x) + cos(x + y);
}

float gettdz(float t, vec2 dir) {
    return vpdir.z - getdz(dir.xy * t);
}

float gettz(float t, vec2 dir) {
    return vpdir.z * t + vp.z - getz(dir.xy * t);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = 0.03 * (fragCoord.xy - (u_resolution.xy * 0.5));

    vpdir = vec3(0.0) - vp - vec3(normalize(vpdir.xy) * uv.x, uv.y);

    vec2 dir = normalize(vpdir.xy + uv + u_time / 100.0);

    // Newton's method to find zero
    float pv = 0.0;
    float cv = 0.0;
    for (int i = 0; i < 20; i++) {
        pv = cv;
        cv = cv - gettz(cv, dir) / gettdz(cv, dir);
    }

    float z = getz(dir * pv);
    fragColor = getc(0.5 * z);
}

void main() {
    vec4 fragColor;
    vec2 fragCoord = gl_FragCoord.xy;
    mainImage(fragColor, fragCoord);
    gl_FragColor = fragColor;
}