---
title: Professional Android笔记：Activity和UI
catalog: true
date: 2017-04-10 10:17:53
subtitle:
updated: 2017-04-10 10:17:53
cover: 1iTDUQIbX397042030.jpg
categories:
- 技术
tags: 
- 安卓
- Android
- Activity
---

# ACTIVITIES

`Activity` 是一个应用组件，用户可与其提供的屏幕进行交互，以执行某些操作。 每个 Activity 都会获得一个用于绘制其用户界面的窗口。窗口通常会充满屏幕，但也可小于屏幕并浮动在其他窗口之上。

一个应用通常由多个彼此松散联系的 Activity 组成。 一般会指定应用中的某个 Activity 为“主”Activity，即首次启动应用时呈现给用户的那个 Activity。 而且每个 Activity 均可启动另一个 Activity，以便执行不同的操作。 每次新 Activity 启动时，前一 Activity 便会停止，但系统会在堆栈（“返回栈”）中保留该 Activity。 当新 Activity 启动时，系统会将其推送到返回栈上，并取得用户焦点。 返回栈遵循基本的“后进先出”堆栈机制，因此，当用户完成当前 Activity 并按“返回”按钮时，系统会从堆栈中将其弹出（并销毁），然后恢复前一 Activity——可以参考文档[任务和返回栈](https://developer.android.com/guide/components/tasks-and-back-stack.html)。

当一个 Activity 因某个新 Activity 启动而停止时，系统会通过该 Activity 的生命周期回调方法通知其这一状态变化。Activity 因状态变化——系统是创建 Activity、停止 Activity、恢复 Activity 还是销毁 Activity——而收到的回调方法可能有若干种，每一种回调都会为您提供执行与该状态变化相应的特定操作的机会。 例如，停止时，您的 Activity 应释放任何大型对象，例如网络或数据库连接。 当 Activity 恢复时，您可以重新获取所需资源，并恢复执行中断的操作。 这些状态转变都是 Activity 生命周期的一部分。



## 操作Activity

首先必须在清单文件中声明Activity，这样系统才能访问它：将 `activity` 元素添加为 `application` 元素的子项。`activity` 元素还可指定各种 Intent 过滤器——使用 `intent-filter` 元素——以声明其他应用组件激活它的方法。

要创建 Activity，必须创建 `Activity` 的子类（或使用其现有子类）。并需要在子类中实现 Activity 在其生命周期的各种状态之间转变时（例如创建 Activity、停止 Activity、恢复 Activity 或销毁 Activity 时）系统调用的回调方法。 两个最重要的回调方法是：`onCreate()`和`onPause()`。

Activity 的用户界面是由层级式视图——衍生自 `View` 类的对象——提供的。每个视图都控制 Activity 窗口内的特定矩形空间，可对用户交互作出响应。可以通过 `setContentView()` 将视图设置为 Activity 的 UI。

启动Activity的方法：

- `startActivity()`
- `startActivityForResult()`：当后续 Activity 完成时，会使用 Intent 向onActivityResult() 回调方法返回结果。

结束Activity的方法：

- `finish()` 
-  `finishActivity()`： 结束之前启动的另一个Activity。

在大多数情况下，不应使用这些方法显式结束 Activity——因为Android 系统会管理 Activity 的生命周期。

## Activity 生命周期

Activity 存在以下状态：

- 继续 resumed/active/running

  此 Activity 位于屏幕前台并具有用户焦点。

- 暂停 paused

  另一个 Activity 位于屏幕前台并具有用户焦点，但此 Activity 仍可见。也就是说，另一个 Activity 显示在此 Activity 上方，并且该 Activity 部分透明或未覆盖整个屏幕。 暂停的 Activity 处于完全活动状态（`Activity` 对象保留在内存中，它保留了所有状态和成员信息，并与窗口管理器保持连接），但在内存极度不足的情况下，可能会被系统终止。

- 停止 stopped

  该 Activity 被另一个 Activity 完全遮盖（该 Activity 目前位于“后台”）。 已停止的 Activity 同样仍处于活动状态（`Activity` 对象保留在内存中，它保留了所有状态和成员信息，但未与窗口管理器连接）。 不过，它对用户不再可见，在他处需要内存时可能会被系统终止。

- Inactive

  After an Activity has been killed, as well as before it’s been launched, it’s inactive. Inactive Activities have been removed from the Activity stack and need to be restarted before they can be displayed and used.

### 生命周期回调

当一个 Activity 转入和转出上述不同状态时，系统会通过各种回调方法向其发出通知。

```java
public class ExampleActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // The activity is being created.
    }
    @Override
    protected void onStart() {
        super.onStart();
        // The activity is about to become visible.
    }
    @Override
    protected void onResume() {
        super.onResume();
        // The activity has become visible (it is now "resumed").
    }
    @Override
    protected void onPause() {
        super.onPause();
        // Another activity is taking focus (this activity is about to be "paused").
    }
    @Override
    protected void onStop() {
        super.onStop();
        // The activity is no longer visible (it is now "stopped")
    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        // The activity is about to be destroyed.
    }
}
```

这些方法共同定义 Activity 的整个生命周期。通过实现这些方法来监控 Activity 生命周期中的三个嵌套循环：

- Activity 的**整个生命周期**发生在 `onCreate()` 调用与 `onDestroy()` 调用之间。Activity 应在 `onCreate()` 中执行“全局”状态设置（例如定义布局），并在 `onDestroy()` 中释放所有资源。例如，如果 Activity 有一个在后台运行的线程，用于从网络上下载数据，它可能会在 `onCreate()` 中创建该线程，然后在 `onDestroy()` 中停止该线程。
- Activity 的**可见生命周期**发生在 `onStart()` 调用与 `onStop()` 调用之间。在这段时间，用户可以在屏幕上看到 Activity 并与其交互。 例如，当一个新 Activity 启动，并且此 Activity 不再可见时，系统会调用 `onStop()`。您可以在调用这两个方法之间保留向用户显示 Activity 所需的资源。 例如，您可以在 `onStart()` 中注册一个 `BroadcastReceiver` 以监控影响 UI 的变化，并在用户无法再看到您显示的内容时在 `onStop()` 中将其取消注册。在 Activity 的整个生命周期，当 Activity 在对用户可见和隐藏两种状态中交替变化时，系统可能会多次调用 `onStart()` 和 `onStop()`。
- Activity 的**前台生命周期**发生在 `onResume()` 调用与 `onPause()` 调用之间。在这段时间，Activity 位于屏幕上的所有其他 Activity 之前，并具有用户输入焦点。 Activity 可频繁转入和转出前台——例如，当设备转入休眠状态或出现对话框时，系统会调用 `onPause()`。 由于此状态可能经常发生转变，因此这两个方法中应采用适度轻量级的代码，以避免因转变速度慢而让用户等待。

下图说明了这些循环以及 Activity 在状态转变期间可能经过的路径。矩形表示回调方法，当 Activity 在不同状态之间转变时，可以实现这些方法来执行操作。

<img src="https://developer.android.com/images/activity_lifecycle.png" alt="Activity 生命周期">

### 保存 Activity 状态

当 Activity 暂停或停止时，`Activity` 对象仍保留在内存中——有关其成员和当前状态的所有信息仍处于活动状态。 用户在 Activity 内所做的任何更改都会得到保留，这样一来，当 Activity 返回前台（当它“继续”）时，这些更改仍然存在。

不过，当系统为了恢复内存而销毁某项 Activity 时，`Activity` 对象也会被销毁，因此系统在继续 Activity 时根本无法让其状态保持完好，而是必须在用户返回 Activity 时重建 `Activity` 对象。 在这种情况下，可以实现另一个回调方法对有关 Activity 状态的信息进行保存，以确保有关 Activity 状态的重要信息得到保留：`onSaveInstanceState()`。

系统会先调用 `onSaveInstanceState()`，然后再使 Activity 变得易于销毁。系统会向该方法传递一个 `Bundle`，可以在其中使用 `putString()` 和 `putInt()` 等方法以“名称-值”对形式保存有关 Activity 状态的信息。然后，如果系统终止您的应用进程，并且用户返回您的 Activity，则系统会重建该 Activity，并将 `Bundle` 同时传递给 `onCreate()` 和 `onRestoreInstanceState()`。您可以使用上述任一方法从 `Bundle` 提取您保存的状态并恢复该 Activity 状态。如果没有状态信息需要恢复，则传递给您的 `Bundle` 是空值（如果是首次创建该 Activity，就会出现这种情况）。

<img src="https://developer.android.com/images/fundamentals/restore_instance.png" alt="">



有些设备配置可能会在运行时发生变化（例如屏幕方向、键盘可用性及语言）。 发生此类变化时，Android 会重建运行中的 Activity（系统调用 `onDestroy()`，然后立即调用 `onCreate()`）。处理此类重启的最佳方法是利用`onSaveInstanceState()` 和 `onRestoreInstanceState()`（或 `onCreate()`）保存并恢复 Activity 的状态。

### 协调 Activity

当一个 Activity 启动另一个 Activity 时，它们都会体验到生命周期转变。启动第二个 Activity 的过程与停止第一个 Activity 的过程存在重叠。Android中activity生命周期回调的顺序经过明确定义，当两个 Activity 位于同一进程，并且由一个 Activity 启动另一个 Activity 时，其定义尤其明确。 以下是当 Activity A 启动 Activity B 时一系列操作的发生顺序：

1. Activity A 的 `onPause()` 方法执行。
2. Activity B 的 `onCreate()`、`onStart()` 和 `onResume()` 方法依次执行。（Activity B 现在具有用户焦点。）
3. 然后，如果 Activity A 在屏幕上不再可见，则其 `onStop()` 方法执行。

### Responding to Memory Pressure 

You can help by overriding the `onTrimMemory` handler, to respond to system requests that you reduce your memory usage. 

# FRAGMENTS

`Fragment` 表示 `Activity` 中的行为或用户界面部分。可以将多个Fragments组合在一个 Activity 中来构建多窗格 UI，以及在多个 Activity 中重复使用某个Fragment。可以将Fragments视为 Activity 的模块化组成部分，它具有自己的生命周期，能接收自己的输入事件，并且可以在 Activity 运行时添加或移除Fragments（有点像可以在不同 Activity 中重复使用的“子 Activity”）。

Fragments enable you to divide your Activities into fully encapsulated reusable components, each with its own life cycle and state.

## 创建Fragment

要想创建Fragment，必须创建 `Fragment` 的子类（或已有其子类）。`Fragment` 类的代码与 `Activity` 非常相似。它包含与 Activity 类似的回调方法。通常，至少应实现生命周期方法：`onCreate()`, `onCreateView()`, onPause()`。

### 添加用户界面

Fragment通常用作 Activity 用户界面的一部分，将其自己的布局融入 Activity。当Fragment作为 Activity 布局的一部分添加时，它存在于 Activity 视图层次结构的某个 `ViewGroup` 内部，并且Fragment会定义其自己的视图布局。

要想为Fragment提供布局，必须实现 `onCreateView()` 回调方法，Android 系统会在Fragment需要绘制其布局时调用该方法。对此方法的实现返回的 `View` 必须是Fragment布局的根视图。要想从 `onCreateView()` 返回布局，可以通过 XML 中定义的布局资源来扩展布局。为帮助执行此操作，`onCreateView()` 提供了一个 `LayoutInflater` 对象。

例如，以下这个 `Fragment` 子类从 `example_fragment.xml` 文件加载布局：

```java
public static class ExampleFragment extends Fragment {
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.example_fragment, container, false);
    }
}
```

传递至 `onCreateView()` 的 `container` 参数是Fragment布局将插入到的父 `ViewGroup`（来自 Activity 的布局）。`savedInstanceState` 参数是在恢复Fragment时，提供上一Fragment实例相关数据的 `Bundle`。

`inflate()` 方法带有三个参数：

- 想要扩展的布局的资源 ID；
- 将作为扩展布局父项的 `ViewGroup`。传递 `container` 对系统向扩展布局的根视图（由其所属的父视图指定）应用布局参数具有重要意义；
- 指示是否应该在扩展期间将扩展布局附加至 `ViewGroup`（第二个参数）的布尔值。（在本例中，其值为 false，因为系统已经将扩展布局插入 `container` — 传递 true 值会在最终布局中创建一个多余的视图组。）

### 向 Activity 添加Fragment

通常，Fragment向宿主 Activity 贡献一部分 UI，作为 Activity 总体视图层次结构的一部分嵌入到 Activity 中。可以通过两种方式向 Activity 布局添加Fragment：

- 在 Activity 的布局文件内声明Fragment，可以将Fragment当作视图来为其指定布局属性。 例如，以下是一个具有两个Fragment的 Activity 的布局文件：

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
      android:orientation="horizontal"
      android:layout_width="match_parent"
      android:layout_height="match_parent">
      <fragment android:name="com.example.news.ArticleListFragment"
              android:id="@+id/list"
              android:layout_weight="1"
              android:layout_width="0dp"
              android:layout_height="match_parent" />
      <fragment android:name="com.example.news.ArticleReaderFragment"
              android:id="@+id/viewer"
              android:layout_weight="2"
              android:layout_width="0dp"
              android:layout_height="match_parent" />
  </LinearLayout>
  ```

  `<fragment>` 中的 `android:name` 属性指定要在布局中实例化的 `Fragment` 类。

  当系统创建此 Activity 布局时，会实例化在布局中指定的每个Fragment，并为每个Fragment调用 `onCreateView()` 方法，以检索每个Fragment的布局。系统会直接插入Fragment返回的 `View` 来替代 `<fragment>` 元素。

  **注**：每个Fragment都需要一个唯一的标识符，重启 Activity 时，系统可以使用该标识符来恢复Fragment（您也可以使用该标识符来捕获Fragment以执行某些事务，如将其移除）。 可以通过三种方式为Fragment提供 ID：

  - 为 `android:id` 属性提供唯一 ID。
  - 为 `android:tag` 属性提供唯一字符串。
  - 如果您未给以上两个属性提供值，系统会使用容器视图的 ID。

