// Three.js Scene Setup and Animation
class ThreeScene {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.options = {
            backgroundColor: 0x000000,
            cameraPosition: { x: 0, y: 0, z: 5 },
            ...options
        };
        
        this.init();
        this.createObjects();
        this.animate();
        this.handleResize();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.options.backgroundColor);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.canvas.clientWidth / this.canvas.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(
            this.options.cameraPosition.x,
            this.options.cameraPosition.y,
            this.options.cameraPosition.z
        );

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0xd4a574, 0.3);

        // Lighting
        this.setupLighting();

        // Animation properties
        this.clock = new THREE.Clock();
        this.mouse = new THREE.Vector2();
        this.targetRotation = new THREE.Vector2();
        this.currentRotation = new THREE.Vector2();

        // Mouse interaction
        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            this.onMouseMove(event);
        });

        // Mouse click interaction
        this.canvas.addEventListener('click', (event) => {
            this.onMouseClick(event);
        });

        // Double click for special effects
        this.canvas.addEventListener('dblclick', (event) => {
            this.onDoubleClick(event);
        });

        this.canvas.style.touchAction = 'pan-y'; // allow vertical scrolling on touch devices
        this.canvas.addEventListener('wheel', (event) => {
            this.onMouseScroll(event);
        }, { passive: true });

        // Raycaster for object detection
        this.raycaster = new THREE.Raycaster();
        this.hoveredObject = null;
        this.scrollOffset = 0;
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Point lights for color
        const light1 = new THREE.PointLight(0x667eea, 0.8, 100);
        light1.position.set(10, 10, 10);
        this.scene.add(light1);

        const light2 = new THREE.PointLight(0x764ba2, 0.6, 100);
        light2.position.set(-10, -10, -5);
        this.scene.add(light2);
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        });
    }

    // Base mouse interaction methods (to be overridden by subclasses)
    onMouseMove(event) {
        // Update raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        if (this.objects && this.objects.length > 0) {
            const intersects = this.raycaster.intersectObjects(this.objects);
            
            // Reset previous hovered object
            if (this.hoveredObject) {
                this.hoveredObject.material.emissive.setHex(0x000000);
                this.hoveredObject = null;
            }
            
            // Set new hovered object
            if (intersects.length > 0) {
                this.hoveredObject = intersects[0].object;
                this.hoveredObject.material.emissive.setHex(0x333333);
                this.canvas.style.cursor = 'pointer';
            } else {
                this.canvas.style.cursor = 'default';
            }
        }
    }

    onMouseClick(event) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        if (this.objects && this.objects.length > 0) {
            const intersects = this.raycaster.intersectObjects(this.objects);
            
            if (intersects.length > 0) {
                this.onObjectClick(intersects[0].object);
            }
        }
    }

    onMouseScroll(event) {
        const delta = event.deltaY;
        this.scrollOffset += delta * 0.001;
        this.scrollOffset = Math.max(-2, Math.min(2, this.scrollOffset));
    }

    onObjectClick(object) {
        // Base implementation - animate clicked object
        const originalScale = object.scale.clone();
        object.scale.multiplyScalar(1.2);
        
        setTimeout(() => {
            object.scale.copy(originalScale);
        }, 300);
    }

    onDoubleClick(event) {
        // Reset all animations and positions
        this.resetScene();
    }

    resetScene() {
        // Base implementation - can be overridden
        this.scrollOffset = 0;
        this.camera.position.z = this.options.cameraPosition.z;
    }
}

// Hero Scene
class HeroScene extends ThreeScene {
    createObjects() {
        this.objects = [];

        // Create floating geometric shapes
        this.createFloatingShapes();
        
        // Create particle system
        this.createParticles();
        
        // Create main centerpiece
        this.createCenterpiece();
        
        // Setup mouse interactions
        this.setupMouseEvents();
    }

