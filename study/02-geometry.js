// 20201507 정윤걸 과제제출용 인증 주석
import * as THREE from '../build/three.module.js';
import { OrbitControls } from '../examples/jsm/controls/OrbitControls.js';
import { FontLoader } from '../examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from '../examples/jsm/geometries/TextGeometry.js';

class App {
    constructor() {
        const divContainer = document.querySelector('#webgl-container');
        this.divContainer = divContainer;

        let renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();
        
        window.onresize = this.resize.bind(this);
        this.resize();
    
        requestAnimationFrame(this.render.bind(this));
    }

    _setupCamera() {
        const width = this.divContainer.clientWidth;
        const height = this.divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 15;
        this._camera = camera;
    }

    _setupLight() {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }

    _setupModel() {
        const fontLoader = new FontLoader();
        
        async function loadFont(that) {
            const url = "../examples/fonts/helvetiker_regular.typeface.json";
            const font = await new Promise((resolve, reject) => {
                fontLoader.load(url, resolve, undefined, reject);
            });
            
            const geometry = new TextGeometry("JYG", {
                font: font,
                size: 5,
                height: 0,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.7,
                bevelSize: .7,
                bevelSegments: 2
            });
            
            const fillMaterial = new THREE.MeshPhongMaterial({color: 0x515151});
            const cube = new THREE.Mesh(geometry, fillMaterial);
            
            const lineMaterial = new THREE.LineBasicMaterial({color: 0xffff00});
            const line = new THREE.LineSegments(
                new THREE.WireframeGeometry(geometry), lineMaterial);
            
            const group = new THREE.Group();
            group.add(cube);
            group.add(line);
            
            that._scene.add(group);
        };
        
        loadFont(this);
    }

    _setupControls() {
        this._controls = new OrbitControls(this._camera, this._renderer.domElement);
        this._controls.enableDamping = true;
    }

    resize() {
        const width = this.divContainer.clientWidth;
        const height = this.divContainer.clientHeight;
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(width, height);
    }

    render(time) {
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }

    update(time) {
        this._controls.update();
    }
}

window.onload = function() {
    new App();
}