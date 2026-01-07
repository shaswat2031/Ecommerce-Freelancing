const fs = require('fs');
const path = require('path');

const source = 'C:\\Users\\prasa\\.gemini\\antigravity\\brain\\88b9c21e-7640-474e-bb86-06e74dbe4d7c\\organic_saffron_spices_1767788243469.png';
const dest = path.join(__dirname, 'src', 'assets', 'organic_spices.png');

try {
    fs.copyFileSync(source, dest);
    console.log('Image copied successfully to:', dest);
} catch (err) {
    console.error('Error copying file:', err);
}
