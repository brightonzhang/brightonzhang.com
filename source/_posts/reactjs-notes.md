---
title: React.js笔记
catalog: true
date: 2019-11-10 17:50:48
updated: 2019-11-10 17:50:48
subtitle:
cover:
categories: 技术
tags: 
- React 
- JavaScript
---

React，是一个用于构建用户界面的 JavaScript 库，提供了DOM 的抽象层。 

本文主要记录React学习笔记。

<!--more--> 



# 学习资料：

[React官网](https://zh-hans.reactjs.org/)

[《React.js 小书》](http://huziketang.mangojuice.top/books/react/)

# JSX

JSX 是 JavaScript 语言的一种语法扩展，长得像 HTML，但并不是 HTML。React.js 可以用 JSX 来描述你的组件长什么样的。JSX 在编译的时候会变成相应的 JavaScript 对象描述。react-dom 负责把这个用来描述 UI 信息的 JavaScript 对象变成 DOM 元素，并且渲染到页面上。

在 JSX 当中可以插入 JavaScript 的表达式，表达式返回的结果会相应地渲染到页面上。表达式用 {} 包裹。{} 内可以放任何 JavaScript 的代码，包括变量、表达式计算、函数执行等等。 render 会把这些代码返回的内容如实地渲染到页面上，非常的灵活。

表达式插入不仅仅可以用在标签内部，也可以用在标签的属性上。

注意，直接使用 class 在 React.js 的元素上添加类名如 <div class=“xxx”> 这种方式是不合法的。因为 class 是 JavaScript 的关键字，所以 React.js 中定义了一种新的方式：className 来帮助我们给元素添加类名。

还有一个特例就是 for 属性，例如 <label for='male'>Male</label>，因为 for 也是 JavaScript 的关键字，所以在 JSX 用 htmlFor 替代，即 <label htmlFor='male'>Male</label>。而其他的 HTML 属性例如 style 、data-* 等就可以像普通的 HTML 属性那样直接添加上去。



# 组件

React.js 中一切皆组件，用 React.js 写的其实就是 React.js 组件。我们在编写 React.js 组件的时候，一般都需要继承 React.js 的 Component（还有别的编写组件的方式）。

一个组件类必须要实现一个 render 方法，这个 render 方法必须要返回一个 JSX 元素——必须要用一个外层的 JSX 元素把所有内容包裹起来。

**自定义的组件都必须要用大写字母开头，普通的 HTML 标签都用小写字母开头**。

## 事件监听

在 React.js 不需要手动调用浏览器原生的 addEventListener 进行事件监听。React.js 帮我们封装好了一系列的 on* 的属性，当你需要为某个元素监听某个事件的时候，只需要简单地给它加上 on* 就可以了。React.js 会给每个事件监听传入一个 event 对象，这个对象提供的功能和浏览器提供的功能一致，而且它是兼容所有浏览器的。

React.js 封装了不同类型的事件，这里就不一一列举，可以参考官网文档： [SyntheticEvent - React](https://facebook.github.io/react/docs/events.html#supported-events)。另外要注意的是，这些事件属性名都必须要用驼峰命名法。

没有经过特殊处理的话，**这些 on\* 的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上**。

React.js 调用你所传给它的方法的时候，并不是通过对象方法的方式调用（this.handleClickOnTitle），而是直接通过函数调用 （handleClickOnTitle），所以事件监听函数内并不能通过 this 获取到实例。如果你想在事件函数当中使用当前的实例，你需要手动地将实例方法 bind 到当前实例上再传入给 React.js。

## state

setState 方法由父类 Component 所提供。**当我们调用这个函数的时候，React.js 会更新组件的状态 state ，并且重新调用 render 方法，然后再把 render 方法所渲染的最新的内容显示到页面上**。

注意，当我们要改变组件的状态的时候，不能直接用 this.state = xxx 这种方式来修改，如果这样做 React.js 就没办法知道你修改了组件的状态，它也就没有办法更新页面。所以，一定要使用 React.js 提供的 setState 方法，**它接受一个对象或者函数作为参数**。

当你调用 setState 的时候，**React.js 并不会马上修改 state**。而是把这个对象放到一个更新队列里面，稍后才会从队列当中把新的状态提取出来合并到 state 当中，然后再触发组件更新。

这里就自然地引出了 setState 的第二种使用方式，可以接受一个函数作为参数。React.js 会把上一个 setState 的结果传入这个函数，你就可以使用该结果进行运算、操作，然后返回一个对象作为更新 state 的对象：

在 React.js 内部会把 JavaScript 事件循环中的消息队列的同一个消息中的 setState 都进行合并以后再重新渲染组件。

## props

**在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为 props 对象的键值**。

组件可以在内部通过 this.props 获取到配置参数，组件可以根据 props 的不同来确定自己的显示形态，达到可配置的效果。可以通过给组件添加类属性 defaultProps 来配置默认参数。props 一旦传入，你就不可以在组件内部对它进行修改。但是你可以通过父组件主动重新渲染的方式来传入新的 props，从而达到更新的效果。

## state vs props

state 的主要作用是用于组件保存、控制、修改自己的可变状态。state 在组件内部初始化，可以被组件自身修改，而外部不能访问也不能修改。你可以认为 state 是一个局部的、只能被组件自身控制的数据源。state 中状态可以通过 this.setState 方法进行更新，setState 会导致组件的重新渲染。

props 的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参数，组件内部无法控制也无法修改。除非外部组件主动传入新的 props，否则组件的 props 永远保持不变。

state 和 props 有着千丝万缕的关系。它们都可以决定组件的行为和显示形态。一个组件的 state 中的数据可以通过 props 传给子组件，一个组件可以使用外部传入的 props 来初始化自己的 state。但是它们的职责其实非常明晰分明：state 是让组件控制自己的状态，props 是让外部对组件自己进行配置。

如果你觉得还是搞不清 state 和 props 的使用场景，那么请记住一个简单的规则：尽量少地用 state，尽量多地用 props。

没有 state 的组件叫无状态组件（stateless component），设置了 state 的叫做有状态组件（stateful component）。因为状态会带来管理的复杂性，我们尽量多地写无状态组件，尽量少地写有状态的组件。这样会降低代码维护的难度，也会在一定程度上增强组件的可复用性。前端应用状态管理是一个复杂的问题，我们后续会继续讨论。

React.js 非常鼓励无状态组件，在 0.14 版本引入了函数式组件——一种定义不能使用 state 组件。

# 渲染列表数据



**如果你往 {} 放一个数组，React.js 会帮你把数组里面一个个元素罗列并且渲染出来**。

**使用 map 渲染列表数据**

**对于用表达式套数组罗列到页面上的元素，都要为每个元素加上 key 属性，这个 key 必须是每个元素唯一的标识**。一般来说，key 的值可以直接后台数据返回的 id



# 处理用户输入



在 React.js 当中必须要用 `setState` 才能更新组件的内容，所以我们需要做的就是：监听输入框的 `onChange` 事件，然后获取到用户输入的内容，再通过 `setState` 的方式更新 `state` 中的 `username`，这样 `input` 的内容才会更新。

```html
...
    <div className='comment-field-input'>
      <input
        value={this.state.username}
        onChange={this.handleUsernameChange.bind(this)} />
    </div>
...
```

上面的代码给 `input` 加上了 `onChange` 事件监听，绑定到 `this.handleUsernameChange` 方法中，该方法实现如下：

```javascript
...
  handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    })
  }
...
```

在这个方法中，我们通过 `event.target.value` 获取 `` 中用户输入的内容，然后通过 `setState` 把它设置到 `state.username` 当中，这时候组件的内容就会更新，`input` 的 `value` 值就会得到更新并显示到输入框内。这时候输入已经没有问题了：



类似于 `input`、`select`、`textarea` 这些元素的 `value` 值被 React.js 所控制、渲染的组件，在 React.js 当中被称为受控组件（Controlled Component）。对于用户可输入的控件，一般都可以让它们成为受控组件，这是 React.js 所推崇的做法。

# **组件生命周期**

React.js 将组件渲染，并且构造 DOM 元素然后塞入页面的过程称为组件的挂载。

React.js 控制组件在页面上挂载和删除过程里面几个方法：

- componentWillMount：组件挂载开始之前，也就是在组件调用 render 方法之前调用。
- componentDidMount：组件挂载完成以后，也就是 DOM 元素已经插入页面后调用。
- componentWillUnmount：组件对应的 DOM 元素从页面中删除之前调用。

除了挂载阶段，还有一种“更新阶段”。说白了就是 `setState` 导致 React.js 重新渲染组件并且把组件的变化应用到 DOM 元素上的过程，*这是一个组件的变化过程*。

1. `shouldComponentUpdate(nextProps, nextState)`：你可以通过这个方法控制组件是否重新渲染。如果返回 `false` 组件就不会重新渲染。这个生命周期在 React.js 性能优化上非常有用。
2. `componentWillReceiveProps(nextProps)`：组件从父组件接收到新的 `props` 之前调用。
3. `componentWillUpdate()`：组件开始重新渲染之前调用。
4. `componentDidUpdate()`：组件重新渲染并且把更改变更到真实的 DOM 以后调用。



# ref

React.js 当中提供了 `ref` 属性来获取已经挂载的元素的 DOM 节点。

```javascript
class AutoFocusInput extends Component {
  componentDidMount () {
    this.input.focus()
  }

  render () {
    return (
      <input ref={(input) => this.input = input} />
    )
  }
}

ReactDOM.render(
  <AutoFocusInput />,
  document.getElementById('root')
)
```

可以看到我们给 `input` 元素加了一个 `ref` 属性，这个属性值是一个函数。当 `input` 元素在页面上挂载完成以后，React.js 就会调用这个函数，并且把这个挂载以后的 DOM 节点传给这个函数。在函数中我们把这个 DOM 元素设置为组件实例的一个属性，这样以后我们就可以通过 `this.input` 获取到这个 DOM 元素。

记住一个原则：*能不用 `ref` 就不用*。



# props.children

使用自定义组件的时候，可以在其中嵌套 JSX 结构。嵌套的结构在组件内部都可以通过 props.children 获取到，这种组件编写方式在编写容器类型的组件当中非常有用。

# **PropTypes**

通过 PropTypes 给组件的参数做类型限制。

先安装一个 React 提供的第三方库 `prop-types`：

```
npm install --save prop-types
```

它可以帮助我们验证 `props` 的参数类型，例如：

```javascript
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object
  }

  render () {
    const { comment } = this.props
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{comment.username} </span>：
        </div>
        <p>{comment.content}</p>
      </div>
    )
  }
}
```



同样地可以在 CommentInput 中使用 wrapWithLoadData，这里就不贴代码了。有兴趣的同学可以查看[高阶组件重构的 CommentApp 版本](https://github.com/huzidaha/react-naive-book-examples/commit/0d67eab713c042301fa4992c719069e92a7243f5)。

# 高阶组件（Higher-Order Components）

高阶组件就是一个函数，传给它一个组件，它返回一个新的组件。新的组件使用传入的组件作为子组件。

```javascript
import React, { Component } from 'react'

export default (WrappedComponent, name) => {
  class NewComponent extends Component {
    constructor () {
      super()
      this.state = { data: null }
    }

    componentWillMount () {
      let data = localStorage.getItem(name)
      this.setState({ data })
    }

    render () {
      return <WrappedComponent data={this.state.data} />
    }
  }
  return NewComponent
}
```

`NewComponent` 会根据第二个参数 `name` 在挂载阶段从 LocalStorage 加载数据，并且 `setState` 到自己的 `state.data` 中，而渲染的时候将 `state.data` 通过 `props.data` 传给 `WrappedComponent`。

这个高阶组件有什么用呢？假设上面的代码是在 `src/wrapWithLoadData.js` 文件中的，我们可以在别的地方这么用它：

```javascript
import wrapWithLoadData from './wrapWithLoadData'

class InputWithUserName extends Component {
  render () {
    return <input value={this.props.data} />
  }
}

InputWithUserName = wrapWithLoadData(InputWithUserName, 'username')
export default InputWithUserName
```

假如 `InputWithUserName` 的功能需求是挂载的时候从 LocalStorage 里面加载 `username` 字段作为 `<input />` 的 `value` 值，现在有了 `wrapWithLoadData`，我们可以很容易地做到这件事情。

高阶组件的作用是用于代码复用，可以把组件之间可复用的代码、逻辑抽离到高阶组件当中。新的组件和传入的组件通过 props 传递信息。



#  Redux

Redux 是一种架构模式（Flux 架构的一种变种），它不关注你到底用什么库，你可以把它应用到 React 和 Vue，甚至跟 jQuery 结合都没有问题。而 React-redux 就是把 Redux 这种架构模式和 React.js 结合起来的一个库，就是 Redux 架构在 React.js 中的体现。

更多参考[Redux笔记](../redux-notes)。



# Smart 组件 vs Dumb 组件



根据是否需要高度的复用性，把组件划分为 Dumb 和 Smart 组件，约定俗成地把它们分别放到 components 和 containers 目录下。

Dumb 基本只做一件事情 —— 根据 props 进行渲染。而 Smart 则是负责应用的逻辑、数据，把所有相关的 Dumb（Smart）组件组合起来，通过 props 控制它们。

Smart 组件可以使用 Smart、Dumb 组件；而 Dumb 组件最好只使用 Dumb 组件，否则它的复用性就会丧失。

要根据应用场景不同划分组件，如果一个组件并不需要太强的复用性，直接让它成为 Smart 即可；否则就让它成为 Dumb 组件。

还有一点要注意，Smart 组件并不意味着完全不能复用，Smart 组件的复用性是依赖场景的，在特定的应用场景下是当然是可以复用 Smart 的。而 Dumb 则是可以跨应用场景复用，Smart 和 Dumb 都可以复用，只是程度、场景不一样。



# Hooks

React v16.8 版本引入了全新的 API，叫做 [React Hooks](https://reactjs.org/docs/hooks-reference.html)，颠覆了以前的用法。

React Hooks 的设计目的，就是加强版函数组件，完全不使用"类"，就能写出一个全功能的组件。组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。React Hooks 就是那些钩子。

所有的钩子都是为函数引入外部功能，所以 React 约定，钩子一律使用`use`前缀命名，便于识别。你要使用 xxx 功能，钩子就命名为 usexxx。

React 默认提供的四个最常用的钩子：
 - useState()
 - useContext()
 - useReducer()
 - useEffect()

```jsx
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```












