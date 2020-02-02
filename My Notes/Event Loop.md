# Task
- MacroTask
    - script
    - setTimeout
    - setInterval
    - setImmediate（node）
    - I/O
    - UI rendering
- MicroTask
    - process.nextTick（node）
    - Promises
    - Object.observe(废弃)
    - MutationObserver

在同一个上下文中，总的执行顺序为 `同步代码` —> `microTask` —> `macroTask` 