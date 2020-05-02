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

		let transpilerData = [];

		files.forEach(async function (file) {
			if (file.match(/^([a-zA-Z0-9\s_\\.\-\(\):])+\.(abap)$/)) {
				const source = fs.readFileSync('./src/' + file, 'utf8');
				transpilerData.push({ filename: './build/' + file, contents: source });
			}
		});

		const result = await t.run(transpilerData);
		result.js.forEach(async function (resultJs) {
			var filename = resultJs.filename.replace(/^.*[\\\/]/, '')
			var splitstring =filename.split('.');
			const content =
				"const abap = require('@abaplint/runtime');\n" +
				resultJs.contents +
				'\n' +
				'module.exports = ' +
				splitstring[0] +
				';';
			fs.writeFile(resultJs.filename, content, 'utf8', (err) => {
				if (err) throw err;
				console.log('The file was succesfully saved!');
			});
		});
	});
};

transpile();
