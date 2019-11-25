import VSHADER_SOURCE from '../res/01.vert'
import FSHADER_SOURCE from '../res/01.frag'
import Webgl from '../res/webgl'

let gl = new Webgl('canvas');

gl.bind_shader(VSHADER_SOURCE,FSHADER_SOURCE);
///////////////////////////////////////////////////////////////////////////////////////
var vertices = new Float32Array([
    -0.1, 0.1, 0, 1,
    0.1, 0.1, 0, 1,
    0.1, -0.1, 0, 1,
    -0.1, -0.1, 0, 1,
    0.1, -0.3, 0, 1,
    0.3, -0.3, 0, 1,
]);
gl.bind_array_buffer(vertices);
///////////////////////////////////////////////////////////////////////////////////////
var indices = new Uint16Array([
    0,1,3,
    1,5,4
]);
gl.bind_element_array_buffer(indices);
///////////////////////////////////////////////////////////////////////////////////////
var texCoords = new Float32Array([
    0,0,
    1,0,
    0.5,1
]);
var borderColor = new Fl
gl.set_attr('a_Position',4);
gl.clear();
gl.draw_element_triangles(6);
