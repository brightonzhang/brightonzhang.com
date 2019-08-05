---
title: Professional Android笔记：Intent和Broadcast
catalog: true
date: 2017-04-30 15:47:44
subtitle:
updated: 2017-04-30 23:17:53
cover: /posts/pro-android-activity-ui/1iTDUQIbX397042030.jpg
categories:
- 技术
tags: 
- 安卓
- Android
- Intent
- Broadcast
---

# Intent
`Intent` 是一个消息传递对象。Intents are a message-passing mechanism you can use within your application, between applications, and between the system and your application. Intent 常用于：

- 启动 Activity：

  `Activity` 表示应用中的一个屏幕。通过将 `Intent` 传递给 `startActivity()`，您可以启动新的 `Activity` 实例。`Intent` 描述了要启动的 Activity，并携带了任何必要的数据。

  如果您希望在 Activity 完成后收到结果，请调用`startActivityForResult()`。在 Activity 的 `onActivityResult()` 回调中，您的 Activity 将结果作为单独的 `Intent` 对象接收。

- 启动服务：

  `Service` 是一个不使用用户界面而在后台执行操作的组件。通过将`Intent` 传递给 `startService()`，您可以启动服务执行一次性操作（例如，下载文件）。`Intent` 描述了要启动的服务，并携带了任何必要的数据。

  如果服务旨在使用客户端-服务器接口，则通过将 `Intent` 传递给`bindService()`，您可以从其他组件绑定到此服务。

- 传递广播：

  广播是任何应用均可接收的消息。系统将针对系统事件（例如：系统启动或设备开始充电时）传递各种广播。通过将 `Intent` 传递给`sendBroadcast()`、`sendOrderedBroadcast()` 或 `sendStickyBroadcast()`，您可以将广播传递给其他应用。

## Intent 类型

Intent 分为两种类型：

- **显式 Intent**：按名称（完全限定类名）指定要启动的组件。 通常，您会在自己的应用中使用显式 Intent 来启动组件，这是因为您知道要启动的 Activity 或服务的类名。例如，启动新 Activity 以响应用户操作，或者启动服务以在后台下载文件。
- **隐式 Intent** ：不会指定特定的组件，而是声明要执行的常规操作，从而允许其他应用中的组件来处理它。 例如，如需在地图上向用户显示位置，则可以使用隐式 Intent，请求另一具有此功能的应用在地图上显示指定的位置。

创建显式 Intent 启动 Activity 或服务时，系统将立即启动 `Intent` 对象中指定的应用组件。

创建隐式 Intent 时，Android 系统通过将 Intent 的内容与在设备上其他应用的清单文件中声明的 Intent 过滤器进行比较，从而找到要启动的相应组件。 如果 Intent 与 Intent 过滤器匹配，则系统将启动该组件，并向其传递 `Intent`对象。 如果多个 Intent 过滤器兼容，则系统会显示一个对话框，支持用户选取要使用的应用。

## 构建 Intent

`Intent` 对象携带了 Android 系统用来确定要启动哪个组件的信息（例如，准确的组件名称或应当接收该 Intent 的组件类别），以及收件人组件为了正确执行操作而使用的信息（例如，要采取的操作以及要处理的数据）。

`Intent` 中包含的主要信息如下：

- **组件名称**

  要启动的组件名称。这是可选项，但也是构建**显式** Intent 的一项重要信息，这意味着 Intent 应当仅传递给由组件名称定义的应用组件。 如果没有组件名称，则 Intent 是**隐式**的，且系统将根据其他 Intent 信息（例如，以下所述的操作、数据和类别）决定哪个组件应当接收 Intent。 因此，如需在应用中启动特定的组件，则应指定该组件的名称。

  启动 `Service` 时，您应**始终指定组件名称**。 否则，您无法确定哪项服务会响应 Intent，且用户无法看到哪项服务已启动。

  `Intent` 的这一字段是一个 `ComponentName` 对象，您可以使用目标组件的完全限定类名指定此对象，其中包括应用的软件包名称。 例如， `com.example.ExampleActivity`。您可以使用 `setComponent()`、`setClass()`、`setClassName()` 或 `Intent` 构造函数设置组件名称。

