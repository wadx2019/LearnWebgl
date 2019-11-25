export default class Webgl{
    private readonly gl: WebGLRenderingContext;
    public get_gl():WebGLRenderingContext{
        return this.gl;
    }
    private readonly program:WebGLProgram;
    public get_program():WebGLProgram{
        return this.gl;
    }
    constructor(id: string) {
        var canvas = document.getElementById('canvas');
        this.gl = (<any>canvas).getContext('experimental-webgl');
        this.program = this.gl.createProgram();

    }

    public bind_shader(vertex: string, fragment: string):void {
        //编译顶点着色器
        var vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);

        this.gl.shaderSource(vertexShader, vertex);
        this.gl.compileShader(vertexShader);

        //编译片元着色器
        var fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

        this.gl.shaderSource(fragmentShader, fragment);
        this.gl.compileShader(fragmentShader);

        //创建程序对象

        //将着色器附加到程序对象
        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        console.log(this.gl.getShaderInfoLog(vertexShader));
        console.log(this.gl.getShaderInfoLog(fragmentShader));
        //链接程序对象和WebGl
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);
    }

    public bind_buffer(arr:BufferSource,target: GLenum){
        var buffer = this.gl.createBuffer();
        this.gl.bindBuffer(target, buffer);
        this.gl.bufferData(target, arr, this.gl.STATIC_DRAW);
    }
    public bind_array_buffer(arr:BufferSource){
        this.bind_buffer(arr,this.gl.ARRAY_BUFFER);
    }
    public bind_element_array_buffer(arr:BufferSource){
        this.bind_buffer(arr,this.gl.ELEMENT_ARRAY_BUFFER);
    }
    public set_attr(name:string,size:GLint,stride: GLsizei = 0, offset: GLintptr = 0){
        let a_Position = this.gl.getAttribLocation(this.program, name);
        this.gl.vertexAttribPointer(a_Position, size, this.gl.FLOAT, false, stride, offset);
        this.gl.enableVertexAttribArray(a_Position);
    }

    public set_clear_color(red: GLclampf, green: GLclampf, blue: GLclampf, alpha: GLclampf = 1.0){
        this.gl.clearColor(red, green, blue, alpha);
    }

    public clear(){
        this.get_gl().clear(this.gl.COLOR_BUFFER_BIT);
    }

    public draw_element_triangles(size:GLint,offset: GLintptr = 0){
        this.gl.drawElements(this.gl.TRIANGLES, size, this.gl.UNSIGNED_SHORT,offset);
    }

    public draw_array_triangles(size:GLint,offset: GLintptr = 0){
        this.gl.drawArrays(this.gl.TRIANGLE_FAN, offset,size);
    }

    public bind_texture(){
        this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.MIRRORED_REPEAT);
        this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.MIRRORED_REPEAT);
    }
    public set_uniform_location(location:WebGLUniformLocation,mata:Float32List){
        this.gl.uniformMatrix4fv(location, false, mata);
    }
    public get_uniform_location(name:string){
        return this.gl.getUniformLocation(this.program, name);
    }
}

