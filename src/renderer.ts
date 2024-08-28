// renderer.ts is responsible for rendering web content.

const preloadPractice: HTMLElement | null = document.getElementById('preprac')

if (preloadPractice) {
    preloadPractice.innerText = `This is my preload practice. We are using Chrome ${window.versions.chrome()}, Node.js ${window.versions.node()}, and Electron ${window.versions.electron()}` 
}