- **操作**

  指定要执行的通用操作（例如，“查看”或“选取”）的字符串。

  对于广播 Intent，这是指已发生且正在报告的操作。操作在很大程度上决定了其余 Intent 的构成，特别是数据和 extra 中包含的内容。

  您可以指定自己的操作，供 Intent 在您的应用内使用（或者供其他应用在您的应用中调用组件）。但是，您通常应该使用由 `Intent` 类或其他框架类定义的操作常量。以下是一些用于启动 Activity 的常见操作：

  `ACTION_VIEW`：如果您拥有一些某项 Activity 可向用户显示的信息（例如，要使用图库应用查看的照片；或者要使用地图应用查看的地址），请使用 Intent 将此操作与 `startActivity()` 结合使用。

  `ACTION_SEND`：这也称为“共享”Intent。如果您拥有一些用户可通过其他应用（例如，电子邮件应用或社交共享应用）共享的数据，则应使用 Intent 将此操作与 `startActivity()` 结合使用。

  有关更多定义通用操作的常量，请参阅 `Intent` 类参考文档。 其他操作在 Android 框架中的其他位置定义。例如，对于在系统的设置应用中打开特定屏幕的操作，将在 `Settings` 中定义。

  您可以使用 `setAction()` 或 `Intent` 构造函数为 Intent 指定操作。

  如果定义自己的操作，请确保将应用的软件包名称作为前缀。 例如：`static final String ACTION_TIMETRAVEL = "com.example.action.TIMETRAVEL";`

- **数据**

  引用待操作数据和/或该数据 MIME 类型的 URI（`Uri` 对象）。提供的数据类型通常由 Intent 的操作决定。例如，如果操作是 `ACTION_EDIT`，则数据应包含待编辑文档的 URI。

  创建 Intent 时，除了指定 URI 以外，指定数据类型（其 MIME 类型）往往也很重要。例如，能够显示图像的 Activity 可能无法播放音频文件，即便 URI 格式十分类似时也是如此。因此，指定数据的 MIME 类型有助于 Android 系统找到接收 Intent 的最佳组件。但有时，MIME 类型可以从 URI 中推断得出，特别当数据是 `content:` URI 时尤其如此。这表明数据位于设备中，且由 `ContentProvider` 控制，这使得数据 MIME 类型对系统可见。

  要仅设置数据 URI，请调用 `setData()`。 要仅设置 MIME 类型，请调用 `setType()`。如有必要，您可以使用 `setDataAndType()` 同时显式设置二者。**注意：**若要同时设置 URI 和 MIME 类型，**请勿**调用 `setData()` 和 `setType()`，因为它们会互相抵消彼此的值。请始终使用 `setDataAndType()` 同时设置 URI 和 MIME 类型。

- **类别**

  一个包含应处理 Intent 组件类型的附加信息的字符串。 您可以将任意数量的类别描述放入一个 Intent 中，但大多数 Intent 均不需要类别。 以下是一些常见类别：

  `CATEGORY_BROWSABLE`：目标 Activity 允许本身通过网络浏览器启动，以显示链接引用的数据，如图像或电子邮件。

  `CATEGORY_LAUNCHER`：该 Activity 是任务的初始 Activity，在系统的应用启动器中列出。

  有关类别的完整列表，请参阅 `Intent` 类描述。

  您可以使用 `addCategory()` 指定类别。

以上列出的这些属性（组件名称、操作、数据和类别）表示 Intent 的既定特征。 通过读取这些属性，Android 系统能够解析应当启动哪个应用组件。

但是，Intent 也有可能会一些携带不影响其如何解析为应用组件的信息。 Intent 还可以提供：

