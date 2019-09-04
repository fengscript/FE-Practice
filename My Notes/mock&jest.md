# 1 Jest

Jest 会自动找到项目中所有使用.spec.js 或.test.js 文件命名的测试文件并执行，通常我们在编写测试文件时遵循的命名规范：测试文件的文件名 = 被测试模块名 + .test.js，例如被测试模块为 functions.js，那么对应的测试文件命名为 functions.test.js。


## Block 

### Suites

`describe(string, function)`

一个 Suite(describe) 包含多个 Specs(it) ，一个 Specs(it) 包含多个断言 (expect)

### it test

xit ：临时排除某个specs
fit ：临时提高某个specs优先级
test.only : 只运行一个测试

## Assertion

- expect
- .toEqual() 递归的检查对象所有属性和属性值是否相等
- .toBe() 类型的比较
- .not

## LifeCycle
当 before 和 after 的块在 describe 块内部时，则其只适用于该 describe 块内的测试

beforeEach 和 afterEach 能够通过与 异步代码测试 相同的方式处理异步代码

- beforeEach()：在 describe 函数中每个 Spec 执行之前执行。
- afterEach()： 在 describe 函数中每个 Spec 数执行之后执行。
- beforeAll()：在 describe 函数中所有的 Specs 执行之前执行，但只执行一次，在 Sepc 之间并不会被执行。
- afterAll()： 在 describe 函数中所有的 Specs 执行之后执行，但只执行一次，在 Sepc 之间并不会被执行。

Jest 会在所有真正的测试开始之前执行测试文件里所有的 describe 处理程序（handlers）。 这是在 before* 和 after* 处理程序里面 （而不是在 describe 块中）进行准备工作和整理工作的另一个原因。 当 describe 块运行完后，默认情况下，Jest 会按照 test 出现的顺序依次运行所有测试

## 断言和匹配器
常用
- expect.assertions（number）
  验证在测试期间是否调用了一定数量的断言。 这在测试异步代码时通常很有用，以确保实际调用回调中的断言。


- expect(value)
- expect.extend(matchers)
- expect.anything()
- expect.any(constructor)
- expect.arrayContaining(array)
- expect.hasAssertions()
- expect.not.arrayContaining(array)
- expect.not.objectContaining(object)
- expect.not.stringContaining(string)
- expect.not.stringMatching(string | regexp)
- expect.objectContaining(object)
- expect.stringContaining(string)
- expect.stringMatching(string | regexp)
- expect.addSnapshotSerializer(serializer)
- .not
- .resolves
- .rejects
- .toBe(value) 比较数字 字符串
- .toHaveBeenCalled()
- .toHaveBeenCalledTimes(number)
- .toHaveBeenCalledWith(arg1, arg2, ...)
- .toHaveBeenLastCalledWith(arg1, arg2, ...)
- .toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)
- .toHaveReturned()
- .toHaveReturnedTimes(number)
- .toHaveReturnedWith(value)
- .toHaveLastReturnedWith(value)
- .toHaveNthReturnedWith(nthCall, value)
- .toBeCloseTo(number, numDigits)
- .toBeDefined()
- .toBeFalsy()
- .toBeGreaterThan(number)
- .toBeGreaterThanOrEqual(number)
- .toBeLessThan(number)
- .toBeLessThanOrEqual(number)
- .toBeInstanceOf(Class)
- .toBeNull()
- .toBeTruthy()
- .toBeUndefined()
- .toContain(item)
- .toContainEqual(item)
- .toEqual(value) 比较对象 数组
    递归的检查对象所有属性和属性值是否相等
- .toHaveLength(number)
- .toMatch(regexpOrString)
- .toMatchObject(object)
- .toHaveProperty(keyPath, value)
- .toMatchSnapshot(propertyMatchers, snapshotName)
- .toStrictEqual(value)
- .toThrow(error)
- .toThrowErrorMatchingSnapshot()


# 2 Enzyme

