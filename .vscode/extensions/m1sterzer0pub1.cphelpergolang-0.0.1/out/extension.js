"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
class SidebarProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        const myjson = require(vscode.Uri.joinPath(this._extensionUri, "media", "data.json").fsPath);
        const makeText = (key, sname1, dt1, dt2) => {
            let s = myjson[key];
            const sname = sname1 === "default" || sname1 === "" ? key : sname1;
            s = s.replace(/STRUCTNAME/g, sname);
            s = s.replace(/DATATYPE1/g, dt1);
            s = s.replace(/DATATYPE2/g, dt2);
            //console.log(s);
            return s;
        };
        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "onInfo": {
                    if (data.value) {
                        vscode.window.showInformationMessage(data.value);
                    }
                    ;
                    break;
                }
                case "onError": {
                    if (data.value) {
                        vscode.window.showErrorMessage(data.value);
                    }
                    break;
                }
                case "addText": {
                    const t = makeText(data.value.key, data.value.structname, data.value.datatype1, data.value.datatype2);
                    vscode.commands.executeCommand("cphelpergolang.addText", t);
                    break;
                }
            }
        });
    }
    revive(panel) { this._view = panel; }
    _getHtmlForWebview(webview) {
        const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"));
        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"));
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "out", "main.css"));
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "out", "main.js"));
        const nonce = getNonce();
        return `<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8">
		  			<meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
				  	<meta name="viewport" content="width=device-width, initial-scale=1.0">
				  	<link href="${styleResetUri}" rel="stylesheet">
				  	<link href="${styleVSCodeUri}" rel="stylesheet">
				  	<link href="${styleMainUri}" rel="stylesheet">
					<script nonce="${nonce}" defer="defer" src="${scriptUri}"></script>
					<script nonce="${nonce}">
						const tsvscode = acquireVsCodeApi();
		  			</script>
				</head>
				<body>
					<h1>CP Helper Golang</h1>
					<div id="root"></div>
				</body>
			</html>`;
    }
}
function activate(context) {
    const sidebarProvider = new SidebarProvider(context.extensionUri);
    const disp1 = vscode.commands.registerTextEditorCommand('cphelpergolang.addText', (editor, edit, mytext) => { edit.insert(editor.selection.active, mytext); });
    const disp2 = vscode.window.registerWebviewViewProvider("cphelpergolang-sidebar", sidebarProvider);
    context.subscriptions.push(disp1, disp2);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map