- **Extra**

  携带完成请求操作所需的附加信息的键值对。正如某些操作使用特定类型的数据 URI 一样，有些操作也使用特定的 extra。

  您可以使用各种 `putExtra()` 方法添加 extra 数据，每种方法均接受两个参数：键名和值。您还可以创建一个包含所有 extra 数据的 `Bundle` 对象，然后使用 `putExtras()` 将`Bundle` 插入 `Intent` 中。

  例如，使用 `ACTION_SEND` 创建用于发送电子邮件的 Intent 时，可以使用 `EXTRA_EMAIL` 键指定“目标”收件人，并使用 `EXTRA_SUBJECT` 键指定“主题”。

  `Intent` 类将为标准化的数据类型指定多个 `EXTRA_*` 常量。如需声明自己的 extra 键（对于应用接收的 Intent），请确保将应用的软件包名称作为前缀。 例如：`static final String EXTRA_GIGAWATTS = "com.example.EXTRA_GIGAWATTS";`

- **标志**

  在 `Intent` 类中定义的、充当 Intent 元数据的标志。 标志可以指示 Android 系统如何启动 Activity（例如，Activity 应属于哪个任务），以及启动之后如何处理（例如，它是否属于最近的 Activity 列表）。如需了解详细信息，请参阅 `setFlags()` 方法。

### 显式 Intent 示例

显式 Intent 是指用于启动某个特定应用组件（例如，应用中的某个特定 Activity 或服务）的 Intent。 要创建显式 Intent，请为 `Intent` 对象定义组件名称 — Intent 的所有其他属性均为可选属性。

E.g., explicitly indicate an Activity to start by creating a new Intent, specifying the current Activity’s Context and the class of the Activity to launch:
```java
Intent intent = new Intent(MyActivity.this, MyOtherActivity.class); 
startActivity(intent);
```
 After startActivity is called, the new Activity (in this example, MyOtherActivity) will be created, started, and resumed—replacing MyActivity at the top of the Activity stack.


再如，如果在应用中构建了一个名为 `DownloadService`、旨在从网页下载文件的服务，则可使用以下代码启动该服务：

```
// Executed in an Activity, so 'this' is the Context
// The fileUrl is a string URL, such as "http://www.example.com/image.png"
Intent downloadIntent = new Intent(this, DownloadService.class);
downloadIntent.setData(Uri.parse(fileUrl));
startService(downloadIntent);
```

`Intent(Context, Class)` 构造函数分别为应用和组件提供 `Context` 和 `Class` 对象。因此，此 Intent 将显式启动该应用中的 `DownloadService` 类。

### 隐式 Intent 示例

隐式 Intent 指定能够在可以执行相应操作的设备上调用任何应用的操作。 如果您的应用无法执行该操作而其他应用可以，且您希望用户选取要使用的应用，则使用隐式 Intent 非常有用。

例如，如果您希望用户与他人共享您的内容，请使用 `ACTION_SEND` 操作创建 Intent，并添加指定共享内容的 extra。 使用该 Intent 调用 `startActivity()` 时，用户可以选取共享内容所使用的应用。

```java
// Create the text message with a string
Intent sendIntent = new Intent();
sendIntent.setAction(Intent.ACTION_SEND);
sendIntent.putExtra(Intent.EXTRA_TEXT, textMessage);
sendIntent.setType("text/plain");

// Verify that the intent will resolve to an activity
if (sendIntent.resolveActivity(getPackageManager()) != null) {
    startActivity(sendIntent);
}
```

调用 `startActivity()` 时，系统将检查已安装的所有应用，确定哪些应用能够处理这种 Intent（即：含 `ACTION_SEND`操作并携带“text/plain”数据的 Intent ）。 如果只有一个应用能够处理，则该应用将立即打开并为其提供 Intent。 如果多个 Activity 接受 Intent，则系统将显示一个对话框，使用户能够选取要使用的应用。

用户可能没有任何应用处理您发送到 `startActivity()` 的隐式 Intent。如果出现这种情况，则调用将会失败，且应用会崩溃。You can use the Package Manager to query which, if any, Activity will be launched in response to a specific Intent by calling resolveActivity on your Intent object, passing in the Package Manager:

```java
if (somethingWeird && itDontLookGood) {
	// Create the implicit Intent to use to start a new Activity. 
  Intent intent =
		new Intent(Intent.ACTION_DIAL, Uri.parse("tel:555-2368"));
	
  // Check if an Activity exists to perform this action.
	PackageManager pm = getPackageManager(); 
  ComponentName cn = intent.resolveActivity(pm); 
  if (cn == null) {
		// There is no Activity available to perform the action 
    // Log an error and modify app behavior accordingly,
		// typically by disabling the UI element that would allow 
    // users to attempt this action.
		Log.e(TAG, "Intent could not resolve to an Activity."); 
  }
	else 
    startActivity(intent);
}
```

