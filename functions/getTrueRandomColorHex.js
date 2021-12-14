// ./functions/getTrueRandomColorHex.js
// ========
// returns a random hex color

module.exports = {
	name: "getTrueRandomColorHex",
	version_added: "2.0",
	module_type: "single",
	invocation: () => {
        const colorLetters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += colorLetters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}