    setupMouseEvents() {
        this.canvas.addEventListener('click', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            // Create sparkle explosion at click position
            this.createSparkleExplosion(new THREE.Vector3(x * 8, y * 5, 0));
        });

        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            // Add magnetic effect to floating shapes
            this.objects.forEach(shape => {
                const distance = shape.position.distanceTo(new THREE.Vector3(x * 8, y * 5, 0));
                if (distance < 3) {
                    shape.material.emissive.setRGB(0.3, 0.2, 0.1);
                    // Attract shape slightly toward mouse
                    const direction = new THREE.Vector3(x * 8, y * 5, 0).sub(shape.position).normalize();
                    shape.userData.attractionForce = direction.multiplyScalar(0.01);
                } else {
                    shape.material.emissive.setRGB(0, 0, 0);
                    shape.userData.attractionForce = new THREE.Vector3(0, 0, 0);
                }
            });
        });
    }

    createFloatingShapes() {
        const geometries = [
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.SphereGeometry(0.3, 32, 32),
            new THREE.ConeGeometry(0.3, 0.6, 8),
            new THREE.OctahedronGeometry(0.4),
            new THREE.TetrahedronGeometry(0.4)
        ];

        const materials = [
            new THREE.MeshPhongMaterial({ 
                color: 0x667eea,
                transparent: true,
                opacity: 0.8,
                shininess: 100
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0x764ba2,
                transparent: true,
                opacity: 0.8,
                shininess: 100
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0x46a0fc,
                transparent: true,
                opacity: 0.8,
                shininess: 100
            })
        ];

        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);

            // Random position
            mesh.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 6
            );

            // Random rotation
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            // Animation properties
            mesh.userData = {
                originalPosition: mesh.position.clone(),
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.02 + 0.01,
                floatRange: Math.random() * 0.5 + 0.2
            };

            this.objects.push(mesh);
            this.scene.add(mesh);
        }
    }

    createParticles() {
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const color1 = new THREE.Color(0x667eea);
        const color2 = new THREE.Color(0x764ba2);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

            const mixedColor = color1.clone().lerp(color2, Math.random());
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;

            sizes[i] = Math.random() * 0.1 + 0.05;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true
        });

        this.particles = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particles);

        // Store original positions for effects
        this.originalParticlePositions = positions.slice();
        this.particleVelocities = new Float32Array(particleCount * 3).fill(0);
        this.explosionActive = false;
    }

    createCenterpiece() {
        // Create a complex geometric structure
        const group = new THREE.Group();

        // Main torus
        const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
        const torusMaterial = new THREE.MeshPhongMaterial({
            color: 0x667eea,
            transparent: true,
            opacity: 0.9,
            shininess: 100
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        group.add(torus);

        // Orbiting spheres
        for (let i = 0; i < 8; i++) {
            const sphereGeometry = new THREE.SphereGeometry(0.1, 16, 16);
            const sphereMaterial = new THREE.MeshPhongMaterial({
                color: 0x764ba2,
                emissive: 0x221122,
                shininess: 100
            });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            
            const angle = (i / 8) * Math.PI * 2;
            sphere.position.set(
                Math.cos(angle) * 2,
                Math.sin(angle) * 0.5,
                Math.sin(angle) * 2
            );
            
            sphere.userData = { orbitAngle: angle, orbitRadius: 2 };
            group.add(sphere);
        }

        group.position.x = 1;
        this.centerpiece = group;
        this.scene.add(group);
    }

    animate() {
        const elapsedTime = this.clock.getElapsedTime();

        // Animate floating shapes
        this.objects.forEach(object => {
            // Rotation
            object.rotation.x += object.userData.rotationSpeed.x;
            object.rotation.y += object.userData.rotationSpeed.y;
            object.rotation.z += object.userData.rotationSpeed.z;

            // Floating motion
            object.position.y = object.userData.originalPosition.y + 
                Math.sin(elapsedTime * object.userData.floatSpeed) * object.userData.floatRange;
        });

        // Animate particles
        if (this.particles) {
            this.particles.rotation.y = elapsedTime * 0.05;
            this.particles.rotation.x = elapsedTime * 0.02;
        }

        // Animate centerpiece
        if (this.centerpiece) {
            this.centerpiece.rotation.y = elapsedTime * 0.3;
            this.centerpiece.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1;

            // Animate orbiting spheres
            this.centerpiece.children.forEach((child, index) => {
                if (child.userData.orbitAngle !== undefined) {
                    const angle = child.userData.orbitAngle + elapsedTime * 0.5;
                    child.position.set(
                        Math.cos(angle) * child.userData.orbitRadius,
                        Math.sin(angle * 2) * 0.5,
                        Math.sin(angle) * child.userData.orbitRadius
                    );
                }
            });
        }

        // Update particle explosion effects
        if (this.explosionActive && this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            const velocities = this.particleVelocities;
            const originalPositions = this.originalParticlePositions;
            
            for (let i = 0; i < positions.length; i += 3) {
                // Apply velocity
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];
                
                // Apply damping
                velocities[i] *= 0.98;
                velocities[i + 1] *= 0.98;
                velocities[i + 2] *= 0.98;
                
                // Gradually return to original position
                positions[i] += (originalPositions[i] - positions[i]) * 0.01;
                positions[i + 1] += (originalPositions[i + 1] - positions[i + 1]) * 0.01;
                positions[i + 2] += (originalPositions[i + 2] - positions[i + 2]) * 0.01;
            }
            
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        // Mouse interaction
        this.targetRotation.x = this.mouse.y * 0.1;
        this.targetRotation.y = this.mouse.x * 0.1;
        
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;
        
        this.scene.rotation.x = this.currentRotation.x;
        this.scene.rotation.y = this.currentRotation.y;

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }

    // Enhanced mouse interactions for HeroScene
    onObjectClick(object) {
        // Create explosion effect
        this.createExplosion(object.position);
        
        // Animate clicked object
        const originalScale = object.scale.clone();
        object.scale.multiplyScalar(0.8);
        
        // Color pulse effect
        const originalColor = object.material.color.clone();
        object.material.color.setHex(0xffffff);
        
        setTimeout(() => {
            object.scale.copy(originalScale);
            object.material.color.copy(originalColor);
        }, 500);
    }

    onMouseMove(event) {
        super.onMouseMove(event);
        
        // Create ripple effect on hover
        if (this.hoveredObject && this.hoveredObject !== this.lastHoveredObject) {
            this.createRipple(this.hoveredObject.position);
            this.lastHoveredObject = this.hoveredObject;
        }
    }

    onMouseScroll(event) {
        super.onMouseScroll(event);
        
        // Zoom camera based on scroll
        const targetZ = 5 + this.scrollOffset * 3;
        this.camera.position.z += (targetZ - this.camera.position.z) * 0.1;
        
        // Adjust particle density
        if (this.particles) {
            const baseOpacity = 0.6;
            const newOpacity = Math.max(0.2, baseOpacity + this.scrollOffset * 0.3);
            this.particles.material.opacity = newOpacity;
        }
    }

    createExplosion(position) {
        if (!this.particles || this.explosionActive) return;
        
        this.explosionActive = true;
        const positions = this.particles.geometry.attributes.position.array;
        const velocities = this.particleVelocities;
        
        // Add explosion force to nearby particles
        for (let i = 0; i < positions.length; i += 3) {
            const distance = Math.sqrt(
                Math.pow(positions[i] - position.x, 2) +
                Math.pow(positions[i + 1] - position.y, 2) +
                Math.pow(positions[i + 2] - position.z, 2)
            );
            
            if (distance < 5) {
                const force = Math.max(0, 1 - distance / 5) * 0.3;
                const direction = new THREE.Vector3(
                    positions[i] - position.x,
                    positions[i + 1] - position.y,
                    positions[i + 2] - position.z
                ).normalize();
                
                velocities[i] += direction.x * force;
                velocities[i + 1] += direction.y * force;
                velocities[i + 2] += direction.z * force;
            }
        }
        
        // Reset explosion after delay
        setTimeout(() => {
            this.explosionActive = false;
            velocities.fill(0);
        }, 2000);
    }

    createRipple(position) {
        // Create ripple ring effect
        const ringGeometry = new THREE.RingGeometry(0.1, 0.2, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x667eea,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.copy(position);
        ring.lookAt(this.camera.position);
        this.scene.add(ring);
        
        // Animate ripple
        const startTime = Date.now();
        const animateRipple = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / 1000;
            
            if (progress < 1) {
                ring.scale.setScalar(1 + progress * 5);
                ring.material.opacity = 0.8 * (1 - progress);
                requestAnimationFrame(animateRipple);
            } else {
                this.scene.remove(ring);
            }
        };
        animateRipple();
    }

    onDoubleClick(event) {
        // Burst effect - explode all objects
        this.objects.forEach((object, index) => {
            setTimeout(() => {
                this.createExplosion(object.position);
                object.rotation.x += Math.random() * Math.PI;
                object.rotation.y += Math.random() * Math.PI;
            }, index * 100);
        });
    }

    resetScene() {
        super.resetScene();
        // Reset particles
        if (this.particles && this.originalParticlePositions) {
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i++) {
                positions[i] = this.originalParticlePositions[i];
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
            this.explosionActive = false;
            this.particleVelocities.fill(0);
        }
    }
}

// About Scene
class AboutScene extends ThreeScene {
    createObjects() {
        this.createMorphingShape();
        this.createDataVisualization();
        this.setupMouseEvents();
    }

    setupMouseEvents() {
        this.canvas.addEventListener('click', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            // Create data burst explosion
            this.createDataBurst(new THREE.Vector3(x * 6, y * 3, 0));
        });

        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            // Add hover effects to bars
            if (this.dataBars) {
                this.dataBars.forEach(bar => {
                    const distance = bar.position.distanceTo(new THREE.Vector3(x * 6, y * 3, 0));
                    if (distance < 2) {
                        bar.material.emissive.setRGB(0.2, 0.15, 0.1);
                        bar.userData.targetHeight = bar.userData.originalHeight * 1.5;
                    } else {
                        bar.material.emissive.setRGB(0, 0, 0);
                        bar.userData.targetHeight = bar.userData.originalHeight;
                    }
                });
            }
        });
    }

    createMorphingShape() {
        // Create a morphing geometric shape
        const geometry1 = new THREE.IcosahedronGeometry(1, 0);
        const geometry2 = new THREE.OctahedronGeometry(1);
        
        const material = new THREE.MeshPhongMaterial({
            color: 0x667eea,
            transparent: true,
            opacity: 0.8,
            wireframe: false,
            shininess: 100
        });

        this.morphShape = new THREE.Mesh(geometry1, material);
        this.morphShape.position.set(0, 0, 0);
        
        // Store both geometries for morphing
        this.morphShape.userData = {
            geometry1: geometry1,
            geometry2: geometry2,
            morphProgress: 0
        };
        
        this.scene.add(this.morphShape);
    }

    createDataVisualization() {
        // Create animated data bars
        this.dataBars = [];
        const barCount = 12;
        
        for (let i = 0; i < barCount; i++) {
            const height = Math.random() * 2 + 0.5;
            const geometry = new THREE.BoxGeometry(0.1, height, 0.1);
            const material = new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(i / barCount, 0.7, 0.6),
                transparent: true,
                opacity: 0.8
            });
            
            const bar = new THREE.Mesh(geometry, material);
            const angle = (i / barCount) * Math.PI * 2;
            bar.position.set(
                Math.cos(angle) * 2,
                0,
                Math.sin(angle) * 2
            );
            
            bar.userData = {
                originalHeight: height,
                targetHeight: height,
                currentHeight: height,
                updateTime: Math.random() * 1000
            };
            
            this.dataBars.push(bar);
            this.scene.add(bar);
        }
    }

    animate() {
        const elapsedTime = this.clock.getElapsedTime();

        // Animate morphing shape
        if (this.morphShape) {
            const scrollInfluence = this.morphShape.userData.scrollInfluence || 0;
            const rotationSpeed = 0.2 + scrollInfluence * 0.5;
            
            this.morphShape.rotation.x = elapsedTime * rotationSpeed;
            this.morphShape.rotation.y = elapsedTime * (0.3 + scrollInfluence * 0.3);
            
            // Enhanced scaling with scroll influence
            const baseScale = 1 + Math.sin(elapsedTime * 0.5) * 0.2;
            const scrollScale = 1 + scrollInfluence * 0.3;
            this.morphShape.scale.set(baseScale * scrollScale, baseScale * scrollScale, baseScale * scrollScale);
            
            // Color shift based on interaction
            const hue = (elapsedTime * 0.1 + scrollInfluence * 0.5) % 1;
            this.morphShape.material.color.setHSL(hue, 0.7, 0.6);
        }

        // Animate data bars
        this.dataBars.forEach((bar, index) => {
            // Update height periodically
            if (elapsedTime * 1000 - bar.userData.updateTime > 2000) {
                bar.userData.targetHeight = Math.random() * 2 + 0.5;
                bar.userData.updateTime = elapsedTime * 1000;
            }
            
            // Smooth height transition
            bar.userData.currentHeight += (bar.userData.targetHeight - bar.userData.currentHeight) * 0.02;
            bar.scale.y = bar.userData.currentHeight / bar.userData.originalHeight;
            
            // Gentle rotation
            bar.rotation.y = elapsedTime * 0.1 + index * 0.1;
        });

        // Mouse interaction
        this.targetRotation.x = this.mouse.y * 0.05;
        this.targetRotation.y = this.mouse.x * 0.05;
        
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.03;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.03;
        
        this.scene.rotation.x = this.currentRotation.x;
        this.scene.rotation.y = this.currentRotation.y;

        // Animate data burst explosions
        this.updateDataBursts();

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }

    createDataBurst(position) {
        const cubeCount = 12;
        const cubes = [];
        
        for (let i = 0; i < cubeCount; i++) {
            const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
            const material = new THREE.MeshBasicMaterial({ 
                color: new THREE.Color().setHSL(0.1 + Math.random() * 0.3, 0.8, 0.7),
                transparent: true,
                opacity: 1
            });
            const cube = new THREE.Mesh(geometry, material);
            
            cube.position.copy(position);
            cube.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.3,
                    Math.random() * 0.2 + 0.1,
                    (Math.random() - 0.5) * 0.3
                ),
                rotSpeed: (Math.random() - 0.5) * 0.3,
                life: 1.0
            };
            
            cubes.push(cube);
            this.scene.add(cube);
        }
        
        if (!this.dataBursts) this.dataBursts = [];
        this.dataBursts.push({ cubes, time: 0 });
    }

    updateDataBursts() {
        if (!this.dataBursts) return;
        
        for (let i = this.dataBursts.length - 1; i >= 0; i--) {
            const burst = this.dataBursts[i];
            burst.time += 0.016;
            
            burst.cubes.forEach(cube => {
                cube.position.add(cube.userData.velocity);
                cube.userData.velocity.y -= 0.01; // gravity
                cube.rotation.x += cube.userData.rotSpeed;
                cube.rotation.y += cube.userData.rotSpeed;
                cube.userData.life -= 0.015;
                cube.material.opacity = cube.userData.life;
            });
            
            if (burst.time > 3) {
                burst.cubes.forEach(cube => {
                    this.scene.remove(cube);
                });
                this.dataBursts.splice(i, 1);
            }
        }
    }

    // Enhanced mouse interactions for AboutScene
    onObjectClick(object) {
        // Wave effect through data bars
        if (this.dataBars) {
            this.dataBars.forEach((bar, index) => {
                setTimeout(() => {
                    const originalScale = bar.scale.y;
                    bar.scale.y = originalScale * 1.5;
                    setTimeout(() => {
                        bar.scale.y = originalScale;
                    }, 200);
                }, index * 50);
            });
        }
        
        // Color pulse for clicked object
        if (object.material) {
            const originalColor = object.material.color.clone();
            object.material.color.setHex(0xffffff);
            setTimeout(() => {
                object.material.color.copy(originalColor);
            }, 300);
        }
    }

    onMouseMove(event) {
        super.onMouseMove(event);
        
        // Interactive data bars on hover
        if (this.dataBars) {
            this.dataBars.forEach((bar, index) => {
                const distance = this.mouse.distanceTo(new THREE.Vector2(
                    (bar.position.x / 5), // Normalize position
                    (bar.position.z / 5)
                ));
                
                const influence = Math.max(0, 1 - distance * 2);
                const targetHeight = bar.userData.originalHeight * (1 + influence * 0.5);
                bar.userData.targetHeight = targetHeight;
            });
        }
    }

    onMouseScroll(event) {
        super.onMouseScroll(event);
        
        // Zoom camera and adjust morph shape
        const targetZ = 5 + this.scrollOffset * 2;
        this.camera.position.z += (targetZ - this.camera.position.z) * 0.1;
        
        // Change morph shape rotation speed based on scroll
        if (this.morphShape) {
            this.morphShape.userData.scrollInfluence = this.scrollOffset;
        }
    }

    onDoubleClick(event) {
        // Randomize all data bar heights
        if (this.dataBars) {
            this.dataBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.userData.targetHeight = Math.random() * 3 + 0.5;
                    // Change color too
                    bar.material.color.setHSL(Math.random(), 0.7, 0.6);
                }, index * 50);
            });
        }
        
        // Reset morph shape
        if (this.morphShape) {
            this.morphShape.userData.scrollInfluence = 0;
        }
    }

    resetScene() {
        super.resetScene();
        // Reset data bars
        if (this.dataBars) {
            this.dataBars.forEach((bar, index) => {
                bar.userData.targetHeight = bar.userData.originalHeight;
                bar.material.color.setHSL(index / this.dataBars.length, 0.7, 0.6);
            });
        }
    }
}

