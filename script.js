window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // ENCODE BUTTON
    const encodeBtn = document.getElementById('encodeBtn');
    if (encodeBtn) {
        encodeBtn.onclick = () => {
            const fileInput = document.getElementById('imageLoader');
            const textInput = document.getElementById('textInput');
            
            if (!fileInput.files[0]) return alert("Upload an image!");

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const pixels = imgData.data;
                    const binary = (textInput.value + "~~").split('').map(c => 
                        c.charCodeAt(0).toString(2).padStart(8, '0')
                    ).join('');

                    for (let i = 0; i < binary.length; i++) {
                        pixels[i * 4] = (pixels[i * 4] & 0xFE) | parseInt(binary[i]);
                    }

                    ctx.putImageData(imgData, 0, 0);
                    const link = document.createElement('a');
                    link.download = 'secret_image.png';
                    link.href = canvas.toDataURL("image/png");
                    link.click();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(fileInput.files[0]);
        };
    }

    // DECODE BUTTON
    const decodeBtn = document.getElementById('decodeBtn');
    if (decodeBtn) {
        decodeBtn.onclick = () => {
            const fileInput = document.getElementById('decodeLoader');
            if (!fileInput.files[0]) return alert("Select the secret image!");

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    let bin = "", msg = "";

                    for (let i = 0; i < data.length; i += 4) {
                        bin += (data[i] & 1);
                        if (bin.length === 8) {
                            let char = String.fromCharCode(parseInt(bin, 2));
                            msg += char;
                            bin = "";
                            if (msg.endsWith("~~")) {
                                document.getElementById('decodedMessage').innerText = "Found: " + msg.slice(0, -2);
                                return;
                            }
                        }
                    }
                    document.getElementById('decodedMessage').innerText = "No message found.";
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(fileInput.files[0]);
        };
    }
});