## react component
- setup()模拟prop，渲染组件
- shallow : 仅仅渲染至虚拟节点，不会返回真实的节点，能极大提高测试性能。但是它不适合测试包含子组件、需要测试声明周期的组件

- mount：FullRendering，非常适用于存在于 DOM API 存在交互组件，或者需要测试组件完整的声明周期

- render：Static Rendering，用于 将 React 组件渲染成静态的 HTML 并分析生成的 HTML 结构。render 返回的 wrapper 与其他两个 API 类似。不同的是 render 使用了第三方 HTML 解析器和 Cheerio。

- find() 找到一个dom元素
- simulate() 模拟dom事件
- toBeCalled() 测试props传递过来的函数是否被调用
- not().toBeCalled()
- length()
- toHaveLength()
```js
import React from 'react'
import App from '../../src/component/App'
import { shallow } from 'enzyme

const setup = () => {
  // 模拟 props
  const props = {
    // Jest 提供的mock 函数
    onAddClick: jest.fn()
  }

  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(<AddTodoView {...props} />)
  return {
    props,
    wrapper
  }
}

describe('AddTodoView', () => {
  const { wrapper, props } = setup();

  // case1
  // 通过查找存在 Input,测试组件正常渲染
  it('AddTodoView Component should be render', () => {
    //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
    // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
    expect(wrapper.find('input').exists());
  })
})

 it('When the Enter key was pressed, onAddClick() shoule be called', () => {
    // mock input 输入和 Enter事件
    const mockEvent = {
      keyCode: 13, // enter 事件
      target: {
        value: 'Test'
      }
    }
    // 通过 Enzyme 提供的 simulate api 模拟 DOM 事件
    wrapper.find('input').simulate('keyup',mockEvent)
    // 判断 props.onAddClick 是否被调用
    expect(props.onAddClick).toBeCalled()
  })
```

来一个有 mount的
```js
组件测试

// Tab.js
import React from 'react'
import PropTypes from 'prop-types'
import TabCell from './TabCell'

import styles from './index.css'

const Tab = ({ type, activeTab, likes_count: liked, goings_count: going, past_count: past, handleTabClick }) => {
  return (<div className={styles.tab}>
    {type === 'user'
      ? <div>
        <TabCell type='liked' text={`${liked} Likes`} isActived={activeTab === 'liked'} handleTabClick={handleTabClick} />
        <TabCell type='going' text={`${going} Going`} isActived={activeTab === 'going'} handleTabClick={handleTabClick} />
        <TabCell type='past' text={`${past} Past`} isActived={activeTab === 'past'} handleTabClick={handleTabClick} />
      </div>
      : <div>
        <TabCell type='details' text='Details' isActived={activeTab === 'details'} handleTabClick={handleTabClick} />
        <TabCell type='participant' text='Participant' isActived={activeTab === 'participant'} handleTabClick={handleTabClick} />
        <TabCell type='comment' text='Comment' isActived={activeTab === 'comment'} handleTabClick={handleTabClick} />
      </div>
    }
  </div>)
}

Tab.propTypes = {
  type: PropTypes.string,
  activeTab: PropTypes.string,
  likes_count: PropTypes.number,
  goings_count: PropTypes.number,
  past_count: PropTypes.number,
  handleTabClick: PropTypes.func
}

export default Tab
// Tab.test.js
import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import Tab from 'components/Common/Tab'
import TabCell from 'components/Common/Tab/TabCell'

const setup = () => {
  // 模拟props
  const props = {
    type: 'activity',
    activeTab: 'participant',
    handleTabClick: jest.fn()
  }
  const sWrapper = shallow(<Tab {...props} />)
  const mWrapper = mount(<Tab {...props} />)
  return {
    props,
    sWrapper,
    mWrapper
  }
}

describe('Tab components', () => {
  const { sWrapper, mWrapper, props } = setup()

  it("get child component TabCell's length", () => {
    expect(sWrapper.find(TabCell).length).toBe(3)
    expect(mWrapper.find(TabCell).length).toBe(3)
  })

  it("get child component's specific class", () => {
    // expect(sWrapper.find('.commentItem .text').length).toBe(1)
    // expect(sWrapper.find('.commentItem .text').exists()).toBeTruthy()
    // expect(sWrapper.find('.commentItem .text')).toHaveLength(1)
    expect(mWrapper.find('.commentItem .text').length).toBe(1)
    expect(sWrapper.find('.commentItem .text').length).toBe(1)
  })

  test('mountWrapper function to be called', () => {
    mWrapper.find('.active .text').simulate('click')
    expect(props.handleTabClick).toBeCalled()
  })

  it('set props', () => {
    expect(mWrapper.find('.participantItem.active')).toHaveLength(1)
    mWrapper.setProps({activeTab: 'details'})
    expect(mWrapper.find('.detailsItem.active')).toHaveLength(1)
  })

  // Snapshot
  it('Snapshot', () => {
    const tree = renderer.create(<Tab {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
```