- 或者通过编程方式将Fragment添加到某个现有 `ViewGroup`

  可以在 Activity 运行期间随时将Fragment添加到 Activity 布局中——只需指定要将Fragment放入哪个 `ViewGroup`——使用 `FragmentTransaction`  API。可以像下面这样从 `Activity` 获取一个 `FragmentTransaction` 实例，然后，使用 `add()` 方法添加一个Fragment，指定要添加的Fragment以及将其插入哪个视图。例如

  ```java
  FragmentManager fragmentManager = getFragmentManager();
  FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
  
  ExampleFragment fragment = new ExampleFragment();
  fragmentTransaction.add(R.id.fragment_container, fragment);
  fragmentTransaction.commit();
  ```

  传递到 `add()` 的第一个参数是 `ViewGroup`，即应该放置Fragment的位置，由资源 ID 指定，第二个参数是要添加的Fragment。


### 添加没有 UI 的Fragment

还可以使用Fragment为 Activity 提供后台行为，而不显示额外 UI。要想添加没有 UI 的Fragment，请使用 `add(Fragment, String)` 从 Activity 添加Fragment（为Fragment提供一个唯一的字符串“标记”，而不是视图 ID）。 这会添加Fragment，但由于它并不与 Activity 布局中的视图关联，因此不会收到对 `onCreateView()` 的调用。因此，您不需要实现该方法。

