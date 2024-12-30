export const fragmentShader = `
    #ifdef GL_ES
    precision highp float;
    #endif

    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform sampler2D image;

    varying vec2 v_texcoord;

    #define GRID_SIZE 80.0
    #define INFLUENCE_RADIUS 0.1
    #define BASE_SPEED 0.005
    #define MOUSE_SPEED 0.01

    vec2 getMovement(vec2 pos, vec2 mousePos) {
        // Calculate distance to mouse
        float dist = length(pos - mousePos);
        float mouseInfluence = smoothstep(INFLUENCE_RADIUS, 0.0, dist);
        
        // Create different movement patterns based on grid position
        float pattern = mod(floor(pos.x * GRID_SIZE) + floor(pos.y * GRID_SIZE), 4.0);
        
        vec2 movement;
        vec2 mouseDir = normalize(pos - mousePos + 0.0001);

        if (pattern < 1.0) {
            // Base movement: right, Mouse influence: follow mouse direction
            movement = mix(
                vec2(sin(u_time) * BASE_SPEED, 0.0),
                mouseDir * MOUSE_SPEED,
                mouseInfluence
            );
        } else if (pattern < 2.0) {
            // Base: circles, Mouse: spiral away from mouse
            float angle = u_time;
            vec2 circularMotion = vec2(cos(angle), sin(angle)) * BASE_SPEED;
            movement = mix(
                circularMotion,
                mouseDir * (sin(u_time * 2.0) * MOUSE_SPEED),
                mouseInfluence
            );
        } else if (pattern < 3.0) {
            // Base: up/down, Mouse: perpendicular to mouse direction
            vec2 perpDir = vec2(-mouseDir.y, mouseDir.x);
            movement = mix(
                vec2(0.0, sin(u_time) * BASE_SPEED),
                perpDir * MOUSE_SPEED,
                mouseInfluence
            );
        } else {
            // Base: diagonal, Mouse: opposite to mouse direction
            movement = mix(
                vec2(sin(u_time), cos(u_time)) * BASE_SPEED,
                -mouseDir * MOUSE_SPEED,
                mouseInfluence
            );
        }
        
        return movement;
    }

    void main(void) {
        vec2 uv = v_texcoord;
        
        // Normalize mouse coordinates
        vec2 mousePos = u_mouse.xy / u_resolution.xy;
        
        // Create grid
        vec2 gridPos = fract(uv * GRID_SIZE);
        vec2 cellId = floor(uv * GRID_SIZE) / GRID_SIZE;
        
        // Add movement based on cell position and mouse
        vec2 movement = getMovement(cellId, mousePos);
        
        // Sample the image with the offset
        vec2 finalUV = uv + movement;
        finalUV = fract(finalUV);
        
        vec4 color = texture2D(image, finalUV);
        
        // Add subtle grid lines
        float gridLine = step(0.95, gridPos.x) + step(0.95, gridPos.y);
        color = mix(color, vec4(0.0, 0.0, 0.0, 1.0), gridLine * 0.1);
        
        gl_FragColor = color;
    }
`;