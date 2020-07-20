# 

# TI

Travis CI 提供的是持续集成服务（Continuous Integration，简称 CI）。

新的代码 → 提供一个运行环境 → 执行测试 → 完成构建 → 还能部署到服务器

1. install
2. run script
3. notification
4. deploy

status

- passed：运行成功，所有步骤的退出码都是`0`
- canceled：用户取消执行
- errored：`before_install`、`install`、`before_script`有非零退出码，运行会立即停止
- failed ：`script`有非零状态码 ，会继续运行







