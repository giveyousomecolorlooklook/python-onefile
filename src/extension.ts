// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "python-onefile" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('python-onefile.genexe', (uri: vscode.Uri) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from python-onefile!');
		//先获取工作区路径
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (workspaceFolders === undefined) {
			vscode.window.showErrorMessage("没有打开工作区");
			return;
		}
		const workspacePath = workspaceFolders[0].uri.fsPath;
		// 从上下文获取源代码文件路径（不是从当前激活编辑器，而是文件管理器）
		const source_path = uri.fsPath;
		// 获取venv下的python路径
		const pythonpath = workspacePath + "/.venv/Scripts/python.exe";
		// 拼接打包命令
		// const cmd = pythonpath + " -m PyInstaller --onefile --noconsole --distpath " + workspacePath + " " + source_path;
		const cmd = pythonpath + " -m PyInstaller --onefile  --distpath " + workspacePath + " " + source_path;

		// 向终端（python-onefile）发送命令
		// 查找名为 python-onefile 的终端
		let terminal = vscode.window.terminals.find(t => t.name === 'python-onefile');
		// 如果找不到就创建新终端
		if (!terminal) {
			terminal = vscode.window.createTerminal('python-onefile');
		}
		terminal.sendText(cmd, false); // 第二个参数为false表示不自动执行命令
		terminal.show();
		
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
