// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

enum FormatType {
	inline,
	block
}

function getFormatType(equation:string): any {
	const inline = /^\$[\s\S]*[\S]+[\s\S]*\$$/;
	const block = /^\$\$[\s\S]*[\S]+[\s\S]*\$\$$/;

	if(block.test(equation)){
		vscode.window.showInformationMessage('block format');

		return FormatType.block;
	}
	else if(inline.test(equation)){
		vscode.window.showInformationMessage('inline format');
		
		return FormatType.inline;
	}
	else{
		vscode.window.showErrorMessage('The selected text does not match the latex format.');
		
		return null;
	}

}

function convertFormula() {
	let editor = vscode.window.activeTextEditor;
	
	if(!editor) {
		return;
	}

	const selectedText = editor.document.getText(editor.selection);
	const selectStart = editor.selection.start;
	const selectEnd = editor.selection.end;

	if(editor.selection.isEmpty){
		vscode.window.showErrorMessage('Nothing selected.');

		return;
	}

	switch(getFormatType(selectedText)) {
		case FormatType.inline: {
			console.log('format type is inline');
			console.log(selectedText);
			break;
		}
		case FormatType.block: {
			console.log('format type is block');
			console.log(selectedText);
			break;
		}
		default: {
			return;
		}
	}
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "latex-math-formula-to-image" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('latex-math-formula-to-image.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from LaTeX math formula to image!');
	});

	const convertSelection = vscode.commands.registerCommand('latex-math-formula-to-image.convert-selection', () => {
		
		convertFormula();
	});

	context.subscriptions.push(disposable, convertSelection);
}

// this method is called when your extension is deactivated
export function deactivate() {}
