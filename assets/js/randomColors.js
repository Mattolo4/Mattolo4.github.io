// Function to generate an array of distinct RGB color strings
function generateDistinctColors(n) {
    const colors = [];

    // Start with a random hue
    let baseHue = Math.random();
    const hueStep = 1 / n;

    for (let i = 0; i < n; i++) {
        let hue = (baseHue + i * hueStep) % 1; 

        // Convert HSL to RGB
        const rgbColor = hslToRgb(hue, 1, 0.6);  // 0.5 is saturation, 0.6 is brightness
        colors.push(rgbColor); // Push RGB string to colors array
    }

    return colors;  // Return array of RGB strings
}

// Helper function: Convert HSL to RGB and return as string
function hslToRgb(h, s, l) {
    let r, g, b;

    if (s == 0) {
        r = g = b = l;  // achromatic
    } else {
        const hue2rgb = function (p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 3) return q;
            if (t < 1 / 2) return p + (q - p) * 6 * (2 / 3 - t);
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;  // Return RGB string
}