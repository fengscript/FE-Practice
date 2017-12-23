// markdown
```javascript
{
	// FYG snippets for babylonjs
	// js
	"document.write()": {
		"prefix": "dw",
		"body": [
			"document.write($1)$2"
		],
		"description": "召唤document.write()"
	},
	// jQuery
	"召唤$": {
		"prefix": "dl",
		"body": [
			"$"
		],
		"description": "召唤一个 $"
	},
	// BABYLON
		"BABYLON": {
		"prefix": "b",
		"body": [
			"BABYLON.$1"
		],
		"description": "BABYLON"
		},

// BABYLON.Vector3.Zero()
		"BABYLON.Vector3.Zero()": {
		"prefix": "b0",
		"body": [
			"BABYLON.Vector3.Zero()",
			"$0"
		],
		"description": "BABYLON.Vector3.Zero()"
		},

// new BABYLON.Color3();
		"new BABYLON.Color3": {
		"prefix": "c3",
		"body": [
			"new BABYLON.Color3($1/255, $2/255, $3/255);"
		],
		"description": "new BABYLON.Color3;"
		},
// new BABYLON.Color4();
		"new BABYLON.Color4": {
		"prefix": "c4",
		"body": [
			"new BABYLON.Color4($1/255, $2/255, $3/255, $4);"
		],
		"description": "new BABYLON.Color4;"
		},
// scene;
		"BABYLON scene": {
		"prefix": "s",
		"body": [
			"scene"
		],
		"description": "BABYLON scene"
		},
// StandardMaterial;
		"BABYLON StandardMaterial": {
		"prefix": "mt",
		"body": [
			"new BABYLON.StandardMaterial('$1',scene)"
		],
		"description": "BABYLON scene"
		},
// diffuseColor;
		"BABYLON diffuseColor": {
		"prefix": "dc",
		"body": [
			"diffuseColor = new BABYLON.Color3($1/255, $2/255, $3/255);"
		],
		"description": "BABYLON diffuseColor"
		},
// diffuseColor White;
		"BABYLON diffuseColor White": {
		"prefix": "dc1",
		"body": [
			"diffuseColor =  BABYLON.Color3.White();",
			"$1"
		],
		"description": "BABYLON diffuseColor White"
		},
// diffuseColor Black;
		"BABYLON diffuseColor Black": {
		"prefix": "dc0",
		"body": [
			"diffuseColor = BABYLON.Color3.Black();",
			"$1"
		],
		"description": "BABYLON diffuseColor Black"
		},
// specularColor;
		"BABYLON specularColor": {
		"prefix": "sc",
		"body": [
			"specularColor = new BABYLON.Color3($1/255, $2/255, $3/255);"
		],
		"description": "BABYLON specularColor"
		},
// specularColor White;
		"BABYLON specularColor White": {
		"prefix": "sc1",
		"body": [
			"specularColor = BABYLON.Color3.White();",
			"$1"
		],
		"description": "BABYLON specularColor White"
		},
// specularColor Black;
		"BABYLON specularColor Black": {
		"prefix": "sc0",
		"body": [
			"specularColor = BABYLON.Color3.Black();",
			"$1"
		],
		"description": "BABYLON specularColor Black"
		},
// specularPower;
		"BABYLON specularPower": {
		"prefix": "sp",
		"body": [
			"specularPower = $1;"
		],
		"description": "BABYLON specularPower"
		},
// scene.getElementByName;
"Scene getElementByName": {
		"prefix": "sgn",
		"body": [
			"scene.getElementByName('$1');",
			"$0"
		],
		"description": "Scene getElementByName"
		},
// BABYLON.CreateAndStartAnamation;
"BABYLON CreateAndStartAnamation": {
		"prefix": "cas",
		"body": [
			"BABYLON.Animation.CreateAndStartAnimation(name$1, node$2, 'property$3', framePerSecond$4, totalFrame$4, startValue$5, endValue$6, loop$7);",
			"$0"
		],
		"description": "BABYLON CreateAndStartAnamation"
		},

// new BABYLON Texture;
"new BABYLON Texture": {
		"prefix": "tt",
		"body": [
			"new BABYLON Texture('name$1', scene);$2",
			"$0"
		],
		"description": "new BABYLON Texture"
		},

/*
	// Place your snippets for Javascript (Babel) here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	"Print to console": {
		"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
		"description": "Log output to console"
	}
*/
}

```





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