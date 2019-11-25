import VSHADER_SOURCE from '../res/02.vert'
import FSHADER_SOURCE from '../res/02.frag'
import Webgl from '../res/webgl'
import {Matrix4} from '@math.gl/core';

let gl = new Webgl('canvas');

gl.bind_shader(VSHADER_SOURCE, FSHADER_SOURCE);
///////////////////////////////////////////////////////////////////////////////////////
var vertices = new Float32Array([
    -0.1, 0.1, 0, 1,
    0.1, 0.1, 0, 1,
    0.1, -0.1, 0, 1,
    -0.1, -0.1, 0, 1,
]);
gl.bind_array_buffer(vertices);
///////////////////////////////////////////////////////////////////////////////////////
var indices = new Uint16Array([
    0, 1, 3,
    1, 2, 3
]);
gl.bind_element_array_buffer(indices);
///////////////////////////////////////////////////////////////////////////////////////
gl.set_attr('a_Position', 4);

var mata = new Matrix4();
let i = gl.get_uniform_location('transform');
gl.set_uniform_location(i, mata.toFloat32Array());
///////////////////////////////////////////////////////////////////////////////////////

gl.clear();
gl.draw_element_triangles(6);

///////////////////////////////////////////////////////////////////////////////////////

function update() {
    gl.set_uniform_location(i, mata.toFloat32Array());
    gl.draw_element_triangles(6);
}

setInterval(update, 50);

///////////////////////////////////////////////////////////////////////////////////////

document.getElementById("big").addEventListener('click', () => {
    mata.scale(1.1);
}, false);

document.getElementById("small").addEventListener('click', () => {
    mata.scale(0.91);
}, false);

document.getElementById("up").addEventListener('click', () => {
    mata.translate([0, 0.1, 0]);
}, false);

document.getElementById("down").addEventListener('click', () => {
    mata.translate([0, -0.1, 0]);
}, false);

document.getElementById("left").addEventListener('click', () => {
    mata.translate([-0.1, 0, 0]);
}, false);

document.getElementById("right").addEventListener('click', () => {
    mata.translate([0.1, 0, 0]);
}, false);

document.getElementById("rotate_right").addEventListener('click', () => {
    mata.rotateZ(5);
}, false);

document.getElementById("rotate_left").addEventListener('click', () => {
    mata.rotateZ(-5);
}, false);
