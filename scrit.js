const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const getPixels = () => ctx.getImageData(0, 0, canvas.width, canvas.height);

// Helper function to load image to canvas
const processImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            callback();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
};

// --- ENCODER ---
document.getElementById('encodeBtn').onclick = () => {
    const file = document.getElementById('imageLoader').files[0];
    const text = document.getElementById('textInput').value + "~~";
    if (!file || text === "~~") return alert("Input required!");

    processImage(file, () => {
        const imgData = getPixels();
        const binary = text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join('');

        for (let i = 0; i < binary.length; i++) {
            imgData.data[i * 4] = (imgData.data[i * 4] & 0xFE) | parseInt(binary[i]);
        }

        ctx.putImageData(imgData, 0, 0);
        Object.assign(document.createElement('a'), { download: 'secret.png', href: canvas.toDataURL() }).click();
    });
};

// --- DECODER ---
document.getElementById('decodeBtn').onclick = () => {
    const file = document.getElementById('decodeLoader').files[0];
    if (!file) return;

    processImage(file, () => {
        const { data } = getPixels();
        let bin = "", msg = "";

        for (let i = 0; i < data.length; i += 4) {
            bin += (data[i] & 1);
            if (bin.length === 8) {
                msg += String.fromCharCode(parseInt(bin, 2));
                bin = "";
                if (msg.endsWith("~~")) return document.getElementById('decodedMessage').innerText = msg.slice(0, -2);
            }
        }
    });
};