## jest.fn()

```javascript
test("mock test", () => {
 const mock = jest.fn(()=> 'jest.fn test');
 expect(mock()).toBe('jest.fn test'); //函数返回结果
 expect(mock).toHaveBeenCalled(); //函数被调用
 expect(mock).toHaveBeenCalledTimes(1); //调用1次
});

test("mock 返回值", () => {
  const mock = jest.fn();
  mock.mockReturnValue("return value"); //mock 返回值
  expect(mock()).toBe("return value");
});

test("mock promise", () => {
  const mock = jest.fn();
  mock.mockResolvedValue("promise resolve"); // mock promise

  expect(mock("promise")).resolves.toBe("promise resolve");
  expect(mock).toHaveBeenCalledWith("promise"); // 调用参数检验
});

//或者使用赋值的形式 
function add(v1,v2){
  return v1 + v2
}

add = jest.fn()

test("mock dependency", () => {
  add(1,2)
  expect(add).toHaveBeenCalledWith(1,2)
});

```

## jest.mock()

```javascript

```




# 3 react-saga-testing

`react-saga-testing`

例如对于：
```js
function * testSaga () {
  try {
    yield put({type: 'FETCHING'})
    const data = yield call(loadData)
    yield put({type: 'FETCHED', payload: data})
  } catch (e) {
    yield put({type: 'FETCHED', payload: e})
  }
```
测试：
```js
const fromGenerator = require('redux-saga-test');
 
test('saga', (t) => {
  const expect = fromGenerator(t, testSaga()) // <= pass your assert library with a `deepEqual` method.
 
  expect.next().put({type: 'FETCHING'})
  expect.next().call(loadData)
  expect.next(mockData).put({type: 'FETCHED', payload: mockData})
  expect.next().returns()
})
```

# 4 selector

# 5 action

# 6 reducer

# 7 deepFreeze 

`deepFreeze.js`

```js
var deepFreeze = require('deep-freeze');

deepFreeze(Buffer);
Buffer.x = 5;
console.log(Buffer.x === undefined);

Buffer.prototype.z = 3;
console.log(Buffer.prototype.z === undefined);
```

## with jest

`reducer.spec.js`
```javascript
...

const stateBefore = {...}
const stateAfter = {...}
const action = {...}

deepFreeze(stateBefore)
deepFreeze(action)

expect(reduce(stateBefore, action)).toEqual(stateAfter)

...
```




# 8 sinon

JavaScript test spies, stubs and mocks.

Sinon通过所谓的测试替代(test-double)轻松消除测试的复杂度

https://segmentfault.com/a/1190000010372634

## spy
spy的作用在于可以监视一个函数被调用的情况。spy相当于给我们感兴趣的函数加了一层wrapper，于是记录下了这个函数被调用过几次，每次传入的参数是什么以及每次返回的结果是什么，或是抛出了怎样的异常。

