// 20201507 정윤걸 과제제출용 인증 주석
import * as THREE from '../build/three.module.js';
import { OrbitControls } from '../examples/jsm/controls/OrbitControls.js';

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
        const points = [];
        for (let i = 0; i < 10; ++i) {
            points.push(new THREE.Vector3(Math.sin(i * 0.2) * 3 + 3, (i - 5) * .8));
        }
        
        const geometry = new THREE.LatheGeometry(points);
        
        const fillMaterial = new THREE.MeshPhongMaterial({color: 0x515151});
        const cube = new THREE.Mesh(geometry, fillMaterial);
        
        const lineMaterial = new THREE.LineBasicMaterial({color: 0xffff00});
        const line = new THREE.LineSegments(
            new THREE.WireframeGeometry(geometry), lineMaterial);
        
        const group = new THREE.Group();
        group.add(cube);
        group.add(line);
        
        this._scene.add(group);
        this._cube = group;
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
        time *= 0.001;
        this._cube.rotation.x = time;
        this._cube.rotation.y = time;
        this._controls.update();
    }
}

window.onload = function() {
    new App();
}