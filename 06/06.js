import VSHADER_SOURCE from '../res/01.vert'
import FSHADER_SOURCE from '../res/01.frag'
import Webgl from '../res/webgl'

let gl = new Webgl('canvas');

gl.bind_shader(VSHADER_SOURCE, FSHADER_SOURCE);
///////////////////////////////////////////////////////////////////////////////////////
var vertices = new Float32Array([
    0.1, 0.1, 0.1, 1,
    -0.1, 0.1, 0.1, 1,
    -0.1,-0.1, 0.1, 1,
    0.1, -0.1, 0.1, 1,
    0.1, -0.1, -0.1, 1,
    -0.1, -0.1, -0.1, 1,
    -0.1, 0.1, -0.1, 1,
    0.1, 0.1, -0.1, 1,

]);
gl.bind_array_buffer(vertices);
gl.set_attr('a_Position', 4);
///////////////////////////////////////////////////////////////////////////////////////

gl.clear();
gl.draw_array_triangles(8);
