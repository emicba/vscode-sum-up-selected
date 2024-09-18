import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

const REGEXP = /-?\d+(\.\d+)?/g;

function updateStatusBarItem() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    statusBarItem.hide();
    return;
  }
  const text = editor.document.getText(editor.selection);

  if (!text) {
    statusBarItem.hide();
    return;
  }

  let match = REGEXP.exec(text);
  let sum = 0;
  while (match) {
    sum += parseFloat(match[0]);
    match = REGEXP.exec(text);
  }

  if (sum === 0) {
    statusBarItem.hide();
    return;
  }

  statusBarItem.text = `Sum: ${sum}`;
  statusBarItem.show();
}

export function activate({ subscriptions }: vscode.ExtensionContext) {
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);

  subscriptions.push(statusBarItem);
  subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
  subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));
}
