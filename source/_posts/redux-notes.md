---
title: Redux笔记
catalog: true
date: 2020-01-26 18:34:25
updated: 2020-01-26 18:34:25
subtitle:
cover:
categories: 技术
tags:
- React 
- JavaScript
---

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

Redux 除了和 [React](https://facebook.github.io/react/) 一起用外，还支持其它界面库。 

本文用于记录redux学习笔记。

<!--more--> 

# 学习资料：

[Redux 中文文档](http://github.com/camsong/redux-in-chinese)
[Redux 入门教程 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
[React + Redux 简介 JinYang's Blog](https://jin-yang.github.io/post/react-redux-introduce.html)

#  简介

Redux 的设计思想很简单：

* Web 应用是一个状态机，视图与状态是一一对应。
* 所有的状态，保存在一个对象里面。

Redux 可以用这三个基本原则来描述：

* 单一数据源：整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store  中。
* State 是只读的：唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
* 使用纯函数来执行修改：为了描述 action 如何改变 state tree ，你需要编写 reducers。Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。

# 基本概念

## Store

Store 就是保存数据的地方，可以把它看成一个容器，整个应用只能有一个 Store。

## State

Store 对象包含所有数据，如果想得到某个时点的数据，就要对 Store 生成快照，这种时点的数据集合，就叫做 State 。

当前时刻的 State 可以通过 `store.getState()` 拿到。

Redux 规定，state 和 view 一一对应，一个 State 对应一个 View，只要 State 相同，View 就相同；反之亦然。

## Action

**Action** 是把数据从应用传到 store 的有效载荷。它是 store 数据的**唯一**来源。一般来说你会通过 [`store.dispatch()`](https://cn.redux.js.org/docs/api/Store.html#dispatch) 将 action 传到 store。

```js
const ADD_TODO = 'ADD_TODO'

{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 `type` 字段来表示将要执行的动作。除了 `type` 字段外，action 对象的结构完全由你自己决定。

**我们应该尽量减少在 action 中传递的数据**。

### Action 创建函数

**Action 创建函数** 就是生成 action 的方法。在 Redux 中的 action 创建函数只是简单的返回一个 action:

```js
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

Redux 中只需把 action 创建函数的结果传给 `dispatch()` 方法即可发起一次 dispatch 过程。

```js
dispatch(addTodo(text))
```

或者创建一个 **被绑定的 action 创建函数** 来自动 dispatch，然后直接调用它们：

```js
const boundAddTodo = text => dispatch(addTodo(text))

boundAddTodo(text);
```


## Reducer

Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。

reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。保持 reducer 纯净非常重要。只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。

```js
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}
```
注意:
1. 不要修改 `state`。
2. **在 `default` 情况下返回旧的 `state`。**遇到未知的 action 时，一定要返回旧的 `state`。

###  combineReducers()

可以根据需求，构造很多功能独立的reducer——每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 `state` 参数都不同，分别对应它管理的那部分 state 数据。我们还可以将拆分后的 reducer 放到不同的文件中, 以保持其独立性并用于专门处理不同的数据域。Redux 提供了 [`combineReducers()`](https://cn.redux.js.org/docs/api/combineReducers.html) 工具类合并reducers。

```js
import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

/* 
上面的写法和下面完全等价：
const todoApp = function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
*/

export default todoApp
```



## 数据流

总结一下： action用来描述“发生了什么”， reducers用来根据 action 更新 state ，Store 就是把它们联系到一起的对象。Store 有以下职责：

- 维持应用的 state；
- 提供 [`getState()`](https://cn.redux.js.org/docs/api/Store.html#getState) 方法获取 state；
- 提供 [`dispatch(action)`](https://cn.redux.js.org/docs/api/Store.html#dispatch) 方法更新 state；
- 通过 [`subscribe(listener)`](https://cn.redux.js.org/docs/api/Store.html#subscribe) 注册监听器;
- 通过 [`subscribe(listener)`](https://cn.redux.js.org/docs/api/Store.html#subscribe) 返回的函数注销监听器。

将 reducer 作为 `createStore()`参数创建store。
```js
import { createStore } from 'redux'
import todoApp from './reducers'
let store = createStore(todoApp)
```
`createStore()`的第二个参数是可选的, 用于设置 state 初始状态。

**严格的单向数据流**是 Redux 架构的设计核心。

Redux 应用中数据的生命周期遵循下面 4 个步骤：

1. 调用`store.dispatch(action)`
2. Redux store 调用传入的 reducer 函数。Store 会把两个参数传入 reducer： 当前的 state 树和 action。
3. 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。
4. Redux store 保存了根 reducer 返回的完整 state 树。这个新的树就是应用的下一个 state！所有订阅 store.subscribe(listener) 的监听器都将被调用；监听器里可以调用 store.getState() 获得当前 state。

![Redux工作流程](react-redux-model1.png)

# react-redux

Redux 和 React 之间没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。尽管如此，Redux 还是和 [React](http://facebook.github.io/react/) 和 [Deku](https://github.com/dekujs/deku) 这类库搭配起来用最好，因为这类库允许你以 state 函数的形式来描述界面，Redux 通过 action 的形式来发起 state 变化。

```sh
npm install --save react-redux
```

## 展示组件 Dumb/Presentational Components

展示组件就是用来描述如何展现（骨架、样式），并不直接使用redux，数据来源就是props。只定义外观并不设计数据从哪里来，如果改变它。传入什么就渲染什么。
e.g.: 

```js
// components/Todo.js
import React, { PropTypes } from 'react'

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
```

```jsx
// components/TodoList.js
import React, { PropTypes } from 'react'
import Todo from './Todo”

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList
```

## 容器组件 Smart/Container Components

容器组件把展示组件和 Redux 关联起来。技术上讲，容器组件就是使用`store.subscribe()` 从 Redux state 树中读取部分数据，并通过 props 来把这些数据提供给要渲染的组件。可以手工来开发容器组件，但建议使用 React Redux 库的 [`connect()`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) 方法来生成，这个方法做了性能优化来避免很多不必要的重复渲染。

使用 `connect()` 前，需要先定义 `mapStateToProps` 函数来指定如何把当前 Redux store state 映射到展示组件的 props 中，定义 `mapDispatchToProps()` 方法接收 [`dispatch()`](https://cn.redux.js.org/docs/api/Store.html#dispatch) 方法并返回期望注入到展示组件的 props 中的回调方法。
```jsx
// containers/VisibleTodoList.js
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```

## Provider

所有容器组件都可以访问 Redux store，所以可以手动监听它。一种方式是把它以 props 的形式传入到所有容器组件中。但这太麻烦了，因为必须要用 `store` 把展示组件包裹一层，仅仅是因为恰好在组件树中渲染了一个容器组件。建议的方式是使用指定的 React Redux 组件 `<Provider>`让所有容器组件都可以访问 store，而不必显式地传递它。只需要在渲染根组件时使用即可。

```jsx
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

# Middleware

Redux middleware 提供了位于 action 被发起之后，到达 reducer 之前的扩展点。 你可以利用 Redux middleware 来进行日志记录、创建崩溃报告、调用异步接口或者路由等等。

## applyMiddlewares()

`applyMiddlewares()`是 Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行，如下是源码。
```js
export default function applyMiddleware(...middlewares) {
	return (createStore) => (reducer, preloadedState, enhancer) => {
		var store = createStore(reducer, preloadedState, enhancer);
		var dispatch = store.dispatch;
		var chain = [];

		var middlewareAPI = {
			getState: store.getState,
			dispatch: (action) => dispatch(action)
		};
		chain = middlewares.map(middleware => middleware(middlewareAPI));
		dispatch = compose(...chain)(store.dispatch);

		return {...store, dispatch}
	}
}
```
上面代码中，所有中间件被放进了一个数组 chain，然后嵌套执行，最后执行 `store.dispatch()` 。


# 异步操作

同步操作只要发出一种 Action 即可，异步操作的差别是它要发出三种 Action：

- 操作发起时的 Action；
- 操作成功时的 Action；
- 操作失败时的 Action 。

以向服务器取出数据为例，三种 Action 可以有两种不同的写法。

```js
// 写法一：名称相同，参数不同
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }

// 写法二：名称不同
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }
```

除了 Action 种类不同，异步操作的 State 也要进行改造，反映不同的操作状态，下面是 State 的一个例子。

```js
let state = {
	// ...
	isFetching: true,
	didInvalidate: true,
	lastUpdated: 'xxxxxxx'
};
```

上面代码中，State 的属性 `isFetching` 表示是否在抓取数据，`didInvalidate` 表示数据是否过时，`lastUpdated` 表示上一次更新时间。

整个异步操作的思路：

- 操作开始时，送出一个 Action，触发 State 更新为”正在操作”状态，View 重新渲染；
- 操作结束后，再送出一个 Action，触发 State 更新为”操作结束”状态，View 再一次重新渲染。

##  redux-thunk

通过使用[Redux Thunk middleware](https://github.com/reduxjs/redux-thunk)，action 创建函数除了返回 action 对象外还可以返回函数。这时，这个 action 创建函数就成为了 thunk。当 action 创建函数返回函数时，这个函数会被 Redux Thunk middleware 执行。这个函数并不需要保持纯净；它还可以带有副作用，包括执行异步 API 请求。这个函数还可以 dispatch action，就像 dispatch 前面定义的同步 action 一样。
```js
// thunk action 创建函数
// 虽然内部操作不同，你可以像其它 action 创建函数 一样使用它：
// store.dispatch(fetchPosts('reactjs'))

export function fetchPosts(subreddit) {

  // Thunk middleware 知道如何处理函数。
  // 这里把 dispatch 方法通过参数的形式传给函数，
  // 以此来让它自己也能 dispatch action。

  return function (dispatch) {

    // 首次 dispatch：更新应用的 state 来通知”
    // API 请求发起了。

    dispatch(requestPosts(subreddit))
    
    // thunk middleware 调用的函数可以有返回值，
    // 它会被当作 dispatch 方法的返回值传递。
    
    // 这个案例中，我们返回一个等待处理的 promise。
    // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。
    
    return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json =>
    
        // 可以多次 dispatch！
        // 这里，使用 API 请求结果来更新应用的 state。
    
        dispatch(receivePosts(subreddit, json))
      )
    
      // 在实际应用中，还需要捕获网络请求的异常。
  }
}
```

使用了 applyMiddleware()在 dispatch 机制中引入 Redux Thunk middleware :
```js
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // 允许我们 dispatch() 函数
    loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
  )
)
```

像 redux-thunk 或 redux-promise 这样支持异步的 middleware 都包装了 store 的 dispatch() 方法，以此来让你 dispatch 一些除了 action 以外的其他内容，例如：函数或者 Promise。你所使用的任何 middleware 都可以以自己的方式解析你 dispatch 的任何内容，并继续传递 actions 给下一个 middleware。比如，支持 Promise 的 middleware 能够拦截 Promise，然后为每个 Promise 异步地 dispatch 一对 begin/end actions。

当 middleware 链中的最后一个 middleware 开始 dispatch action 时，这个 action 必须是一个普通对象。这是 同步式的 Redux 数据流 开始的地方（即，你可以使用任意多异步的 middleware 去做你想做的事情，但是需要使用普通对象作为最后一个被 dispatch 的 action ，来将处理流程带回同步方式）。

# Hooks

Using Redux with React Hooks https://thoughtbot.com/blog/using-redux-with-react-hooks

https://react-redux.js.org/next/api/hooks

