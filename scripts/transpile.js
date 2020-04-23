const transpiler = require('@abaplint/transpiler');
const fs = require('fs');

const transpile = async function () {
	const t = new transpiler.Transpiler();
	const path = './src/ztest_run.prog.abap';
	const source = fs.readFileSync(path, 'utf8');
	console.log(source);
	const result = await t.run([{ filename: './build/ztest_run.prog.abap', contents: source }]);
	console.log(result);
	console.log(result.js[0].contents);
	console.log(result.js[0].filename);
	const content = "const abap = require('@abaplint/runtime');\n" + result.js[0].contents;
	fs.writeFile(result.js[0].filename, content, 'utf8', (err) => {
		if (err) throw err;
		console.log('The file was succesfully saved!');
	});
};

transpile();