并非只能为非 UI Fragment提供字符串标记——也可以为具有 UI 的Fragment提供字符串标记——但如果Fragment没有 UI，则字符串标记将是标识它的唯一方式。如果您想稍后从 Activity 中获取Fragment，则需要使用 `findFragmentByTag()`。

## 管理Fragment

要想管理 Activity 中的Fragment，需要使用 `FragmentManager`——从 Activity 调用`getFragmentManager()`获取。可以使用 `FragmentManager` 执行的操作包括：

- 通过 `findFragmentById()`（对于在 Activity 布局中提供 UI 的Fragment）或 `findFragmentByTag()`（对于提供或不提供 UI 的Fragment）获取 Activity 中存在的Fragment。
- 通过 `popBackStack()`（模拟用户发出的返回命令）将Fragment从返回栈中弹出。
- 通过 `addOnBackStackChangedListener()` 注册一个侦听返回栈变化的侦听器。

也可以使用 `FragmentManager` 打开一个 `FragmentTransaction`，通过它来执行某些事务，如添加和移除Fragment。

## 执行Fragment事务

在 Activity 中使用Fragment的一大优点是，可以根据用户行为通过它们执行添加、移除、替换以及其他操作。 提交给 Activity 的每组更改都称为事务(transaction)，可以使用 `FragmentTransaction` 中的 API 来执行一项事务。也可以将每个事务保存到由 Activity 管理的返回栈内，从而让用户能够回退Fragment更改（类似于回退 Activity）。

每个事务都是想要同时执行的一组更改。可以使用 `add()`、`remove()` 和 `replace()` 等方法为给定事务设置想要执行的所有更改。然后，要想将事务应用到 Activity，您必须调用 `commit()`。When you are ready to execute the change, call `commit` to add the transaction to the UI queue asynchronously, or `commitNow` to block until the transaction is fully complete:

不过，在调用 `commit()` 之前，还可能想调用 `addToBackStack()`，以将事务添加到Fragment事务返回栈。 该返回栈由 Activity 管理，允许用户通过按返回按钮返回上一Fragment状态。

例如，以下示例说明了如何将一个Fragment替换成另一个Fragment，以及如何在返回栈中保留先前状态：

```java
// Create new fragment and transaction
Fragment newFragment = new ExampleFragment();
FragmentTransaction transaction = getFragmentManager().beginTransaction();

// Replace whatever is in the fragment_container view with this fragment,
// and add the transaction to the back stack
transaction.replace(R.id.fragment_container, newFragment);
transaction.addToBackStack(null);

// Commit the transaction
transaction.commit();
```

在上例中，`newFragment` 会替换目前在 `R.id.fragment_container` ID 所标识的布局容器中的任何Fragment（如有）。通过调用 `addToBackStack()` 可将替换事务保存到返回栈，以便用户能够通过按返回按钮撤消事务并回退到上一Fragment。

如果向事务添加了多个更改（如又一个 `add()` 或 `remove()`），并且调用了 `addToBackStack()`，则在调用`commit()` 前应用的所有更改都将作为单一事务添加到返回栈，并且返回按钮会将它们一并撤消。

向 `FragmentTransaction` 添加更改的顺序无关紧要，不过：

- 必须最后调用 `commit()`
- 如果要向同一容器添加多个Fragment，则添加Fragment的顺序将决定它们在视图层次结构中的出现顺序

如果没有在执行移除Fragment的事务时调用 `addToBackStack()`，则事务提交时该Fragment会被销毁，用户将无法回退到该Fragment。 不过，如果在删除Fragment时调用了 `addToBackStack()`，则系统会停止该Fragment，并在用户回退时将其恢复。

对于每个Fragment事务，都可以通过在提交前调用 `setTransition()` 来应用过渡动画。

