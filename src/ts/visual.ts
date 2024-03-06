import * as THREE from "three";

export default class Graphic {
  private _renderer: THREE.WebGL1Renderer;
  private _camera: THREE.PerspectiveCamera;
  private _divContainer: HTMLElement;
  private _scene: THREE.Scene;
  private _cube: THREE.Mesh;

  //   private _renderer: THREE.WebGL1Renderer;
  //   private _light: THREE.DirectionalLight;

  // 밑줄이 들어간 변수는 클래스 안에서만 사용하는 함수라고 약속함
  constructor(divContainer: Element) {
    this._divContainer = divContainer as HTMLElement;
    this._camera = null as unknown as THREE.PerspectiveCamera;
    this._cube = null as unknown as THREE.Mesh;

    const renderer = new THREE.WebGL1Renderer({ antialias: true });
    this._renderer = renderer;
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer?.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    this._scene = scene;

    console.log(divContainer?.clientHeight);
    this._setupCamera();
    this._setupLight();
    this._setupModal();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  _setupCamera() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 2;
    this._camera = camera;
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this._scene.add(light);
  }

  _setupModal() {
    const geometry = new THREE.CircleGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });

    const cube = new THREE.Mesh(geometry, material);
    this._scene.add(cube);
    this._cube = cube;
  }
  private resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
    // Resize logic here, potentially involving _camera
  }

  render(time: number) {
    // Render logic here, using _camera
    this._renderer.render(this._scene, this._camera);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  update(time: number) {
    time *= 0.001;
    this._cube.rotation.x = time;
    this._cube.rotation.y = time;
  }
}
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
//   const renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.getElementById("container")?.appendChild(renderer.domElement);

//   const geometry = new THREE.BoxGeometry();
//   const material = new THREE.MeshBasicMaterial({ color: 0x0011111 });
//   const cube = new THREE.Mesh(geometry, material);
//   scene.add(cube);

//   camera.position.z = 5;

//   const animate = function () {
//     requestAnimationFrame(animate);

//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;

//     renderer.render(scene, camera);
//   };

//   animate();