// Portfolio Scene
class PortfolioScene extends ThreeScene {
    createObjects() {
        this.createFloatingIcons();
        this.createConnectedNetwork();
        this.setupMouseEvents();
    }

    setupMouseEvents() {
        this.canvas.addEventListener('click', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            // Create explosion effect at click position
            this.createExplosion(new THREE.Vector3(x * 5, y * 3, 0));
        });

        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            // Add hover glow effect to nearby objects
            this.objects.forEach(obj => {
                const distance = obj.position.distanceTo(new THREE.Vector3(x * 5, y * 3, 0));
                if (distance < 2) {
                    obj.material.emissive.setRGB(0.2, 0.15, 0.1);
                } else {
                    obj.material.emissive.setRGB(0, 0, 0);
                }
            });
        });
    }

    createFloatingIcons() {
        this.objects = [];
        const iconShapes = [
            // UI icon
            new THREE.RingGeometry(0.3, 0.5, 8),
            // Code icon (brackets)
            new THREE.TorusGeometry(0.4, 0.1, 8, 16),
            // Design icon (pentagon)
            new THREE.CylinderGeometry(0.4, 0.4, 0.1, 5),
            // Mobile icon (rounded rectangle)
            new THREE.BoxGeometry(0.3, 0.5, 0.05),
        ];

        const materials = [
            new THREE.MeshPhongMaterial({ color: 0x8b4513, transparent: true, opacity: 0.8 }),
            new THREE.MeshPhongMaterial({ color: 0xa0522d, transparent: true, opacity: 0.8 }),
            new THREE.MeshPhongMaterial({ color: 0xcd853f, transparent: true, opacity: 0.8 }),
            new THREE.MeshPhongMaterial({ color: 0xd2691e, transparent: true, opacity: 0.8 }),
        ];

        for (let i = 0; i < 12; i++) {
            const geometry = iconShapes[i % iconShapes.length];
            const material = materials[i % materials.length];
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            );

            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            mesh.userData = {
                originalPosition: mesh.position.clone(),
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.015 + 0.01
            };

            this.objects.push(mesh);
            this.scene.add(mesh);
        }
    }

    createConnectedNetwork() {
        // Create connecting lines between objects
        this.connections = [];
        const lineGeometry = new THREE.BufferGeometry();
        const positions = [];
        
        for (let i = 0; i < this.objects.length; i++) {
            for (let j = i + 1; j < this.objects.length; j++) {
                const distance = this.objects[i].position.distanceTo(this.objects[j].position);
                if (distance < 5) {
                    positions.push(
                        this.objects[i].position.x, this.objects[i].position.y, this.objects[i].position.z,
                        this.objects[j].position.x, this.objects[j].position.y, this.objects[j].position.z
                    );
                }
            }
        }

        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0xcd853f, 
            transparent: true, 
            opacity: 0.4 
        });
        
        this.networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
        this.scene.add(this.networkLines);
    }

    animate() {
        const elapsedTime = this.clock.getElapsedTime();

        // Animate floating icons
        this.objects.forEach((object, index) => {
            object.rotation.x += object.userData.rotationSpeed.x;
            object.rotation.y += object.userData.rotationSpeed.y;
            object.rotation.z += object.userData.rotationSpeed.z;

            object.position.y = object.userData.originalPosition.y + 
                Math.sin(elapsedTime * object.userData.floatSpeed + index) * 0.3;
        });

        // Mouse interaction
        this.targetRotation.x = this.mouse.y * 0.02;
        this.targetRotation.y = this.mouse.x * 0.02;
        
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.03;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.03;
        
        this.scene.rotation.x = this.currentRotation.x;
        this.scene.rotation.y = this.currentRotation.y;

        // Animate explosions
        this.updateExplosions();

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }

    createExplosion(position) {
        const particleCount = 20;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const geometry = new THREE.SphereGeometry(0.02, 8, 8);
            const material = new THREE.MeshBasicMaterial({ 
                color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
                transparent: true,
                opacity: 1
            });
            const particle = new THREE.Mesh(geometry, material);
            
            particle.position.copy(position);
            particle.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.3,
                    (Math.random() - 0.5) * 0.3,
                    (Math.random() - 0.5) * 0.3
                ),
                life: 1.0
            };
            
            particles.push(particle);
            this.scene.add(particle);
        }
        
        if (!this.explosions) this.explosions = [];
        this.explosions.push({ particles, time: 0 });
    }

    updateExplosions() {
        if (!this.explosions) return;
        
        for (let i = this.explosions.length - 1; i >= 0; i--) {
            const explosion = this.explosions[i];
            explosion.time += 0.016;
            
            explosion.particles.forEach(particle => {
                particle.position.add(particle.userData.velocity);
                particle.userData.velocity.multiplyScalar(0.98);
                particle.userData.life -= 0.02;
                particle.material.opacity = particle.userData.life;
            });
            
            if (explosion.time > 2) {
                explosion.particles.forEach(particle => {
                    this.scene.remove(particle);
                });
                this.explosions.splice(i, 1);
            }
        }
    }
}