调用 `commit()` 不会立即执行事务，而是在 Activity 的 UI 线程（“主”线程）可以执行该操作时再安排其在线程上运行。不过，如有必要，您也可以从 UI 线程调用 `executePendingTransactions()` 以立即执行 `commit()` 提交的事务。通常不必这样做，除非其他线程中的作业依赖该事务。

只能在 Activity 保存其状态（用户离开 Activity）之前使用 `commit()` 提交事务。如果您试图在该时间点后提交，则会引发异常。 这是因为如需恢复 Activity，则提交后的状态可能会丢失。 对于丢失提交无关紧要的情况，请使用 `commitAllowingStateLoss()`。

## 与 Activity 通信

尽管 `Fragment` 是作为独立于 `Activity` 的对象实现，并且可在多个 Activity 内使用，但Fragment的给定实例会直接绑定到包含它的 Activity。具体地说，Fragment可以通过 `getActivity()` 访问 `Activity` 实例，并轻松地执行在 Activity 布局中查找视图等任务。

```java
View listView = getActivity().findViewById(R.id.list);
```

同样地， Activity 也可以使用 `findFragmentById()` 或 `findFragmentByTag()`，通过从 `FragmentManager` 获取对 `Fragment` 的引用来调用Fragment中的方法。例如：

```java
ExampleFragment fragment = (ExampleFragment) getFragmentManager().findFragmentById(R.id.example_fragment);
```

### 创建对 Activity 的事件回调

在某些情况下，可能需要通过Fragment与 Activity 共享事件。执行此操作的一个好方法是，在Fragment内定义一个回调接口，并要求宿主 Activity 实现它。 当 Activity 通过该接口收到回调时，可以根据需要与布局中的其他Fragment共享这些信息。

例如，如果一个新闻应用的 Activity 有两个Fragment —— 一个用于显示文章列表（Fragment A），另一个用于显示文章（Fragment B）——那么Fragment A 必须在列表项被选定后告知 Activity，以便它告知Fragment B 显示该文章。 在本例中，`OnArticleSelectedListener` 接口在Fragment A 内声明：

```java
public static class FragmentA extends ListFragment {
    ...
    // Container Activity must implement this interface
    public interface OnArticleSelectedListener {
        public void onArticleSelected(Uri articleUri);
    }
    ...
}
```

然后，该Fragment的宿主 Activity 会实现 `OnArticleSelectedListener` 接口并替代 `onArticleSelected()`，将来自Fragment A 的事件通知Fragment B。为确保宿主 Activity 实现此接口，Fragment A 的 `onAttach()` 回调方法（系统在向 Activity 添加Fragment时调用的方法）会通过转换传递到 `onAttach()` 中的 `Activity` 来实例化 `OnArticleSelectedListener` 的实例：

```java
public static class FragmentA extends ListFragment {
    OnArticleSelectedListener mListener;
    ...
    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        try {
            mListener = (OnArticleSelectedListener) activity;
        } catch (ClassCastException e) {
            throw new ClassCastException(activity.toString() + " must implement OnArticleSelectedListener");
        }
    }
    ...
}
```

如果 Activity 未实现接口，则Fragment会引发 `ClassCastException`。实现时，`mListener` 成员会保留对 Activity 的 `OnArticleSelectedListener` 实现的引用，以便Fragment A 可以通过调用 `OnArticleSelectedListener` 接口定义的方法与 Activity 共享事件。例如，如果Fragment A 是 `ListFragment` 的一个扩展，则用户每次点击列表项时，系统都会调用Fragment中的 `onListItemClick()`，然后该方法会调用 `onArticleSelected()` 以与 Activity 共享事件：

```java
public static class FragmentA extends ListFragment {
    OnArticleSelectedListener mListener;
    ...
    @Override
    public void onListItemClick(ListView l, View v, int position, long id) {
        // Append the clicked item's row ID with the content provider Uri
        Uri noteUri = ContentUris.withAppendedId(ArticleColumns.CONTENT_URI, id);
        // Send the event and Uri to the host activity
        mListener.onArticleSelected(noteUri);
    }
    ...
}
```

传递到 `onListItemClick()` 的 `id` 参数是被点击项的行 ID，即 Activity（或其他Fragment）用来从应用的 `ContentProvider` 获取文章的 ID。

## Fragment生命周期

<img src="https://developer.android.com/images/fragment_lifecycle.png" alt="Fragment生命周期">

The full lifetime of your Fragment begins when it’s bound to its parent’s Context and ends when it’s been detached. These events are represented by the calls to `onAttach` and `onDetach`, respectively.

The created lifetime of your Fragment occurs between the first call to `onCreate` and the final call to `onDestroy`. 

A Fragment’s UI is initialized (and destroyed) within a new set of event handlers: `onCreateView` and `onDestroyView`, respectively.  Use the `onCreateView` method to initialize your Fragment: inflate the UI and get references (and bind data to) the Views it contains. If your Fragment needs to interact with the UI of a parent Activity, wait until the `onActivityCreated` event has been triggered. 

和 Activity 一样，Fragment也以三种状态存在：

- 继续：Fragment在运行中的 Activity 中可见。
- 暂停：另一个 Activity 位于前台并具有焦点，但此Fragment所在的 Activity 仍然可见（前台 Activity 部分透明，或未覆盖整个屏幕）。
- 停止：Fragment不可见。宿主 Activity 已停止，或Fragment已从 Activity 中移除，但已添加到返回栈。 停止Fragment仍然处于活动状态（系统会保留所有状态和成员信息）。 不过，它对用户不再可见，如果 Activity 被终止，它也会被终止。

同样与 Activity 一样，假使 Activity 的进程被终止，而需要在重建 Activity 时恢复Fragment状态，也可以使用 `Bundle` 保留Fragment的状态。可以在Fragment的 `onSaveInstanceState()` 回调期间保存状态，并可在 `onCreate()`、`onCreateView()` 或 `onActivityCreated()` 期间恢复状态。

