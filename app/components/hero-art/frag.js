export const fragmentShader = `
    #ifdef GL_ES
    precision highp float;
    #endif

    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform sampler2D displacement;

    varying vec4 v_position;
    varying vec3 v_normal;
    varying vec2 v_texcoord;

    void main(void)
    {
        vec2 uv = v_texcoord;
        uv.y = 1.0 - uv.y;
        
        vec2 point = fract(uv*0.1 + sin(-u_time*0.1));
        
        vec4 dispColor = texture2D(displacement, point);
        
        vec4 tl = vec4(0.15, 1.00, 0.70, 1.0);
        vec4 tr = vec4(1.00, 0.70, 0.15, 1.0); 
        vec4 bl = vec4(1.00, 0.45, 1.00, 1.0);
        vec4 br = vec4(1.0, 0.91, 0.00, 1.0);
        
        float dispX = mix(-0.5, 0.5, dispColor.r);
        float dispY = mix(-0.5, 0.5, dispColor.r);
        
        vec4 color = mix(
                mix(tl, tr, uv.x + dispX),
                mix(bl, br, uv.x + dispX),
                uv.y
            );
        
        gl_FragColor = color;
    }
`;