// Blog Scene
class BlogScene extends ThreeScene {
    createObjects() {
        this.createFloatingText();
        this.createBinaryRain();
        this.setupMouseEvents();
    }

    setupMouseEvents() {
        this.canvas.addEventListener('click', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            // Create text explosion effect
            this.createTextExplosion(new THREE.Vector3(x * 8, y * 4, 0));
        });

        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            // Add hover effects to text objects
            this.objects.forEach(obj => {
                const distance = obj.position.distanceTo(new THREE.Vector3(x * 8, y * 4, 0));
                if (distance < 3) {
                    obj.material.emissive.setRGB(0.1, 0.2, 0.1);
                    obj.scale.setScalar(1.2);
                } else {
                    obj.material.emissive.setRGB(0, 0, 0);
                    obj.scale.setScalar(1.0);
                }
            });
        });
    }

    createFloatingText() {
        this.objects = [];
        const textGeometries = [
            new THREE.BoxGeometry(0.8, 0.2, 0.05), // Text block
            new THREE.SphereGeometry(0.15, 8, 8), // Period
            new THREE.CylinderGeometry(0.1, 0.1, 0.4, 8), // Exclamation
        ];

        for (let i = 0; i < 15; i++) {
            const geometry = textGeometries[Math.floor(Math.random() * textGeometries.length)];
            const woodColors = [0x8b4513, 0xa0522d, 0xcd853f, 0xd2691e, 0xdaa520];
            const material = new THREE.MeshPhongMaterial({
                color: woodColors[i % woodColors.length],
                transparent: true,
                opacity: 0.8
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 6
            );

            mesh.userData = {
                originalPosition: mesh.position.clone(),
                floatSpeed: Math.random() * 0.02 + 0.01,
                rotationSpeed: (Math.random() - 0.5) * 0.02
            };

            this.objects.push(mesh);
            this.scene.add(mesh);
        }
    }

    createBinaryRain() {
        const particleCount = 500;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = Math.random() * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xdaa520,
            size: 0.12,
            transparent: true,
            opacity: 0.7
        });

        this.binaryRain = new THREE.Points(geometry, material);
        this.scene.add(this.binaryRain);
    }

    animate() {
        const elapsedTime = this.clock.getElapsedTime();

        // Animate floating text objects
        this.objects.forEach((object, index) => {
            object.rotation.y += object.userData.rotationSpeed;
            object.position.y = object.userData.originalPosition.y + 
                Math.sin(elapsedTime * object.userData.floatSpeed + index) * 0.5;
        });

        // Animate binary rain
        if (this.binaryRain) {
            const positions = this.binaryRain.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] -= 0.05; // Fall down
                if (positions[i + 1] < -8) {
                    positions[i + 1] = 8; // Reset to top
                }
            }
            this.binaryRain.geometry.attributes.position.needsUpdate = true;
        }

        // Mouse interaction
        this.targetRotation.x = this.mouse.y * 0.03;
        this.targetRotation.y = this.mouse.x * 0.03;
        
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;
        
        this.scene.rotation.x = this.currentRotation.x;
        this.scene.rotation.y = this.currentRotation.y;

        // Animate explosions
        this.updateTextExplosions();

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }

    createTextExplosion(position) {
        const letterCount = 15;
        const letters = [];
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        
        for (let i = 0; i < letterCount; i++) {
            const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.02);
            const material = new THREE.MeshBasicMaterial({ 
                color: new THREE.Color().setHSL(0.3 + Math.random() * 0.4, 0.8, 0.6),
                transparent: true,
                opacity: 1
            });
            const letter = new THREE.Mesh(geometry, material);
            
            letter.position.copy(position);
            letter.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.4,
                    Math.random() * 0.4,
                    (Math.random() - 0.5) * 0.2
                ),
                rotSpeed: (Math.random() - 0.5) * 0.2,
                life: 1.0
            };
            
            letters.push(letter);
            this.scene.add(letter);
        }
        
        if (!this.textExplosions) this.textExplosions = [];
        this.textExplosions.push({ letters, time: 0 });
    }

    updateTextExplosions() {
        if (!this.textExplosions) return;
        
        for (let i = this.textExplosions.length - 1; i >= 0; i--) {
            const explosion = this.textExplosions[i];
            explosion.time += 0.016;
            
            explosion.letters.forEach(letter => {
                letter.position.add(letter.userData.velocity);
                letter.userData.velocity.y -= 0.01; // gravity
                letter.rotation.z += letter.userData.rotSpeed;
                letter.userData.life -= 0.015;
                letter.material.opacity = letter.userData.life;
            });
            
            if (explosion.time > 3) {
                explosion.letters.forEach(letter => {
                    this.scene.remove(letter);
                });
                this.textExplosions.splice(i, 1);
            }
        }
    }
}