In order to maintain a consistent UI state between configuration changes, all the Fragments added to your UI will automatically be restored when an Activity is re-created following an orientation change or unexpected termination. This is particularly important if you are populating your Activity layout with Fragments within the onCreate handler—in which case you must check if the Fragments have already been added to avoid creating multiple copies. You can do this either by checking for Fragments before adding them, or if this is an Activity restart by checking if the savedInstanceState is null: 
```java
    protected void onCreate(Bundle savedInstanceState) { 
      super.onCreate(savedInstanceState); 
      setContentView(R.layout.activity_main); 
      
      if (savedInstanceState == null) { 
        // Create and add your Fragments. 
      } else { 
        // Get references to Fragments that have already been restored. 
      } 
    } 
```
Activity 生命周期与Fragment生命周期之间的最显著差异在于它们在其各自返回栈中的存储方式。 默认情况下，Activity 停止时会被放入由系统管理的 Activity 返回栈（以便用户通过返回按钮回退到 Activity）。不过，仅当在移除Fragment的事务执行期间通过调用 `addToBackStack()` 显式请求保存实例时，系统才会将Fragment放入由宿主 Activity 管理的返回栈。

### 与 Activity 生命周期协调一致

Fragment所在的 Activity 的生命周期会直接影响Fragment的生命周期，其表现为，Activity 的每次生命周期回调都会引发每个Fragment的类似回调。 例如，当 Activity 收到 `onPause()` 时，Activity 中的每个Fragment也会收到 `onPause()`。

不过，Fragment还有几个额外的生命周期回调，用于处理与 Activity 的唯一交互，以执行构建和销毁Fragment UI 等操作：

- `onAttach()`：在Fragment已与 Activity 关联时调用（`Activity` 传递到此方法内）。

- `onCreateView()`：调用它可创建与Fragment关联的视图层次结构。

- `onActivityCreated()`：在 Activity 的 `onCreate()` 方法已返回时调用。

- `onDestroyView()`：在移除与Fragment关联的视图层次结构时调用。

- `onDetach()`；在取消Fragment与 Activity 的关联时调用。

只有当 Activity 处于恢复状态时，Fragment的生命周期才能独立变化。

# UI

Android 应用中的所有用户界面元素都是使用 `View` 和 `ViewGroup` 对象构建而成。`View` 对象用于在屏幕上绘制可供用户交互的内容。You’ll often see Views referred to as *controls* or *widgets* . `ViewGroup` 对象用于储存其他 `View`（和 `ViewGroup`）对象，以便定义界面的布局。View Groups that focus primarily on laying out child Views are referred to
as *layouts*.

## 布局 LAYOUTS 

In most cases, building your UI will include many Views contained within one or more nested layouts—extensions of the ViewGroup class.  

布局定义用户界面的视觉结构(A layout defines the structure for a user interface in your app, such as in an activity)，可以通过两种方式声明布局：

- **在 XML 中声明 UI 元素**。Android 提供了对应于 View 类及其子类的简明 XML 词汇，如用于小部件和布局的词汇；
- **运行时实例化布局元素**。可以通过编程创建 View 对象和 ViewGroup 对象（并操纵其属性）。

### XML 布局文件

XML布局文件在 Android 项目 `res/layout/` 目录中以 `.xml` 扩展名保存。当编译应用时，每个 XML 布局文件都会编译到一个 `View` 资源中。 应该在 `Activity.onCreate()` 回调实现中从应用代码加载布局资源。请通过调用 `setContentView()`，以 `R.layout.*layout_file_name*` 形式向其传递对布局资源的引用来执行此操作。

### 属性

每个视图对象和 ViewGroup 对象都支持各自的各类 XML 属性。

#### ID

任何视图对象都可能具有关联的整型 ID，此 ID 用于在结构树中对 View 对象进行唯一标识。编译应用后，此 ID 将作为整型数引用，但在布局 XML 文件中，通常会在 `id` 属性中为该 ID 赋予字符串值：

```
android:id="@+id/my_button"
```

字符串开头处的 @ 符号指示 XML 解析程序应该解析并展开 ID 字符串的其余部分，并将其标识为 ID 资源。加号 (+) 表示这是一个新的资源名称，必须创建该名称并将其添加到我们的资源（在 `R.java` 文件中）内。

Android 框架还提供了许多其他 ID 资源。 引用 Android 资源 ID 时，不需要加号，但必须添加 `android` 软件包命名空间，如下所示：

```
android:id="@android:id/empty"
```

添加 `android` 软件包命名空间之后，我们将从 `android.R` 资源类而非本地资源类引用 ID。

在应用中引用view 对象实例：

```
Button myButton = (Button) findViewById(R.id.my_button);
```

#### 布局参数

名为 `layout_*something*` 的 XML 布局属性可为视图定义与其所在的 ViewGroup 相适的布局参数。每个 ViewGroup 类都会实现一个扩展 `ViewGroup.LayoutParams` 的嵌套类。此子类包含的属性类型会根据需要为视图组的每个子视图定义尺寸和位置。 父视图组为每个子视图（包括子视图组）定义布局参数。

请注意，每个 LayoutParams 子类都有自己的值设置语法。 每个子元素都必须定义适合其父元素的 LayoutParams，但父元素也可为其子元素定义不同的 LayoutParams。所有视图组都包括宽度和高度（`layout_width` 和 `layout_height`），并且每个视图都必须定义它们。许多 LayoutParams 还包括可选的外边距和边框。

可以指定具有确切尺寸的宽度和高度，但在更多的情况下，会使用以下常量之一来设置宽度或高度：

- wrap_content 指示您的视图将其大小调整为内容所需的尺寸。
- match_parent 指示您的视图尽可能采用其父视图组所允许的最大尺寸。

一般而言，建议不要使用绝对单位（如像素）来指定布局宽度和高度， 而是使用相对测量单位，如密度无关像素单位 (dp)、wrap_content 或 match_parent。

### 常见布局

`ViewGroup` 类的每个子类都提供了一种独特的方式来显示其中嵌套的视图。 Android 平台中内置的一些较为常见的布局类型：

