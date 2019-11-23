var canvas = document.getElementById('canvas');
var gl = canvas.getContext('experimental-webgl');

//清屏幕
gl.clearColor(0.0, 1.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