// Contact Scene
class ContactScene extends ThreeScene {
    createObjects() {
        this.createCommunicationNetwork();
        this.createPulsatingCore();
        this.setupMouseEvents();
    }

    setupMouseEvents() {
        this.canvas.addEventListener('click', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            // Create network pulse effect
            this.createNetworkPulse(new THREE.Vector3(x * 4, y * 2, 0));
        });

        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            // Add hover glow to communication nodes
            this.objects.forEach(node => {
                const distance = node.position.distanceTo(new THREE.Vector3(x * 4, y * 2, 0));
                if (distance < 2) {
                    node.material.emissive.setRGB(0.3, 0.2, 0.1);
                    node.scale.setScalar(1.5);
                } else {
                    node.material.emissive.setRGB(0.18, 0.105, 0.06);
                    node.scale.setScalar(1.0);
                }
            });
        });
    }

    createCommunicationNetwork() {
        this.objects = [];
        
        // Create communication nodes
        for (let i = 0; i < 8; i++) {
            const geometry = new THREE.SphereGeometry(0.2, 16, 16);
            const material = new THREE.MeshPhongMaterial({
                color: 0xcd853f,
                emissive: 0x2d1b0f,
                transparent: true,
                opacity: 0.8
            });
            
            const sphere = new THREE.Mesh(geometry, material);
            const angle = (i / 8) * Math.PI * 2;
            sphere.position.set(
                Math.cos(angle) * 3,
                Math.sin(angle * 0.5) * 1,
                Math.sin(angle) * 3
            );

            sphere.userData = {
                angle: angle,
                orbitSpeed: 0.01,
                pulseSpeed: Math.random() * 0.02 + 0.01
            };

            this.objects.push(sphere);
            this.scene.add(sphere);
        }
    }

    createPulsatingCore() {
        const coreGeometry = new THREE.IcosahedronGeometry(0.5, 1);
        const coreMaterial = new THREE.MeshPhongMaterial({
            color: 0xa0522d,
            emissive: 0x2d1611,
            transparent: true,
            opacity: 0.9,
            shininess: 100
        });
        
        this.core = new THREE.Mesh(coreGeometry, coreMaterial);
        this.scene.add(this.core);

        // Create pulse rings
        this.pulseRings = [];
        for (let i = 0; i < 3; i++) {
            const ringGeometry = new THREE.RingGeometry(1, 1.2, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xdaa520,
                transparent: true,
                opacity: 0.4,
                side: THREE.DoubleSide
            });
            
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.userData = { delay: i * 1000 };
            this.pulseRings.push(ring);
            this.scene.add(ring);
        }
    }

    animate() {
        const elapsedTime = this.clock.getElapsedTime();

        // Animate communication nodes
        this.objects.forEach(node => {
            node.userData.angle += node.userData.orbitSpeed;
            node.position.x = Math.cos(node.userData.angle) * 3;
            node.position.z = Math.sin(node.userData.angle) * 3;
            
            // Pulsating effect
            const baseScale = node.scale.x > 1.2 ? node.scale.x : 1;
            const pulseScale = baseScale + Math.sin(elapsedTime * node.userData.pulseSpeed) * 0.2;
            node.scale.set(pulseScale, pulseScale, pulseScale);
        });

        // Animate core
        if (this.core) {
            this.core.rotation.x = elapsedTime * 0.3;
            this.core.rotation.y = elapsedTime * 0.4;
            
            const coreScale = 1 + Math.sin(elapsedTime * 0.8) * 0.1;
            this.core.scale.set(coreScale, coreScale, coreScale);
        }

        // Animate pulse rings
        this.pulseRings.forEach((ring, index) => {
            const pulseTime = (elapsedTime * 1000 + ring.userData.delay) % 3000;
            const progress = pulseTime / 3000;
            
            const scale = 1 + progress * 2;
            ring.scale.set(scale, scale, 1);
            ring.material.opacity = 0.3 * (1 - progress);
            
            ring.lookAt(this.camera.position);
        });

        // Mouse interaction
        this.targetRotation.x = this.mouse.y * 0.05;
        this.targetRotation.y = this.mouse.x * 0.05;
        
        this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
        this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;
        
        this.scene.rotation.x = this.currentRotation.x;
        this.scene.rotation.y = this.currentRotation.y;

        // Animate network pulses
        this.updateNetworkPulses();

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }

    createNetworkPulse(position) {
        const ringGeometry = new THREE.RingGeometry(0.1, 0.2, 16);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xcd853f,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        
        const pulse = new THREE.Mesh(ringGeometry, ringMaterial);
        pulse.position.copy(position);
        pulse.lookAt(this.camera.position);
        
        pulse.userData = {
            scale: 0.1,
            maxScale: 3,
            opacity: 0.8
        };
        
        this.scene.add(pulse);
        
        if (!this.networkPulses) this.networkPulses = [];
        this.networkPulses.push(pulse);
    }

    updateNetworkPulses() {
        if (!this.networkPulses) return;
        
        for (let i = this.networkPulses.length - 1; i >= 0; i--) {
            const pulse = this.networkPulses[i];
            
            pulse.userData.scale += 0.05;
            pulse.userData.opacity -= 0.02;
            
            pulse.scale.set(pulse.userData.scale, pulse.userData.scale, 1);
            pulse.material.opacity = pulse.userData.opacity;
            
            if (pulse.userData.opacity <= 0) {
                this.scene.remove(pulse);
                this.networkPulses.splice(i, 1);
            }
        }
    }
}