检查传递给函数的参数
```js
it('should pass object with correct values to save', function() {
  var save = sinon.spy(Database, 'save');
  var info = { name: 'test' };
  var expectedUser = {
    name: info.name,
    nameLowercase: info.name.toLowerCase()
  };

  setupNewUser(info, function() { });

  save.restore();
  sinon.assert.calledWith(save, expectedUser);
});
```


## stub
拥有spies的所有功能，不是监视某个函数的调用情况，而是完全取代了这个函数。换句话说，当使用spies时，原始函数仍然运行，但是当使用stub时，函数将不具有原始的功能，而是替换后的函数

- 代替有问题的代码段
- 触发不会触发的代码路径，例如错误处理
- 来帮助测试异步代码更容易

测试函数f1，f1依赖于函数f2，我们需要测试f1在f2的不同表现之下有怎样的表现。但是让f2有不同的表现可能会很不容易，有可能需要复杂的配置或是精巧的捏造，或是f2出现某种表现的几率很小等等。这时stub就可派上用场，stub就是人为设定的f2的替代品。我们可以设定stub在怎样的输入下有怎样特定的表现，从而不再阻碍对f1的测试。

例如，在运行测试之前，我们需要填写一个带有测试数据的数据库，这使得运行和写入更复杂。
```js
it('should pass object with correct values to save', function() {
  var save = sinon.stub(Database, 'save');
  var info = { name: 'test' };
  var expectedUser = {
    name: info.name,
    nameLowercase: info.name.toLowerCase()
  };

  setupNewUser(info, function() { });

  save.restore();
  sinon.assert.calledWith(save, expectedUser);
});
```



## mock
mock在Sinon.js中用于对一个object的活动进行监视。一个object被mock以后，就可以设定我们对这个object有怎样的预期。这里的预期例如：某方法被调用了多少次（或至少至多多少次）、某方法一定没被调用、某方法被输入怎样的参数来调用、等等。

mock对一个object的监视类似于spy对一个函数的监视。两者的关键区别在于使用场景，spy客观地监视了一个函数的表现，对这个函数的调用都真正执行了。而mock出的object收到了数据或是调用并没有真正执行，一切针对mock的调用都是假的。所以mock可以用来测试具有side effect的函数，这里的side effect泛指和外部对象有数据交互或者是调用，比如调用外部对象的方法、向server发送数据、和UI对象有交互、写日志等
```javascript
var sinon = require("sinon");

var obj = {
  ...
};

var mock = sinon.mock(obj);
mock.expect("f").atLeast(2).withArgs(10); // obj.f(10)调用至少出现过2次

...

mock.verify(); // 测试此时的obj是否满足上面的mock设定条件
mock.restore();
```


# 9 json-server

```bash
npm install -g json-server

yarn start
```

`s+enter` 生成一个 snapshot

cli 参数：

json-server [options] <source>

```bash
Options:
  --config, -c       Path to config file           [default: "json-server.json"]
  --port, -p         Set port                                    [default: 3000]
  --host, -H         Set host                             [default: "localhost"]
  --watch, -w        Watch file(s)                                     [boolean]
  --routes, -r       Path to routes file
  --middlewares, -m  Paths to middleware files                           [array]
  --static, -s       Set static files directory
  --read-only, --ro  Allow only GET requests                           [boolean]
  --no-cors, --nc    Disable Cross-Origin Resource Sharing             [boolean]
  --no-gzip, --ng    Disable GZIP Content-Encoding                     [boolean]
  --snapshots, -S    Set snapshots directory                      [default: "."]
  --delay, -d        Add delay to responses (ms)
  --id, -i           Set database id property (e.g. _id)         [default: "id"]
  --foreignKeySuffix, --fks  Set foreign key suffix, (e.g. _id as in post_id)
                                                                 [default: "Id"]
  --quiet, -q        Suppress log messages from output                 [boolean]
  --help, -h         Show help                                         [boolean]
  --version, -v      Show version number                               [boolean]

```

Examples:
  json-server db.json
  json-server file.js
  json-server http://example.com/db.json

https://github.com/typicode/json-server
You can also set options in a json-server.json configuration file.

{
  "port": 3000
}

