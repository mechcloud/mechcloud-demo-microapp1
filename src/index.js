export { default as CustomComponentsPlugin } from './plugins/RktVueComponentsPlugin'

const linkTag = document.getElementById('preflight-css');
if (linkTag) {
} else {
    const newLink1 = document.createElement('link');
    newLink1.id = 'preflight-css'
    newLink1.rel = 'stylesheet';
    newLink1.href = 'https://unpkg.com/tailwindcss@3.4.3/src/css/preflight.css';

    const firstStyleTag = document.querySelector('head style');
    if (firstStyleTag) { 
        document.head.insertBefore(newLink1, firstStyleTag);
    } else {
        // Fallback if no <style> tag is found 
        document.head.appendChild(newLink1); 
    }
}