- [线性布局 Linear Layout](https://developer.android.com/guide/topics/ui/layout/linear.html)；一种使用单个水平行或垂直行来组织子项的布局。它会在窗口长度超出屏幕长度时创建一个滚动条。
- [相对布局 Relative Layout](https://developer.android.com/guide/topics/ui/layout/relative.html)：能够指定子对象彼此之间的相对位置（子对象 A 在子对象 B 左侧）或子对象与父对象的相对位置（与父对象顶部对齐）。
- [Constraint Layout](https://developer.android.com/reference/androidx/constraintlayout/widget/ConstraintLayout.html) 

#### Constraint Layout 

The Constraint Layout provides the most flexibility of any of the Layout Managers, offering the advantage of both a visual layout editor, and a flat view hierarchy without the nesting. 

It’s available as part of the Android Support Library, and must be included as a dependency to your project’s module-level build.gradle file: 

```groovy
dependencies {
    implementation 'com.android.support.constraint:constraint-layout:1.1.2'
}
```

As the name suggests, the Constraint Layout positions its child Views through the specification of constraints that define the relationship between a View and elements such as boundaries, other views, and custom guidelines. 

While it’s possible to define a Constraint Layout in XML manually, all the power of `ConstraintLayout` is available directly from the Layout Editor's visual tools, because the layout API and the Layout Editor were specially built for each other. So you can build your layout with `ConstraintLayout` entirely by drag-and-dropping instead of editing the XML.

To define a view's position in `ConstraintLayout`, you must add at least one horizontal and one vertical constraint for the view. Each constraint represents a connection or alignment to another view, the parent layout, or an invisible guideline. Each constraint defines the view's position along either the vertical or horizontal axis; so each view must have a minimum of one constraint for each axis, but often more are necessary.

When you drop a view into the Layout Editor, it stays where you leave it even if it has no constraints. However, this is only to make editing easier; if a view has no constraints when you run your layout on a device, it is drawn at position [0,0] (the top-left corner).

更多请参考：[Build a Responsive UI with ConstraintLayout](https://developer.android.com/training/constraint-layout)

### 适配器Adapter

如果布局的内容是属于动态或未预先确定的内容，可以使用这样一种布局：在运行时通过子类 `AdapterView` 用视图填充布局。 `AdapterView` 类的子类使用 `Adapter` 将数据与其布局绑定。`Adapter` 充当数据源与 `AdapterView` 布局之间的中间人—`Adapter`（从数组或数据库查询等来源）检索数据，并将每个条目转换为可以添加到 `AdapterView` 布局中的视图。

适配器支持的常见布局包括：

- [列表视图 List View](https://developer.android.com/guide/topics/ui/layout/listview.html)：显示滚动的单列列表。

- [网格视图 Grid View](https://developer.android.com/guide/topics/ui/layout/gridview.html)：显示滚动的行列网格。

可以通过将 `AdapterView` 实例与 `Adapter` 绑定来填充 `AdapterView`（如 `ListView` 或 `GridView`），此操作会从外部来源检索数据，并创建表示每个数据条目的 `View`。

Android 提供了几个 `Adapter` 子类，用于检索不同种类的数据和构建 `AdapterView` 的视图。 两种最常见的适配器是：

- `ArrayAdapter`

  请在数据源为数组时使用此适配器。默认情况下，`ArrayAdapter` 会通过在每个项目上调用 `toString()` 并将内容放入 `TextView` 来为每个数组项创建视图。

  例如，如果您具有想要在 `ListView` 中显示的字符串数组，请使用构造函数初始化一个新的 `ArrayAdapter`，为每个字符串和字符串数组指定布局：

  ```java
  ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
               android.R.layout.simple_list_item_1, myStringArray);
  ```

  此构造函数的参数是：

  - 应用 `Context`
  - 包含数组中每个字符串的 `TextView` 的布局
  - 字符串数组

  然后，只需在 `ListView` 上调用 `setAdapter()`：

  ```java
  ListView listView = (ListView) findViewById(R.id.listview);
  listView.setAdapter(adapter);
  ```
  要想自定义每个项的外观，您可以重写数组中各个对象的 `toString()` 方法。或者，要想为 `TextView` 之外的每个项创建视图（例如，如果您想为每个数组项创建一个 `ImageView`），请扩展 `ArrayAdapter` 类并重写 `getView()`以返回您想要为每个项获取的视图类型。

- `SimpleCursorAdapter`

  请在数据来自 `Cursor` 时使用此适配器。使用 `SimpleCursorAdapter` 时，必须指定要为 `Cursor` 中的每个行使用的布局，以及应该在哪些布局视图中插入 `Cursor` 中的哪些列。 例如，如果想创建人员姓名和电话号码列表，则可以执行一个返回 `Cursor`（包含对应每个人的行，以及对应姓名和号码的列）的查询。 然后，可以创建一个字符串数组，指定想要在每个结果的布局中包含 `Cursor` 中的哪些列，并创建一个整型数组，指定应该将每个列放入的对应视图：
  ```java
  String[] fromColumns = {ContactsContract.Data.DISPLAY_NAME, 
                          ContactsContract.CommonDataKinds.Phone.NUMBER};
  int[] toViews = {R.id.display_name, R.id.phone_number};
  ```
  当您实例化 `SimpleCursorAdapter` 时，请传递要用于每个结果的布局、包含结果的 `Cursor` 以及以下两个数组：
  ```java
  SimpleCursorAdapter adapter = new SimpleCursorAdapter(this,
                 R.layout.person_name_and_number, cursor, fromColumns, toViews, 0);
  ListView listView = getListView();
  listView.setAdapter(adapter);
  ```

  然后，`SimpleCursorAdapter` 会使用提供的布局，将每个 `fromColumns` 项插入对应的 `toViews` 视图，为 `Cursor` 中的每个行创建一个视图。

如果在应用的生命周期中更改了适配器读取的底层数据，则应调用 `notifyDataSetChanged()`。此操作会通知附加的视图，数据发生了变化，它应该自行刷新。

另外，可以通过实现 `AdapterView.OnItemClickListener` 界面来响应 `AdapterView` 中每一项上的点击事件。 例如：

```java
// Create a message handling object as an anonymous class.
private OnItemClickListener mMessageClickedHandler = new OnItemClickListener() {
    public void onItemClick(AdapterView parent, View v, int position, long id) {
        // Do something in response to the click
    }
};

listView.setOnItemClickListener(mMessageClickedHandler);
```

## RecyclerView

If your app needs to display a scrolling list of elements based on large data sets (or data that frequently changes), you should use `RecyclerView`.

To access the `RecyclerView` widget, you need to add the [v7 Support Libraries](https://developer.android.com/tools/support-library/features.html#v7) in `build.gradle`: 

```groovy
   dependencies {
       implementation 'com.android.support:recyclerview-v7:28.0.0'
   }
```

Add RecyclerView to layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- A RecyclerView with some commonly used attributes -->
<android.support.v7.widget.RecyclerView
    android:id="@+id/my_recycler_view"
    android:scrollbars="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"/>
```

In the `RecyclerView` model, several different components work together to display your data. The overall container for your user interface is a `RecyclerView` object that you add to your layout. The `RecyclerView` fills itself with views provided by a *layout manager* that you provide. 

### Layout Managers 

The RecyclerView itself doesn’t control how each item is displayed; that responsibility belongs to the associated RecyclerView.LayoutManager. 

The `RecyclerView` uses a layout manager to position the individual items on the screen and determine when to reuse item views that are no longer visible to the user. To reuse (or *recycle*) a view, a layout manager may ask the adapter to replace the contents of the view with a different element from the dataset. Recycling views in this manner improves performance by avoiding the creation of unnecessary views or performing expensive `findViewById()` lookups. The Android Support Library includes three standard layout managers, each of which offers many customization options:

- `LinearLayoutManager` arranges the items in a one-dimensional list. Using a `RecyclerView` with `LinearLayoutManager` provides functionality like the older `ListView` layout.
- `GridLayoutManager` arranges the items in a two-dimensional grid, like the squares on a checkerboard. Using a `RecyclerView` with `GridLayoutManager` provides functionality like the older `GridView` layout.
- `StaggeredGridLayoutManager` arranges the items in a two-dimensional grid, with each column slightly offset from the one before, like the stars in an American flag.

If none of these layout managers suits your needs, you can create your own by extending the `RecyclerView.LayoutManager` abstract class.

The Layout Manager for a Recycler View can be set either in XML or programmatically.

Obtain a handle to the object, connect it to a layout manager, and attach an adapter for the data to be displayed:

```java
public class MyActivity extends Activity {
    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager layoutManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.my_activity);
        recyclerView = (RecyclerView) findViewById(R.id.my_recycler_view);

        // use this setting to improve performance if you know that changes
        // in content do not change the layout size of the RecyclerView
        recyclerView.setHasFixedSize(true);

        // use a linear layout manager
        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);

        // specify an adapter (see also next example)
        mAdapter = new MyAdapter(myDataset);
        recyclerView.setAdapter(mAdapter);
    }
    // ...
}
```

###  View Holders

The views in the list are represented by *view holder* objects. These objects are instances of a class you define by extending `RecyclerView.ViewHolder`. Each view holder is in charge of displaying a single item with a view. 

For example, if your list shows music collection, each view holder might represent a single album. 

The `RecyclerView`creates only as many view holders as are needed to display the on-screen portion of the dynamic content, plus a few extra. As the user scrolls through the list, the `RecyclerView` takes the off-screen views and rebinds them to the data which is scrolling onto the screen.

### Adapters

The view holder objects are managed by an *adapter*, which you create by extending `RecyclerView.Adapter`. The adapter creates view holders as needed. The adapter also binds the view holders to their data. It does this by assigning the view holder to a position, and calling the adapter's `onBindViewHolder()` method. That method uses the view holder's position to determine what the contents should be, based on its list position.

To feed all your data to the list, you must extend the `RecyclerView.Adapter` class. This object creates views for items, and replaces the content of some of the views with new data items when the original item is no longer visible:

```java
public class MyAdapter extends RecyclerView.Adapter<MyAdapter.MyViewHolder> {
    private String[] mDataset;

    // Provide a reference to the views for each data item
    // Complex data items may need more than one view per item, and
    // you provide access to all the views for a data item in a view holder
    public static class MyViewHolder extends RecyclerView.ViewHolder {
        // each data item is just a string in this case
        public TextView textView;
        public MyViewHolder(TextView v) {
            super(v);
            textView = v;
        }
    }

    // Provide a suitable constructor (depends on the kind of dataset)
    public MyAdapter(String[] myDataset) {
        mDataset = myDataset;
    }

    // Create new views (invoked by the layout manager)
    @Override
    public MyAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent,
                                                   int viewType) {
        // create a new view
        TextView v = (TextView) LayoutInflater.from(parent.getContext())
                .inflate(R.layout.my_text_view, parent, false);
        ...
        MyViewHolder vh = new MyViewHolder(v);
        return vh;
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        // - get element from your dataset at this position
        // - replace the contents of the view with that element
        holder.textView.setText(mDataset[position]);

    }

    // Return the size of your dataset (invoked by the layout manager)
    @Override
    public int getItemCount() {
        return mDataset.length;
    }
}
```

The layout manager calls the adapter's `onCreateViewHolder()` method. That method needs to construct a `RecyclerView.ViewHolder` and set the view it uses to display its contents. The type of the ViewHolder must match the type declared in the Adapter class signature. Typically, it would set the view by inflating an XML layout file. Because the view holder is not yet assigned to any particular data, the method does not actually set the view's contents.

The layout manager then binds the view holder to its data. It does this by calling the adapter's `onBindViewHolder()`method, and passing the view holder's position in the `RecyclerView`. The `onBindViewHolder()` method needs to fetch the appropriate data, and use it to fill in the view holder's layout. For example, if the `RecyclerView` is displaying a list of names, the method might find the appropriate name in the list, and fill in the view holder's `TextView` widget.

Every time an item needs to be displayed, the Layout Manager will call the Adapter’s onBindViewHolder method, providing you a previously created ViewHolder and the position in the dataset requested. This binding phase runs very frequently when scrolling through a list (once for every element that scrolls into view) so it should be as lightweight as possible.

If the list needs an update, call a notification method on the `RecyclerView.Adapter` object, such as`notifyItemChanged()`. The layout manager then rebinds any affected view holders, allowing their data to be updated.

## Optimizing Layouts

To keep your applications smooth and responsive, it’s important to keep your layouts as simple as possible, and to avoid inflating entirely new layouts for relatively small UI changes.

### include and merge tag

To efficiently re-use complete layouts, you can use the `<include/>` and `<merge/>` tags to embed another layout inside the current layout.

If you already know the layout that you want to re-use, create a new XML file and define the layout. For example, here's a layout that defines a title bar to be included in each activity (`titlebar.xml`):

```xml
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@color/titlebar_bg"
    tools:showIn="@layout/activity_main" >

    <ImageView android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:src="@drawable/gafricalogo" />
</FrameLayout>
```

The root `View` should be exactly how you'd like it to appear in each layout to which you add this layout.

Inside the layout to which you want to add the re-usable component, add the `<include/>` tag. For example, here's a layout that includes the title bar from above:

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/app_bg"
    android:gravity="center_horizontal">

    <include layout="@layout/titlebar"/>

    <TextView android:layout_width="match_parent"
              android:layout_height="wrap_content"
              android:text="@string/hello"
              android:padding="10dp" />

    ...

</LinearLayout>
```

You can also override all the layout parameters (any `android:layout_*` attributes) of the included layout's root view by specifying them in the `<include/>` tag. For example:

```xml
<include android:id="@+id/news_title"
         android:layout_width="match_parent"
         android:layout_height="match_parent"
         layout="@layout/title"/>
```

However, if you want to override layout attributes using the `<include>` tag, you must override both`android:layout_height` and `android:layout_width` in order for other layout attributes to take effect.

The `<merge />` tag helps eliminate redundant view groups in your view hierarchy when including one layout within another. For example, if your main layout is a vertical `LinearLayout` in which two consecutive views can be re-used in multiple layouts, then the re-usable layout in which you place the two views requires its own root view. However, using another `LinearLayout` as the root for the re-usable layout would result in a vertical `LinearLayout` inside a vertical`LinearLayout`. The nested `LinearLayout` serves no real purpose other than to slow down your UI performance.

To avoid including such a redundant view group, you can instead use the `<merge>` element as the root view for the re-usable layout. For example:

```xml
<merge xmlns:android="http://schemas.android.com/apk/res/android">

    <Button
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:text="@string/add"/>

    <Button
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:text="@string/delete"/>

</merge>
```

Now, when you include this layout in another layout (using the `<include/>` tag), the system ignores the `<merge>`element and places the two buttons directly in the layout, in place of the `<include/>` tag.

### ViewStub

To minimize the number of Views inflated within a complex layout, you can use a ViewStub. `ViewStub` is a lightweight view with no dimension that doesn’t draw anything or participate in the layout. 

Each `ViewStub` simply needs to include the `android:layout`attribute to specify the layout to inflate. The following `ViewStub` is for a translucent progress bar overlay. It should be visible only when new items are being imported into the app.

```xml
<ViewStub
    android:id="@+id/stub_import"
    android:inflatedId="@+id/panel_import"
    android:layout="@layout/progress_overlay"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:layout_gravity="bottom" />
```

When you want to load the layout specified by the `ViewStub`, either set it visible by calling `setVisibility(View.VISIBLE)` or call `inflate()`.

```java
findViewById(R.id.stub_import).setVisibility(View.VISIBLE);
// or
View importPanel = ((ViewStub) findViewById(R.id.stub_import)).inflate();
```

Once visible/inflated, the `ViewStub` element is no longer part of the view hierarchy. It is replaced by the inflated layout and the ID for the root view of that layout is the one specified by the `android:inflatedId` attribute of the ViewStub. (The ID `android:id` specified for the `ViewStub` is valid only until the `ViewStub` layout is visible/inflated.)

For additional information on this topic, see [Optimize with stubs (blog post)](http://android-developers.blogspot.com/2009/03/android-layout-tricks-3-optimize-with.html).

# DATA BINDING

The Data Binding library makes it possible to write declarative layouts that minimize the glue code needed to bind View elements to underlying data sources by generating that code for you at compile time.

Data Binding is an optional library, so before you can take advantage of it you must enable it in your application module’s build.gradle file:

```xml
android {
    ...
    dataBinding {
        enabled = true
    }
}
```

Data binding layout files are slightly different and start with a root tag of `layout` followed by a `data` element and a `view` root element:

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
   <data>
       <variable name="user" type="com.example.User"/>
   </data>
   <LinearLayout
       android:orientation="vertical"
       android:layout_width="match_parent"
       android:layout_height="match_parent">
       <TextView android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:text="@{user.firstName}"/>
       <TextView android:layout_width="wrap_content"
           android:layout_height="wrap_content"
           android:text="@{user.lastName}"/>
   </LinearLayout>
</layout>
```

The `user` variable within `data` describes a property that may be used within this layout. Expressions within the layout are written in the attribute properties using the "`@{}`" syntax. 

A plain-old object to describe the `User` entity:

```java
public class User {
  private final String firstName;
  private final String lastName;
  public User(String firstName, String lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
  }
  public String getFirstName() {
      return this.firstName;
  }
  public String getLastName() {
      return this.lastName;
  }
}
```

A binding class is generated for each layout file. By default, the name of the class is based on the name of the layout file, converting it to Pascal case and adding the *Binding* suffix to it. The above layout filename is `activity_main.xml` so the corresponding generated class is `ActivityMainBinding`. 

This class holds all the bindings from the layout properties (for example, the `user` variable) to the layout's views and knows how to assign values for the binding expressions. By declaring a variable named `user`, of the class `User`, our Binding class will generate a `setUser` method. Calling this method will set all of the properties referencing that class using the `@{}` syntax. Data Binding will look for public variables, getter methods of the style get<Variable> or is<Variable> (for example, getEmail or isValid), or the exact method name when resolving expressions.

The recommended method to create the bindings is to do it while inflating the layout, as shown in the following example:

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
   super.onCreate(savedInstanceState);
   ActivityMainBinding binding = DataBindingUtil.setContentView(this,
                            R.layout.activity_main);
   User user = new User("Test", "User");
   binding.setUser(user);
}
```

At runtime, the app displays the **Test** user in the UI. Alternatively, you can get the view using a `LayoutInflater`, as shown in the following example:

```java
ActivityMainBinding binding = ActivityMainBinding.inflate(getLayoutInflater());
```

If you are using data binding items inside a `Fragment`, `ListView`, or `RecyclerView` adapter, you may prefer to use the[`inflate()`](https://developer.android.com/reference/androidx/databinding/DataBindingUtil.html#inflate(android.view.LayoutInflater,%20int,%20android.view.ViewGroup,%20boolean,%20android.databinding.DataBindingComponent)) methods of the bindings classes or the [`DataBindingUtil`](https://developer.android.com/reference/androidx/databinding/DataBindingUtil) class, as shown in the following code example:

```java
ListItemBinding binding = ListItemBinding.inflate(layoutInflater, viewGroup, false);
// or
ListItemBinding binding = DataBindingUtil.inflate(layoutInflater, R.layout.list_item, viewGroup, false);
```



# 参考代码

[StateChangeMonitoringActivity.java](https://github.com/brightonzhang/AndroidAppComponentSkeleton/blob/master/StateChangeMonitoringActivity.java)

[MySkeletonFragment.java](https://github.com/brightonzhang/AndroidAppComponentSkeleton/blob/master/MySkeletonFragment.java)

[SimpleAdapter.java](<https://github.com/brightonzhang/AndroidAppComponentSkeleton/blob/master/SimpleAdapter.java>)









