attribute vec4 a_Position;
uniform mat4 transform;


void main() {
    gl_Position = transform*a_Position;
}
