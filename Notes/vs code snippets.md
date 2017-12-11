// markdown
"代码块": {
	"prefix": "qq",
	"body": [
		"```javascript$1",
		"$2",
		"```",
		"$0"
	],
	"description": "释放一个代码块"
    }




<!-- keyupbiding.json -->

// 将键绑定放入此文件中以覆盖默认值
[{
        "key": "ctrl+shift+c",
        "command": "autoprefixer.execute"
    },
    {
        "key": "ctrl+q",
        "command": "code-runner.run"
        // "command": "python.execInTerminal"
    },
    {
        "key": "ctrl+shift+q",
        "command": "editor.action.triggerSuggest",
        "when": "editorHasCompletionItemProvider && editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+z",
        "command": "-editor.action.triggerSuggest",
        "when": "editorHasCompletionItemProvider && editorTextFocus && !editorReadonly"
    },
    {
        "key": "oem_3",
        "command": "markdown.extension.editing.toggleCodeSpan",
        "when": "editorTextFocus && editorLangId == 'markdown'"
    },
    {
        "key": "ctrl+m ctrl+c",
        "command": "-md-shortcut.toggleCodeBlock",
        "when": "editorTextFocus && editorLangId == 'markdown'"
    },
    {
        "key": "ctrl+e",
        "command": "editor.action.formatSelection",
        "when": "editorHasSelection && editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+k ctrl+f",
        "command": "-editor.action.formatSelection",
        "when": "editorHasSelection && editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+f1",
        "command": "extension.inBrowser",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+q w",
        "command": "-extension.inBrowser",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+f2",
        "command": "extension.sidePreview",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+q s",
        "command": "-extension.sidePreview",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+f1",
        "command": "markdown-preview-enhanced.openPreview",
        "when": "editorLangId == 'markdown'"
    },
    {
        "key": "ctrl+k v",
        "command": "-markdown-preview-enhanced.openPreview",
        "when": "editorLangId == 'markdown'"
    }
]// 将键绑定放入此文件中以覆盖默认值
[{
        "key": "ctrl+shift+c",
        "command": "autoprefixer.execute"
    },
    {
        "key": "ctrl+q",
        "command": "code-runner.run"
        // "command": "python.execInTerminal"
    },
    {
        "key": "ctrl+shift+q",
        "command": "editor.action.triggerSuggest",
        "when": "editorHasCompletionItemProvider && editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+z",
        "command": "-editor.action.triggerSuggest",
        "when": "editorHasCompletionItemProvider && editorTextFocus && !editorReadonly"
    },
    {
        "key": "oem_3",
        "command": "markdown.extension.editing.toggleCodeSpan",
        "when": "editorTextFocus && editorLangId == 'markdown'"
    },
    {
        "key": "ctrl+m ctrl+c",
        "command": "-md-shortcut.toggleCodeBlock",
        "when": "editorTextFocus && editorLangId == 'markdown'"
    },
    {
        "key": "ctrl+e",
        "command": "editor.action.formatSelection",
        "when": "editorHasSelection && editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+k ctrl+f",
        "command": "-editor.action.formatSelection",
        "when": "editorHasSelection && editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+f1",
        "command": "extension.inBrowser",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+q w",
        "command": "-extension.inBrowser",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+f2",
        "command": "extension.sidePreview",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+q s",
        "command": "-extension.sidePreview",
        "when": "editorTextFocus"
    },
    {
        "key": "ctrl+f1",
        "command": "markdown-preview-enhanced.openPreview",
        "when": "editorLangId == 'markdown'"
    },
    {
        "key": "ctrl+k v",
        "command": "-markdown-preview-enhanced.openPreview",
        "when": "editorLangId == 'markdown'"
    }
]