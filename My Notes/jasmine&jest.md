# Pre

Jest 会自动找到项目中所有使用.spec.js 或.test.js 文件命名的测试文件并执行，通常我们在编写测试文件时遵循的命名规范：测试文件的文件名 = 被测试模块名 + .test.js，例如被测试模块为 functions.js，那么对应的测试文件命名为 functions.test.js。


# Suites

`describe(string, function)`

一个 Suite(describe) 包含多个 Specs(it) ，一个 Specs(it) 包含多个断言 (expect)

# it test

xit ：临时排除某个specs
fit ：临时提高某个specs优先级

# Assertion

- expect
- .toEqual() 递归的检查对象所有属性和属性值是否相等
- .toBe() 类型的比较
- .not

# LifeCycle

- beforeEach()：在 describe 函数中每个 Spec 执行之前执行。
- afterEach()： 在 describe 函数中每个 Spec 数执行之后执行。
- beforeAll()：在 describe 函数中所有的 Specs 执行之前执行，但只执行一次，在 Sepc 之间并不会被执行。
- afterAll()： 在 describe 函数中所有的 Specs 执行之后执行，但只执行一次，在 Sepc 之间并不会被执行。
