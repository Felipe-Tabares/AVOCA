// Efecto Blockchain para el header
class BlockchainNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x; // Posición base para el movimiento
        this.baseY = y;
        this.connections = [];
        this.radius = 4;
        this.pulseRadius = 0;
        this.pulseSpeed = 0.05;
        this.pulseMax = 25;
        this.lastPulse = Math.random() * 100;
        this.pulseInterval = 100 + Math.random() * 200;
        
        // Propiedades para el movimiento
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.2 + Math.random() * 0.3;
        this.range = 20 + Math.random() * 25;
        this.offset = Math.random() * Math.PI * 2;
    }

    connect(node) {
        if (!this.connections.includes(node)) {
            this.connections.push(node);
        }
    }

    update(time) {
        // Actualizar posición con movimiento suave
        this.x = this.baseX + Math.sin(time * this.speed + this.offset) * this.range;
        this.y = this.baseY + Math.cos(time * this.speed + this.offset) * this.range;

        // Actualizar el pulso
        if (Date.now() - this.lastPulse > this.pulseInterval) {
            this.pulseRadius = 0;
            this.lastPulse = Date.now();
        }
        if (this.pulseRadius < this.pulseMax) {
            this.pulseRadius += this.pulseSpeed;
        }

        // Actualizar conexiones dinámicamente
        this.connections = this.connections.filter(node => {
            const distance = Math.hypot(this.x - node.x, this.y - node.y);
            return distance < 120; // Distancia máxima de conexión
        });
    }

    draw(ctx) {
        // Dibujar conexiones con opacidad basada en la distancia
        this.connections.forEach(node => {
            const distance = Math.hypot(this.x - node.x, this.y - node.y);
            const opacity = 1 - (distance / 120);
            
            ctx.strokeStyle = `rgba(232, 65, 66, ${opacity * 0.25})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();

            // Añadir efecto de "datos" moviéndose por la conexión
            if (Math.random() < 0.08) {
                const progress = (Math.sin(Date.now() * 0.003) + 1) / 2;
                const x = this.x + (node.x - this.x) * progress;
                const y = this.y + (node.y - this.y) * progress;
                
                ctx.fillStyle = `rgba(232, 65, 66, ${opacity * 0.6})`;
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Dibujar nodo con brillo
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius * 2.5
        );
        gradient.addColorStop(0, '#E84142');
        gradient.addColorStop(0.5, 'rgba(232, 65, 66, 0.4)');
        gradient.addColorStop(1, 'rgba(232, 65, 66, 0.1)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Dibujar pulso con efecto mejorado
        if (this.pulseRadius > 0) {
            const pulseGradient = ctx.createRadialGradient(
                this.x, this.y, this.radius,
                this.x, this.y, this.pulseRadius
            );
            pulseGradient.addColorStop(0, 'rgba(232, 65, 66, 0.3)');
            pulseGradient.addColorStop(0.5, 'rgba(232, 65, 66, 0.1)');
            pulseGradient.addColorStop(1, 'rgba(232, 65, 66, 0)');
            
            ctx.fillStyle = pulseGradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

class BlockchainNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.nodeCount = 80;
        this.connectionDistance = 120;
        this.time = 0;
        
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.handleResize());
    }

    init() {
        this.handleResize();
        this.createNodes();
        this.connectNodes();
    }

    handleResize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        // Recrear nodos con nuevas posiciones
        this.createNodes();
        this.connectNodes();
    }

    createNodes() {
        this.nodes = [];
        const margin = 30; // Reducido de 40 a 30 para permitir más nodos
        for (let i = 0; i < this.nodeCount; i++) {
            const x = margin + Math.random() * (this.canvas.width - margin * 2);
            const y = margin + Math.random() * (this.canvas.height - margin * 2);
            this.nodes.push(new BlockchainNode(x, y));
        }
    }

    connectNodes() {
        this.nodes.forEach(node => {
            this.nodes.forEach(otherNode => {
                if (node !== otherNode) {
                    const distance = Math.hypot(
                        node.baseX - otherNode.baseX,
                        node.baseY - otherNode.baseY
                    );
                    if (distance < this.connectionDistance) {
                        node.connect(otherNode);
                    }
                }
            });
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Actualizar tiempo para el movimiento
        this.time += 0.01;
        
        // Actualizar y dibujar nodos
        this.nodes.forEach(node => {
            node.update(this.time);
            node.draw(this.ctx);
        });

        // Reconectar nodos periódicamente
        if (Math.random() < 0.01) { // 1% de probabilidad por frame
            this.connectNodes();
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Inicializar el efecto cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('blockchainCanvas');
    if (canvas) {
        new BlockchainNetwork(canvas);
    }
}); 