// Global variables to store scene instances
let heroSceneInstance = null;
let portfolioSceneInstance = null;
let aboutSceneInstance = null;
let blogSceneInstance = null;
let contactSceneInstance = null;

// Initialize scenes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize hero scene
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        heroSceneInstance = new HeroScene('hero-canvas');
    }
    
    // Initialize portfolio scene with delay for performance
    setTimeout(() => {
        const portfolioCanvas = document.getElementById('portfolio-canvas');
        if (portfolioCanvas) {
            portfolioSceneInstance = new PortfolioScene('portfolio-canvas');
        }
    }, 500);
    
    // Initialize about scene with delay for performance
    setTimeout(() => {
        const aboutCanvas = document.getElementById('about-canvas');
        if (aboutCanvas) {
            aboutSceneInstance = new AboutScene('about-canvas');
        }
    }, 1000);

    // Initialize blog scene with delay for performance
    setTimeout(() => {
        const blogCanvas = document.getElementById('blog-canvas');
        if (blogCanvas) {
            blogSceneInstance = new BlogScene('blog-canvas');
        }
    }, 1500);

    // Initialize contact scene with delay for performance
    setTimeout(() => {
        const contactCanvas = document.getElementById('contact-canvas');
        if (contactCanvas) {
            contactSceneInstance = new ContactScene('contact-canvas');
        }
    }, 2000);

    // Add global page scroll effects
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - lastScrollY;
        
        // Apply scroll effects to all scenes
        const scenes = [
            { instance: heroSceneInstance, sectionId: 'home' },
            { instance: portfolioSceneInstance, sectionId: 'portfolio' },
            { instance: aboutSceneInstance, sectionId: 'about' },
            { instance: blogSceneInstance, sectionId: 'blog' },
            { instance: contactSceneInstance, sectionId: 'contact' }
        ];

        scenes.forEach(({ instance, sectionId }) => {
            if (instance) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const visibility = Math.max(0, Math.min(1, 1 - Math.abs(rect.top) / window.innerHeight));
                    
                    if (visibility > 0) {
                        instance.scrollOffset += scrollDelta * 0.001;
                        instance.scrollOffset = Math.max(-2, Math.min(2, instance.scrollOffset));
                    }
                }
            }
        });
        
        lastScrollY = scrollY;
    });

    // Add keyboard shortcuts for effects
    document.addEventListener('keydown', (event) => {
        const allScenes = [
            heroSceneInstance, 
            portfolioSceneInstance, 
            aboutSceneInstance, 
            blogSceneInstance, 
            contactSceneInstance
        ];

        switch(event.key) {
            case ' ': // Spacebar - trigger effects in all scenes
                event.preventDefault();
                allScenes.forEach(scene => {
                    if (scene && scene.objects) {
                        scene.objects.forEach(obj => {
                            if (scene.createExplosion) {
                                scene.createExplosion(obj.position);
                            }
                        });
                    }
                });
                break;
            case 'r': // R key to reset all scenes
                allScenes.forEach(scene => {
                    if (scene && scene.resetScene) {
                        scene.resetScene();
                    }
                });
                break;
            case '1': // Number keys for individual scene effects
                if (heroSceneInstance && heroSceneInstance.objects) {
                    heroSceneInstance.objects.forEach(obj => {
                        heroSceneInstance.createExplosion(obj.position);
                    });
                }
                break;
            case '2':
                if (portfolioSceneInstance && portfolioSceneInstance.objects) {
                    portfolioSceneInstance.objects.forEach(obj => {
                        obj.scale.multiplyScalar(1.5);
                        setTimeout(() => obj.scale.multiplyScalar(1/1.5), 500);
                    });
                }
                break;
            case '3':
                if (aboutSceneInstance && aboutSceneInstance.dataBars) {
                    aboutSceneInstance.dataBars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.userData.targetHeight = Math.random() * 3 + 0.5;
                        }, index * 100);
                    });
                }
                break;
        }
    });
});
