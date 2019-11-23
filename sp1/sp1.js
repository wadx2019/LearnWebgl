import VSHADER_SOURCE from '../res/01.vert'
import FSHADER_SOURCE from '../res/01.frag'
import Webgl from '../res/webgl'

let gl = new Webgl('canvas');

gl.bind_shader(VSHADER_SOURCE,FSHADER_SOURCE);
//复制顶点数组到缓冲中供WebGL使用
var vertices = new Float32Array([
    -0.1, 0.1, 0, 1,
    0.1, 0.1, 0, 1,
    0.1, -0.1, 0, 1,
    -0.1, -0.1, 0, 1,
    0.1, -0.3, 0, 1,
    0.3, -0.3, 0, 1,
]);
gl.bind_array_buffer(vertices);

//设置绘制顶点的顺序
var indices = new Uint16Array([
    0,1,3,
    1,5,4
]);
gl.bind_element_array_buffer(indices);

//设置顶点属性指针
gl.set_attr('a_Position',4);

//清屏幕
gl.clear();

//画对象
gl.draw_element_triangles(6);
