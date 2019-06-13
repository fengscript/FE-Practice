Babylon

# Base concepts

- 三维成像原理
- UV贴图
- 着色器
- 材质

## 1 light
- PointLight 点光源 世界空间中的唯一点定义的光，光在每个方向发射。点光源的一个很好的例子是灯泡
- SpotLight 聚光灯 锥形光束
- DirectionalLight 光从指定方向的任何地方发出，并且具有无限范围。定向光的一个例子是当距离行星被来自太阳的明显平行的光线照亮
- HemisphericLight 半球形光


## 2 camera

- ArcRotateCamera 弧形环绕相机 始终指向给定的目标位置，并且可以围绕该目标旋转，目标作为旋转中心
- FreeCamera 自由相机
- TargetCamera
- FollowCamera

## 3 material
material允许您在 mesh 上覆盖颜色和纹理，并且需要光线才能看到。
一种material可用于覆盖任意数量的网格

受以下光线影响：
- Diffuse - 漫反射 the basic color or texture of the material as viewed under a light;
- Specular - 高光 the highlight given to the material by a light;
- Emissive - 自发光 the color or texture of the material as if self lit;
- Ambient - 环境光 the color or texture of the material lit by the environmental background lighting

## PBR
PBR渲染技术旨在模拟真实生活照明


## 4 3D base

### 着色器
着色器是由 GPU 处理的程序，通过操纵数据以产生单个像素来产生屏幕图像。GPU通过并行处理进行优化，以极快的速度处理这些数千个操作

- Vertex Shader主要负责顶点的几何关系等的运算
- Fragement Shader / Pixel Shader 主要负责片源颜色等的计算

渲染流程：顶点数据(Vertices) > 顶点着色器(Vertex Shader) > 图元装配(Assembly) > 几何着色器(Geometry Shader) > 光栅化(Rasterization) > 片元着色器(Fragment Shader) > 逐片元处理(Per-Fragment Operations) > 帧缓冲(FrameBuffer)。再经过双缓冲的交换(SwapBuffer)，渲染内容就显示到了屏幕上

### UV 坐标
UV坐标是指所有的图象文件都是二维的一个平面。水平方向是U，垂直方向是V，通过这个平面的，二维的UV坐标系。我们可以定位图象上的任意一个象素