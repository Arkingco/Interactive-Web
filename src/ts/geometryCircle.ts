import * as THREE from "three";
import {
  Font,
  FontLoader,
  OrbitControls,
  TextGeometry,
} from "three/examples/jsm/Addons.js";

export default class GeometryCircle {
  private _renderer: THREE.WebGL1Renderer;
  private _camera: THREE.PerspectiveCamera;
  private _divContainer: HTMLElement;
  private _scene: THREE.Scene;
  private _cube: THREE.Mesh;
  private _font: Font | null | undefined;
  private _beforeStrLength: number = 16; // Added private variable _before_str_length with initial value 10
  //   private _renderer: THREE.WebGL1Renderer;
  //   private _light: THREE.DirectionalLight;

  // 밑줄이 들어간 변수는 클래스 안에서만 사용하는 함수라고 약속함
  constructor(divContainer: Element, str: string) {
    this._divContainer = divContainer as HTMLElement;
    this._camera = null as unknown as THREE.PerspectiveCamera;
    this._cube = null as unknown as THREE.Mesh;

    const renderer = new THREE.WebGL1Renderer({ antialias: true });
    this._renderer = renderer;
    renderer.setSize(500, 350);
    // renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    this._scene = scene;

    this._setupCamera();
    this._setupLight();
    this._setupModal(str);
    this._setupControlls();

    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  _setupControlls() {
    // 해당 입력은 카메라와 domElment를 받아야함
    new OrbitControls(this._camera, this._renderer.domElement);
  }

  _setupCamera() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 50;
    this._camera = camera;
  }

  _setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(1, 2, 4);
    this._scene.add(light);
  }

  _setupModal(str: string) {
    // 키보드 키캡과 거의 동일하게 생김
    // const geometry = new THREE.CylinderGeometry(0.3, 0.5, 0.5, 4);
    const fontLoader = new FontLoader();
    async function loadFont(that: any) {
      const url = "/gentilis_bold.typeface.json";
      that._font = await new Promise((resolve, reject) => {
        fontLoader.load(url, resolve, undefined, reject);
      });
    }
    loadFont(this);
  }
  private resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }

  render(time: number) {
    // Render logic here, using _camera
    this._renderer.render(this._scene, this._camera);
    requestAnimationFrame(this.render.bind(this));
  }

  updateText(str: string) {
    this._scene.remove(this._cube);
    const geometry = new TextGeometry(str, {
      font: this._font as unknown as Font,
      size: 10,
      height: 1,
      curveSegments: 2,
      bevelEnabled: true,
      bevelThickness: 0.7,
      bevelSize: 0.5,
      bevelOffset: 0,
      bevelSegments: 2,
    });

    const fillMataterial = new THREE.MeshPhongMaterial({ color: 0x00ffff });
    const cube = new THREE.Mesh(geometry, fillMataterial);
    this._cube = cube;

    // 카메라 뷰의 종횡비를 계산합니다
    const aspectRatio = this._camera.aspect;
    // 계산을 위해 카메라의 시야각을 라디안으로 변환합니다
    const fovInRadians = (this._camera.fov * Math.PI) / 180;
    // 카메라와의 거리를 고려하여 화면의 높이를 계산합니다
    const height = 2 * Math.tan(fovInRadians / 2) * this._camera.position.z; // 카메라와의 거리를 고려한 화면 높이

    // 높이와 종횡비를 기반으로 화면의 너비를 계산합니다
    const width = height * aspectRatio; // 화면 너비

    // 텍스트를 화면의 왼쪽 가장자리에 위치하도록 설정합니다
    cube.position.x = -width / 3; // 화면 너비의 절반만큼 왼쪽으로 이동
    cube.position.y = 0; // 필요한 경우 y 위치 조정
    cube.position.z = 0; // 필요한 경우 z 위치 조정

    if (str.length > this._beforeStrLength * 1.3) {
      this._camera.position.z = this._camera.position.z + 10;
      this._beforeStrLength = str.length;
    }

    this._scene.add(cube);
  }
}
