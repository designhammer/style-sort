// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { sortStyles } from './style-sorter'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.styleSort', () => {
		// The code you place here will be executed every time your command is executed
		const editor = vscode.window.activeTextEditor
		if (editor && editor.document) {
			const text = editor.document.getText(editor.selection)
			const lines = text.split(/\r?\n/)
			const sortedLines = sortStyles(lines)
			const sortedText = sortedLines.join('\n')

			editor.edit(edit => {
				edit.replace(editor.selection, sortedText)
			}).then(success => {
				if (success) {
					vscode.window.showInformationMessage(sortedText)
				} else {
					vscode.window.showInformationMessage('fail')
				}
			})
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
