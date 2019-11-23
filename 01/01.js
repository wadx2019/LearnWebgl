import VSHADER_SOURCE from './res/01.vert'
import FSHADER_SOURCE from './res/01.frag'

var canvas = document.getElementById('canvas');
var gl = canvas.getContext('experimental-webgl');

//编译顶点着色器
var vertexShader = gl.createShader(gl.VERTEX_SHADER);

gl.shaderSource(vertexShader, VSHADER_SOURCE);
gl.compileShader(vertexShader);

//编译片元着色器
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(fragmentShader, FSHADER_SOURCE);
gl.compileShader(fragmentShader);

//创建程序对象
var program = gl.createProgram();

//将着色器附加到程序对象
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

//链接程序对象和WebGl
gl.linkProgram(program);
gl.useProgram(program);

//复制顶点数组到缓冲中供WebGL使用
var vertices = new Float32Array([
    -0.11, 0.11, 0, 1,
    0.11, 0.11, 0, 1,
    -0.11, -0.11, 0, 1,
]);
var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

//设置顶点属性指针
var a_Position = gl.getAttribLocation(program, 'a_Position');
gl.vertexAttribPointer(a_Position, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(a_Position);

//清屏幕
gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

//画对象
gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
