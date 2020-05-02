const transpiler = require('@abaplint/transpiler');
const fs = require('fs');

async function transpile() {
	const t = new transpiler.Transpiler();
	const sourceIndex = fs.readFileSync('./src/zcl_index.clas.abap', 'utf8');
	const sourceWriter = fs.readFileSync('./src/zcl_writer.clas.abap', 'utf8');
	const transpilerData = [
		{ filename: 'zcl_index.clas.abap', contents: sourceIndex },
		{ filename: 'zcl_writer.clas.abap', contents: sourceWriter },
	];
	const result = await t.run(transpilerData);
	console.log(result);
}

transpile();