### 强制使用应用选择器

如果有多个应用响应隐式 Intent，则用户可以选择要使用的应用，并将其设置为该操作的默认选项。但是，如果多个应用可以响应 Intent，且用户可能希望每次使用不同的应用，则应采用显式方式显示选择器对话框。 选择器对话框每次都会要求用户选择用于操作的应用（用户无法为该操作选择默认应用）。 例如，当应用使用 `ACTION_SEND` 操作执行“共享”时，用户根据目前的状况可能需要使用另一不同的应用，因此应当始终使用选择器对话框。要显示选择器，请使用 `createChooser()` 创建 `Intent`，并将其传递给 `startActivity()`。

## 接收隐式 Intent

要公布应用可以接收哪些隐式 Intent，请在清单文件中使用 `<intent-filter>` 元素为每个应用组件声明一个或多个 Intent 过滤器。每个 Intent 过滤器均根据 Intent 的操作、数据和类别指定自身接受的 Intent 类型。 仅当隐式 Intent 可以通过 Intent 过滤器之一传递时，系统才会将该 Intent 传递给应用组件。

应用组件应当为自身可执行的每个独特作业声明单独的过滤器。例如，图像库应用中的一个 Activity 可能会有两个过滤器，分别用于查看图像和编辑图像。 当 Activity 启动时，它将检查 `Intent` 并根据 `Intent` 中的信息决定具体的行为（例如，是否显示编辑器控件）。

每个 Intent 过滤器均由应用清单文件中的 `<intent-filter>` 元素定义，并嵌套在相应的应用组件（例如，`<activity>`元素）中。 在 `<intent-filter>` 内部，您可以使用以下三个元素中的一个或多个指定要接受的 Intent 类型：

- `<action>`：在 `name` 属性中，声明接受的 Intent 操作。该值必须是操作的文本字符串值，而不是类常量。
- `<data>`：使用一个或多个指定数据 URI 各个方面（`scheme`、`host`、`port`、`path` 等）和 MIME 类型的属性，声明接受的数据类型。
- `<category`：在 `name` 属性中，声明接受的 Intent 类别。该值必须是操作的文本字符串值，而不是类常量。 

## 使用待定 Intent

`PendingIntent` 对象是 `Intent` 对象的包装器。`PendingIntent` 的主要目的是授权外部应用使用包含的 `Intent`，就像是它从您应用本身的进程中执行的一样。The PendingIntent class provides a mechanism for creating Intents that can be fired on your application’s behalf by the system, or another application, at a later time.  A Pending Intent is commonly used to package Intents that will be fired in response to a future event, such as when a user touches a Notification. 

待定 Intent 的主要用例包括：

- 声明用户使用您的通知执行操作时所要执行的 Intent（Android 系统的 `NotificationManager` 执行 `Intent`）。
- 声明用户使用您的 应用小部件执行操作时要执行的 Intent（主屏幕应用执行 `Intent`）。
- 声明未来某一特定时间要执行的 Intent（Android 系统的 `AlarmManager` 执行 `Intent`）。

由于每个 `Intent` 对象均设计为由特定类型的应用组件（`Activity`、`Service` 或 `BroadcastReceiver`）进行处理，因此还必须基于相同的考虑因素创建 `PendingIntent`。使用待定 Intent 时，应用不会使用调用（如 `startActivity()`）执行该 Intent。相反，通过调用相应的创建器方法创建 `PendingIntent` 时，您必须声明所需的组件类型：

- `PendingIntent.getActivity()`，适用于启动 `Activity` 的 `Intent`。
- `PendingIntent.getService()`，适用于启动 `Service` 的 `Intent`。
- `PendingIntent.getBroadcast()`，适用于启动 `BroadcastReceiver` 的 `Intent`。

