'use client';

import { useEffect, useRef } from 'react';
import styles from './styles.module.css';

export default function HeroArt2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Vertex shader program
    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;
      varying vec2 vTextureCoord;
      void main() {
        gl_Position = aVertexPosition;
        vTextureCoord = aTextureCoord;
      }
    `;

    // Fragment shader program (Bad TV effect)
    const fsSource = `
      precision mediump float;
      varying vec2 vTextureCoord;
      uniform float time;
      uniform vec2 resolution;

      float rand(vec2 co) {
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
      }

      void main() {
        vec2 p = vTextureCoord;
        float ty = time * 2.0;
        float yt = p.y - ty;
        
        // Create vertical distortion
        float offset = 0.1 * sin(2.0 * p.y + time * 2.0);
        p.x += offset;
        
        // Add some noise
        float noise = rand(vec2(time * 0.00001, gl_FragCoord.y * 0.001)) * 0.1;
        p.x += noise;
        
        // Create scan lines
        float scanline = sin(gl_FragCoord.y * 0.1 + time * 2.0) * 0.1;
        
        // Create color distortion
        vec3 col;
        col.r = rand(vec2(p.x * 0.999, p.y));
        col.g = rand(vec2(p.x, p.y));
        col.b = rand(vec2(p.x * 1.001, p.y));
        
        // Mix everything together
        vec3 finalColor = col + vec3(scanline);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Initialize shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);

    const shaderProgram = gl.createProgram()!;
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // Set up buffers
    const positions = [
      1.0,  1.0,
      -1.0,  1.0,
      1.0, -1.0,
      -1.0, -1.0,
    ];

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const texCoords = [
      1.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      0.0,  0.0,
    ];

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW);

    // Animation loop
    let startTime = Date.now();
    function render() {
      if (!gl || !canvasRef.current) return;

      const currentTime = (Date.now() - startTime) * 0.001;
      
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(shaderProgram);

      const timeLocation = gl.getUniformLocation(shaderProgram, "time");
      gl.uniform1f(timeLocation, currentTime);

      const resolutionLocation = gl.getUniformLocation(shaderProgram, "resolution");
      gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

      const positionLocation = gl.getAttribLocation(shaderProgram, "aVertexPosition");
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const texCoordLocation = gl.getAttribLocation(shaderProgram, "aTextureCoord");
      gl.enableVertexAttribArray(texCoordLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      requestAnimationFrame(render);
    }

    // Handle resize
    function handleResize() {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}