# Suites
`describe(string, function)`

一个 Suite(describe) 包含多个 Specs(it) ，一个 Specs(it) 包含多个断言 (expect)


# LifeCycle
- beforeEach()：在describe函数中每个Spec执行之前执行。
- afterEach()： 在describe函数中每个Spec数执行之后执行。
- beforeAll()：在describe函数中所有的Specs执行之前执行，但只执行一次，在Sepc之间并不会被执行。
- afterAll()： 在describe函数中所有的Specs执行之后执行，但只执行一次，在Sepc之间并不会被执行。