除非您的应用正在从其他应用中接收待定 Intent，否则上述用于创建 `PendingIntent` 的方法可能是您所需的唯一`PendingIntent` 方法。

每种方法均会提取当前的应用 `Context`、您要包装的 `Intent` 以及一个或多个指定应如何使用该 Intent 的标志（例如，是否可以多次使用该 Intent）。

# 广播 Broadcast

Android apps can send or receive broadcast messages from the Android system and other Android apps, similar to the [publish-subscribe](https://en.wikipedia.org/wiki/Publish–subscribe_pattern) design pattern. These broadcasts are sent when an event of interest occurs. For example, the Android system sends broadcasts when various system events occur, such as when the system boots up or the device starts charging. Apps can also send custom broadcasts, for example, to notify other apps of something that they might be interested in (for example, some new data has been downloaded).

Apps can register to receive specific broadcasts. When a broadcast is sent, the system automatically routes broadcasts to apps that have subscribed to receive that particular type of broadcast.

The broadcast message itself is wrapped in an `Intent`object whose action string identifies the event that occurred (for example`android.intent.action.AIRPLANE_MODE`). The intent may also include additional information bundled into its extra field. 

## 接收广播

Apps can receive broadcasts in two ways: through manifest-declared receivers and context-registered receivers.

### Manifest-declared receivers

If you declare a broadcast receiver in your manifest, the system launches your app (if the app is not already running) when the broadcast is sent. If your app targets API level 26 or higher, you cannot use the manifest to declare a receiver for *implicit* broadcasts (broadcasts that do not target your app specifically), except for a few implicit broadcasts that are [exempted from that restriction](https://developer.android.com/guide/components/broadcast-exceptions.html). In most cases, you can use [scheduled jobs](https://developer.android.com/topic/performance/scheduling.html) instead.

To declare a broadcast receiver in the manifest, perform the following steps:

1. Specify the `receiver` element in your app's manifest.

   ```xml
   <receiver android:name=".MyBroadcastReceiver"  android:exported="true">
       <intent-filter>
           <action android:name="android.intent.action.BOOT_COMPLETED"/>
           <action android:name="android.intent.action.INPUT_METHOD_CHANGED" />
       </intent-filter>
   </receiver>
   ```

   The intent filters specify the broadcast actions your receiver subscribes to.

2. Subclass `BroadcastReceiver` and implement `onReceive(Context, Intent)`. The broadcast receiver in the following example logs and displays the contents of the broadcast:

   ```java
   public class MyBroadcastReceiver extends BroadcastReceiver {
           private static final String TAG = "MyBroadcastReceiver";
           @Override
           public void onReceive(Context context, Intent intent) {
               StringBuilder sb = new StringBuilder();
               sb.append("Action: " + intent.getAction() + "\n");
               sb.append("URI: " + intent.toUri(Intent.URI_INTENT_SCHEME).toString() + "\n");
               String log = sb.toString();
               Log.d(TAG, log);
               Toast.makeText(context, log, Toast.LENGTH_LONG).show();
           }
       }
   ```

The system package manager registers the receiver when the app is installed. The receiver then becomes a separate entry point into your app which means that the system can start the app and deliver the broadcast if the app is not currently running.

The system creates a new `BroadcastReceiver` component object to handle each broadcast that it receives. This object is valid only for the duration of the call to `onReceive(Context, Intent)`. Once your code returns from this method, the system considers the component no longer active.

### Context-registered receivers

To register a receiver with a context, perform the following steps:

1. Create an instance of `BroadcastReceiver`.

   ```java
   BroadcastReceiver br = new MyBroadcastReceiver();
   ```

2. Create an `IntentFilter` and register the receiver by calling `registerReceiver(BroadcastReceiver, IntentFilter)`:

   ```java
   IntentFilter filter = new IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION);
       filter.addAction(Intent.ACTION_AIRPLANE_MODE_CHANGED);
       this.registerReceiver(br, filter);
   ```

   **Note:** To register for local broadcasts, call `LocalBroadcastManager.registerReceiver(BroadcastReceiver, IntentFilter)` instead.

   Context-registered receivers receive broadcasts as long as their registering context is valid. For an example, if you register within an `Activity` context, you receive broadcasts as long as the activity is not destroyed. If you register with the Application context, you receive broadcasts as long as the app is running.

3. To stop receiving broadcasts, call `unregisterReceiver(android.content.BroadcastReceiver)`. Be sure to unregister the receiver when you no longer need it or the context is no longer valid.

   Be mindful of where you register and unregister the receiver, for example, if you register a receiver in `onCreate(Bundle)` using the activity's context, you should unregister it in `onDestroy()` to prevent leaking the receiver out of the activity context. If you register a receiver in `onResume()`, you should unregister it in `onPause()`to prevent registering it multiple times (If you don't want to receive broadcasts when paused, and this can cut down on unnecessary system overhead). Do not unregister in `onSaveInstanceState(Bundle)`, because this isn't called if the user moves back in the history stack.

### Effects on process state

The state of your `BroadcastReceiver` (whether it is running or not) affects the state of its containing process, which can in turn affect its likelihood of being killed by the system. For example, when a process executes a receiver (that is, currently running the code in its `onReceive()` method), it is considered to be a foreground process. The system keeps the process running except under cases of extreme memory pressure.

However, once your code returns from `onReceive()`, the BroadcastReceiver is no longer active. The receiver's host process becomes only as important as the other app components that are running in it. If that process hosts only a manifest-declared receiver (a common case for apps that the user has never or not recently interacted with), then upon returning from `onReceive()`, the system considers its process to be a low-priority process and may kill it to make resources available for other more important processes.

For this reason, you should not start long running background threads from a broadcast receiver. After `onReceive()`, the system can kill the process at any time to reclaim memory, and in doing so, it terminates the spawned thread running in the process. To avoid this, you should either call `goAsync()` (if you want a little more time to process the broadcast in a background thread) or schedule a `JobService` from the receiver using the `JobScheduler`, so the system knows that the process continues to perform active work. 

The following snippet shows a `BroadcastReceiver` that uses `goAsync()` to flag that it needs more time to finish after `onReceive()` is complete. This is especially useful if the work you want to complete in your `onReceive()` is long enough to cause the UI thread to miss a frame (>16ms), making it better suited for a background thread.

```java
public class MyBroadcastReceiver extends BroadcastReceiver {
    private static final String TAG = "MyBroadcastReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        final PendingResult pendingResult = goAsync();
        Task asyncTask = new Task(pendingResult, intent);
        asyncTask.execute();
    }

    private static class Task extends AsyncTask<String, Integer, String> {

        private final PendingResult pendingResult;
        private final Intent intent;

        private Task(PendingResult pendingResult, Intent intent) {
            this.pendingResult = pendingResult;
            this.intent = intent;
        }

        @Override
        protected String doInBackground(String... strings) {
            StringBuilder sb = new StringBuilder();
            sb.append("Action: " + intent.getAction() + "\n");
            sb.append("URI: " + intent.toUri(Intent.URI_INTENT_SCHEME).toString() + "\n");
            String log = sb.toString();
            Log.d(TAG, log);
            return log;
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            // Must call finish() so the BroadcastReceiver can be recycled.
            pendingResult.finish();
        }
    }
}
```

## 发送广播

Android provides three ways for apps to send broadcast:

- The `sendOrderedBroadcast(Intent, String)` method sends broadcasts to one receiver at a time. As each receiver executes in turn, it can propagate a result to the next receiver, or it can completely abort the broadcast so that it won't be passed to other receivers. The order receivers run in can be controlled with the android:priority attribute of the matching intent-filter; receivers with the same priority will be run in an arbitrary order.
- The `sendBroadcast(Intent)` method sends broadcasts to all receivers in an undefined order. This is called a Normal Broadcast. This is more efficient, but means that receivers cannot read results from other receivers, propagate data received from the broadcast, or abort the broadcast.
- The `LocalBroadcastManager.sendBroadcast` method sends broadcasts to receivers that are in the same app as the sender. If you don't need to send broadcasts across apps, use local broadcasts. The implementation is much more efficient (no interprocess communication needed) and you don't need to worry about any security issues related to other apps being able to receive or send your broadcasts.

The following code snippet demonstrates how to send a broadcast by creating an Intent and calling `sendBroadcast(Intent)`.

```java
Intent intent = new Intent();
intent.setAction("com.example.broadcast.MY_NOTIFICATION");
intent.putExtra("data","Notice me senpai!");
sendBroadcast(intent);
```

The broadcast message is wrapped in an `Intent` object. The intent's action string must provide the app's Java package name syntax and uniquely identify the broadcast event. You can attach additional information to the intent with `putExtra(String, Bundle)`. You can also limit a broadcast to a set of apps in the same organization by calling `setPackage(String)` on the intent.

## LOCAL BROADCAST MANAGER 

The Local Broadcast Manager was introduced to the Android Support Library to simplify the process of registering for, sending, and receiving Intents broadcast only between components within your application. 

Because of the reduced broadcast scope, using the Local Broadcast Manager is more efficient than sending a global broadcast. It also ensures that the Intent you broadcast cannot be received by any other applications, ensuring that there is no risk of leaking private or sensitive data. 

Use the `LocalBroadcastManager.getInstance` method to return an instance of the Local Broadcast Manager: 

To register a local Broadcast Receiver, use the Local Broadcast Manager’s `registerReceiver` method, much as you would register a global receiver, passing in a Broadcast Receiver and an Intent Filter: 
```java
@Override
public void onResume() { 
	super.onResume(); 

	// Register the broadcast receiver. 
  LocalBroadcastManager lbm = LocalBroadcastManager.getInstance(this); 	
  lbm.registerReceiver(receiver, filter);
} 

@Override
public void onPause() { 
	// Unregister the receiver 
  LocalBroadcastManager lbm = LocalBroadcastManager.getInstance(this); 
  lbm.unregisterReceiver(receiver);
  
  super.onPause(); 
} 
```
To transmit a local Broadcast Intent, use the Local Broadcast Manager’s `sendBroadcast` method, passing in the Intent to broadcast. The Local Broadcast Manager also includes a `sendBroadcastSync` method that operates synchronously, blocking until each registered Receiver has processed the broadcast Intent. 

## 限制广播权限

Permissions allow you to restrict broadcasts to the set of apps that hold certain permissions. You can enforce restrictions on either the sender or receiver of a broadcast.

### Sending with permissions

When you call `sendBroadcast(Intent, String)` or `sendOrderedBroadcast(Intent, String, BroadcastReceiver, Handler, int, String, Bundle)`, you can specify a permission parameter. Only receivers who have requested that permission with the tag in their manifest (and subsequently been granted the permission if it is dangerous) can receive the broadcast. For example, the following code sends a broadcast:

```java
sendBroadcast(new Intent("com.example.NOTIFY"),
              Manifest.permission.SEND_SMS);
```

To receive the broadcast, the receiving app must request the permission `android.permission.SEND_SMS`.

You can specify either an existing system permission like `SEND_SMS` or define a custom permission with the[`permission`](https://developer.android.com/guide/topics/manifest/permission-element.html) element. 

### Receiving with permissions

If you specify a permission parameter when registering a broadcast receiver (either with `registerReceiver(BroadcastReceiver, IntentFilter, String, Handler)` or in `receiver` tag in your manifest), then only broadcasters who have requested the permission with the `uses-permission` tag in their manifest (and subsequently been granted the permission if it is dangerous) can send an Intent to the receiver.

For example, assume your receiving app has a manifest-declared receiver as shown below:

```xml
<receiver android:name=".MyBroadcastReceiver"
          android:permission="android.permission.SEND_SMS">
    <intent-filter>
        <action android:name="android.intent.action.AIRPLANE_MODE"/>
    </intent-filter>
</receiver>
```

Or your receiving app has a context-registered receiver as shown below:

```java
IntentFilter filter = new IntentFilter(Intent.ACTION_AIRPLANE_MODE_CHANGED);
registerReceiver(receiver, filter, Manifest.permission.SEND_SMS, null );
```

Then, to be able to send broadcasts to those receivers, the sending app must request the permission as shown below:

```xml
<uses-permission android:name="android.permission.SEND_SMS"/>
```

