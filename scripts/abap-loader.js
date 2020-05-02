const transpiler = require('@abaplint/transpiler');
const path = require('path');
const fs = require('fs');

const transpile = async function () {
	const t = new transpiler.Transpiler();
	const directoryPath = path.join(__dirname, '../src');
	console.log(directoryPath);

	fs.readdir(directoryPath, async function (err, files) {
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		}

		files.forEach(async function (file) {
			if (file.match(/^([a-zA-Z0-9\s_\\.\-\(\):])+\.(abap)$/)) {
				const source = fs.readFileSync('./src/' + file, 'utf8');
				const result = await t.run([{ filename: './build/' + file, contents: source }]);
				var splitstring = file.split('.')
				const content = "const abap = require('@abaplint/runtime');\n" + 
								result.js[0].contents + "\n" +
								"module.exports = " + splitstring[0] + ";";
				fs.writeFile(result.js[0].filename, content, 'utf8', (err) => {
					if (err) throw err;
					console.log('The file was succesfully saved!');
				});
			}
		});
	});
};

transpile();
