# 🖼️ Steganography Web Tool

A lightweight, browser-based Steganography tool built with **HTML5, CSS3, and JavaScript**. This application allows users to hide secret text messages inside image files (PNG) using the **Least Significant Bit (LSB)** method.



## 🚀 Features
- **Encode:** Hide any text message inside a PNG image.
- **Decode:** Upload an encoded image to extract the hidden message.
- **Privacy:** No images are uploaded to a server; all processing happens locally in your browser using the Canvas API.
- **Automatic Download:** Generates and downloads the encoded image instantly.

## 🛠️ Technology Stack
- **HTML5:** Structure and the `<canvas>` element for pixel manipulation.
- **CSS3:** Clean and modern user interface.
- **JavaScript (ES6):** Core logic for binary conversion and bitwise operations.

## 📖 How It Works
The tool uses the **Least Significant Bit (LSB)** technique. Every pixel in a digital image is made up of Red, Green, and Blue (RGB) values (0-255).
1. The tool converts your text message into a string of binary digits (0s and 1s).
2. It loops through the pixels of the image and replaces the last bit of the **Red channel** with a bit from the secret message.
3. Because the change in color value is at most **1 unit** (e.g., changing a Red value from 155 to 154), the difference is invisible to the human eye.
