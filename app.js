const canvas = document.getElementById("gradientCanvas");
const ctx = canvas.getContext("2d");
const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const color3 = document.getElementById("color3");
const blur = document.getElementById("blur");
const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const saturate = document.getElementById("saturate");
const grain = document.getElementById("grain");
const randomizeButton = document.getElementById("randomize");
const refreshButton = document.getElementById("refresh");
const copyCSSButton = document.getElementById("copyCSS");
const copiedMessage = document.getElementById("copiedMessage");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

function generateGradient() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const colors = [color1.value, color2.value, color3.value];
    for (let i = 0; i < 6; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 300 + 150;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, colors[Math.floor(Math.random() * colors.length)]);
        gradient.addColorStop(1, colors[Math.floor(Math.random() * colors.length)]);

        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.5;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function applyGrain() {
    const grainValue = grain.value;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        const grainAmount = Math.random() * grainValue - grainValue / 2;
        pixels[i] += grainAmount; 
        pixels[i + 1] += grainAmount; 
        pixels[i + 2] += grainAmount; 
    }

    ctx.putImageData(imageData, 0, 0);
}

function applyFilters() {
    canvas.style.filter = `
        blur(${blur.value}px)
        brightness(${brightness.value})
        contrast(${contrast.value})
        saturate(${saturate.value})
    `;
}

function randomizeAll() {
    color1.value = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    color2.value = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    color3.value = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    blur.value = Math.random() * 20;
    brightness.value = (Math.random() * 1.5 + 0.5).toFixed(1);
    contrast.value = (Math.random() * 1.5 + 0.5).toFixed(1);
    saturate.value = (Math.random() * 1.5 + 0.5).toFixed(1);
    grain.value = Math.random() * 100;

    generateGradient();
    applyGrain();
    applyFilters();
}

function copyCSS() {
    const css = `
        background: linear-gradient(135deg, ${color1.value}, ${color2.value}, ${color3.value});
        filter: blur(${blur.value}px) brightness(${brightness.value}) contrast(${contrast.value}) saturate(${saturate.value});
    `;
    navigator.clipboard.writeText(css);
    copiedMessage.style.display = "block";
    setTimeout(() => {
        copiedMessage.style.display = "none";
    }, 2000);
}

refreshButton.addEventListener("click", () => {
    generateGradient();
    applyGrain();
});

randomizeButton.addEventListener("click", randomizeAll);
copyCSSButton.addEventListener("click", copyCSS);

grain.addEventListener("input", () => {
    generateGradient();
    applyGrain();
});

blur.addEventListener("input", applyFilters);
brightness.addEventListener("input", applyFilters);
contrast.addEventListener("input", applyFilters);
saturate.addEventListener("input", applyFilters);

color1.addEventListener("input", generateGradient);
color2.addEventListener("input", generateGradient);
color3.addEventListener("input", generateGradient);

generateGradient();
applyGrain();