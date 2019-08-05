---
title: Professional Android笔记：GRADLE构建
catalog: true
date: 2017-04-12 16:25:11
subtitle:
updated: 2017-04-12 23:17:53
cover: /posts/pro-android-activity-ui/1iTDUQIbX397042030.jpg
categories:
- 技术
tags: 
- 安卓
- Android
- Gradle
---

Android 构建系统编译应用资源和源代码，然后将它们打包成可供测试、部署、签署和分发的 APK。 Android Studio 使用 [Gradle](http://www.gradle.org/) 这一高级构建工具包来自动执行和管理构建流程，同时也允许您定义灵活的自定义构建配置。 每个构建配置均可自行定义一组代码和资源，同时对所有应用版本共有的部分加以重复利用。 Android Plugin for Gradle 与这个构建工具包协作，共同提供专用于构建和测试 Android 应用的流程和可配置设置。
<!--more--> 

Gradle 和 Android 插件独立于 Android Studio 运行。 这意味着，您可以在 Android Studio 内、计算机上的命令行或未安装 Android Studio 的计算机（例如持续性集成服务器）上构建 Android 应用。 如果不使用 Android Studio，可以参考[从命令行构建和运行您的应用](https://developer.android.com/studio/build/building-cmdline.html)。 无论您是从命令行、在远程计算机上还是使用 Android Studio 构建项目，构建的输出都相同。

# 构建流程 The build process

构建流程涉及许多将项目转换成 Android 应用软件包 (APK) 的工具和流程。
<img src="https://developer.android.com/images/tools/studio/build-process_2x.png" alt="典型Android应用模块的构建流程" width="475">
典型 Android 应用模块的构建流程通常依循下列步骤：
1. 编译器将您的源代码转换成 DEX（Dalvik Executable) 文件（其中包括 Android 设备上运行的字节码），将所有其他内容转换成已编译资源。
2. APK 打包器将 DEX 文件和已编译资源合并成单个 APK。 不过，必须先签署 APK，才能将应用安装并部署到 Android 设备上。
3. APK 打包器使用调试或发布密钥库签署 APK：
   1. 如果构建的是调试版本的应用（即专用于测试和分析的应用），打包器会使用调试密钥库签署应用。 Android Studio 自动使用调试密钥库配置新项目。
   2. 如果构建的是打算向外发布的发布版本应用，打包器会使用发布密钥库签署应用。 若要创建发布密钥库，请参考[在 Android Studio 中签署您的应用](https://developer.android.com/studio/publish/app-signing.html#studio)。
4. 在生成最终 APK 之前，打包器会使用 [zipalign](https://developer.android.com/studio/command-line/zipalign.html) 工具对应用进行优化，减少其在设备上运行时占用的内存。



# 自定义构建配置

Gradle 和 Android 插件可完成以下方面的构建配置：

- 构建类型 Build Types

  构建类型定义 Gradle 在构建和打包应用时使用的某些属性，通常针对开发生命周期的不同阶段进行配置。 例如，调试构建类型支持调试选项，使用调试密钥签署 APK；而发布构建类型则可压缩、混淆 APK 以及使用发布密钥签署要分发的 APK。 必须至少定义一个构建类型才能构建应用 - Android Studio 默认情况下会创建调试和发布构建类型。 要开始为应用自定义打包设置，请学习如何[配置构建类型](https://developer.android.com/studio/build/build-variants.html#build-types)。

- 产品风格 Product flavors

  产品风格代表可以向用户发布的不同版本的应用，例如免费和付费版本的应用。 可以将产品风格自定义为使用不同的代码和资源，同时对所有应用版本共有的部分加以共享和重复利用。 产品风格是可选项，并且必须手动创建。 要开始创建不同的应用版本，请学习如何[配置产品风格](https://developer.android.com/studio/build/build-variants.html#product-flavors)。

- 构建变体 Build Variants

  构建变体是构建类型与产品风格的交叉产物，是 Gradle 在构建应用时使用的配置。 可以利用构建变体在开发时构建调试版本的产品风格，或者构建要分发的已签署发布版产品风格。 不是直接配置构建变体，而是配置组成变体的构建类型和产品风格。 创建附加构建类型或产品风格也会创建附加构建变体。 要了解如何创建和管理构建变体，请阅读[配置构建变体](https://developer.android.com/studio/build/build-variants.html) 概览。

- 清单条目 Manifest Entries

  可以为构建变体配置中清单文件的一些属性指定值。 这些构建值会替换清单文件中的现有值。 如果您想为模块生成多个 APK，让每一个 APK 文件都具有不同的应用名称、最低 SDK 版本或目标 SDK 版本，便可运用这一技巧。 存在多个清单时，Gradle 会[合并清单设置](https://developer.android.com/studio/build/manifest-merge.html)。

- 依赖项 Dependencies

  构建系统管理来自本地文件系统以及来自远程存储区的项目依赖项。 这样一来，不必手动搜索、下载依赖项的二进制文件包以及将它们复制到项目目录内。 要了解更多信息，请参阅[添加构建依赖项](https://developer.android.com/studio/build/dependencies.html)。

- 签署 Signing

  构建系统能够在构建配置中指定签署设置，并可在构建过程中自动签署APK。 构建系统通过使用已知凭据的默认密钥和证书签署调试版本，以避免在构建时提示密码。 除非为此构建明确定义签署配置，否则，构建系统不会签署发布版本。 

- ProGuard

  构建系统让您能够为每个构建变体指定不同的 [ProGuard](https://developer.android.com/studio/build/shrink-code.html) 规则文件。 构建系统可在构建过程中运行 ProGuard 对类进行压缩和混淆处理。

- 多APK支持 Multiple APK Support

  构建系统让您能够自动构建不同的 APK，并且每个 APK 只包含特定屏幕密度或应用二进制界面 (ABI) 所需的代码和资源。 如需了解详细信息，请参阅[ 构建多个 APK](https://developer.android.com/studio/build/configure-apk-splits.html)。

# 构建配置文件

自定义构建配置需要对一个或多个构建配置文件（或 `build.gradle` 文件）进行更改。 这些纯文本文件使用域特定语言 (DSL) 以 [Groovy](http://groovy-lang.org/) 语言描述和操作构建逻辑，其中 Groovy 是一种适用于 Java 虚拟机 (JVM) 的动态语言。 如需了解有关 Android 插件 DSL 的更多信息，请阅读 [DSL 参考文档](http://google.github.io/android-gradle-dsl/current/index.html)。

Each project contains a series of Gradle files used to define your build configuration, consisting of a: 
- Project-scoped `settings.gradle` file that defines which modules should be included when building your application. 
- Project-scoped `build.gradle` file in which the repositories and dependencies for Gradle itself are specified, as well as any repositories and dependencies common to all your modules. 
- Module-scoped `build.gradle` file(s) used to configure build settings for your application, including dependencies, minimum and targeted platform versions, your application’s version information, and multiple build types and product flavors. 

开始新项目时，Android Studio 会自动为您创建其中的部分文件，并为其填充*合理的默认值*。
<img src="https://developer.android.com/images/tools/studio/project-structure_2x.png" alt="Android 应用模块的默认项目结构" width="339">

## Gradle设置文件 Settings File

`settings.gradle` 文件位于项目根目录，用于指示 Gradle 在构建应用时应将哪些模块包括在内。 对大多数项目而言，该文件很简单，只包括以下内容：

```groovy
include ‘:app’
```

不过，多模块项目需要指定应包括在最终构建之中的每个模块。

## 顶级构建文件 Project Gradle Build File 

顶级项目范围 (top-level project-scoped) `build.gradle` 文件位于项目根目录，用于定义适用于项目中所有模块的构建配置。 

The `buildscript` node is used to indicate the repositories and dependencies that are used by Gradle itself—not for your application.

```groovy
buildscript {
    repositories {
        google()
        jcenter()
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:3.3.2'
    }
}
```
Use the `allprojects` block to specify repositories and dependencies used by all modules in your project, though for projects with a single module it’s common practice to include its dependencies in the module-level build.gradle file.
```groovy
allprojects {
   repositories {
       google()
       jcenter()
   }
}
```

### 配置项目范围的属性

对于包含多个模块的 Android 项目，在项目级别定义某些属性，并在所有模块间共享这些属性可能会非常有用。 为此，您可以将 [额外属性](https://docs.gradle.org/current/userguide/writing_build_scripts.html#sec:extra_properties)添加到顶级 `build.gradle` 文件的 `ext` 代码块中。

```groovy
buildscript {...}

allprojects {...}

// This block encapsulates custom properties and makes them available to all
// modules in the project.
ext {
    // The following are only a few examples of the types of properties you can define.
    compileSdkVersion = 28
    // You can also create properties to specify versions for dependencies.
    // Having consistent versions between modules can avoid conflicts with behavior.
    supportLibVersion = "28.0.0"
    ...
}
...
```


要从相同项目中的模块访问这些属性，请在模块的 `build.gradle` 文件中使用以下语法。

```groovy
android {
  // Use the following syntax to access properties you defined at the project level:
  // rootProject.ext.property_name
  compileSdkVersion rootProject.ext.compileSdkVersion
  ...
}
...
dependencies {
    implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"
    ...
}
```



## 模块级构建文件 Module Gradle Build Files

模块级 `build.gradle` 文件位于各 `project/module/` 目录中，用于配置适用于其所在模块的构建设置。 可以通过配置这些构建设置来提供自定义打包选项（例如附加构建类型和产品风格），以及替换`main/` app manifest或顶级 `build.gradle` 文件中的设置。

The first line in the build configuration applies the Android plugin for Gradle to this build, which makes it possible to use the android block to specify Android-specific build options:
```groovy
apply plugin: 'com.android.application'
```
Within the top level of the `android` block you specify the Android application configuration options, such as the version of the SDK with which to compile your application. Be sure to update these values when you download a new SDK release:

```groovy
android {
	compileSdkVersion 27
	defaultConfig {...} 
	buildTypes {...} 
	productFlavors {...} 
	splits {...}
}
```
### Default Configuration
The `defaultConfig` block (within the android block) specifies default settings that will be shared across all your different product flavors:

```groovy
  defaultConfig {
    applicationId 'com.example.myapp'

    minSdkVersion 15
    targetSdkVersion 28

    versionCode 1
    versionName "1.0"
  }
```
`applicationId`—To provide a unique “package name” that will be used to identify the built APK for publishing and distribution. By default, and requirement, this should use the same package name as defined within main/AndroidManifest.xml, and you application classes.

### 构建类型 Build Types
The `buildTypes` block is used to define multiple different build types—typically debug and release. 
当创建新模块时，Android Studio 会自动创建调试和发布这两种构建类型。尽管调试构建类型不会出现在构建配置文件中，Android Studio 会为其配置 debuggable true。这样就可以在安全的 Android 设备上调试应用并使用通用调试密钥库配置 APK 签署。

The default release build type (shown in the following code) applies Proguard settings to shrink and obfuscate the compiled code, and does not use a default signing key.
如果您希望添加或更改特定设置，您可以将调试构建类型添加到您的配置中。以下示例为调试构建类型指定了 applicationIdSuffix，并配置了一个使用调试构建类型中的设置进行初始化的“staging”构建类型。
```groovy
  buildTypes {
    release {
        minifyEnabled true // Enables code shrinking for the release build type.
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
    debug {
        applicationIdSuffix ".debug"
        debuggable true
    }

    /**
     * The `initWith` property allows you to copy configurations from other build types,
     * then configure only the settings you want to change. This one copies the debug build
     * type, and then changes the manifest placeholder and application ID.
     */
    staging {
        initWith debug
        manifestPlaceholders = [hostName:"internal.example.com"]
        applicationIdSuffix ".debugStaging"
    }
  }
```

### 配置产品风格 Product Flavors and Flavor Dimensions
The `flavorDimensions` and `productFlavors` blocks are optional nodes, not included by default, which allows you to override any of the values you defined in the defaultConfig block to support different versions (flavors) of your application using the same codebase. Each product flavor should specify its own unique application ID so that each can be distributed and installed independently.

所有风格必须属于指定的风格维度，即产品风格组。即使打算只使用一个维度，也必须将风格分配到特定风格维度。以下代码示例将创建名为“version”的风格维度，并添加“demo”和“full”产品风格。这些风格可自行提供其 [`applicationIdSuffix`](http://google.github.io/android-gradle-dsl/current/com.android.build.gradle.internal.dsl.ProductFlavor.html#com.android.build.gradle.internal.dsl.ProductFlavor:applicationIdSuffix) 和 [`versionNameSuffix`](http://google.github.io/android-gradle-dsl/current/com.android.build.gradle.internal.dsl.ProductFlavor.html#com.android.build.gradle.internal.dsl.ProductFlavor:versionNameSuffix)：

```groovy
    // Specifies one flavor dimension.
    flavorDimensions "version"
    productFlavors {
        demo {
            // Assigns this product flavor to the "version" flavor dimension.
            // This property is optional if you are using only one dimension.
            dimension "version"
            applicationIdSuffix ".demo"
            versionNameSuffix "-demo"
        }
        full {
            dimension "version"
            applicationIdSuffix ".full"
            versionNameSuffix "-full"
        }
    }
```

在创建和配置您的产品风格之后，在通知栏中点击 **Sync Now**。在同步完成后，Gradle 会根据您的构建类型和产品风格自动创建构建变体，并按照 `<product-flavor><Build-Type>` 的格式命名这些变体。例如，如果您创建了“demo”和“full”这两种产品特点，并保留默认的“调试”和“发布”构建类型，Gradle 将创建以下构建不同类型：

- *demoDebug*
- *demoRelease*
- *fullDebug*
- *fullRelease*

您可以将构建变体更改为您要构建并运行的任何变体，只需转到 **Build** > **Select Build Variant**，然后从下拉菜单中选择一个变体即可。然而，要自定义每个构建变体及其功能和资源，请参考[创建和管理源集](https://developer.android.com/studio/build/build-variants#sourcesets)。

某些情况下，您可能希望组合多个产品风格中的配置。例如，您可能希望基于 API 级别为“full”和“demo”产品风格创建不同的配置。为此，您可以通过 Android Plugin for Gradle 创建多组产品风格，即风格维度。构建应用时，Gradle 会将您定义的每个风格维度中的产品风格配置与构建类型配置组合，以创建最终构建变体。Gradle 不会组合属于相同风格维度的产品风格。

下面的代码示例使用 [`flavorDimensions`](http://google.github.io/android-gradle-dsl/current/com.android.build.gradle.AppExtension.html#com.android.build.gradle.AppExtension:flavorDimensions(java.lang.String[])) 属性创建一个“mode”风格维度以组织“full”和“demo”产品风格，以及一个“api”风格维度以基于 API 级别组织产品风格配置：

```groovy
android {
  ...
  buildTypes {
    debug {...}
    release {...}
  }

  // Specifies the flavor dimensions you want to use. The order in which you
  // list each dimension determines its priority, from highest to lowest,
  // when Gradle merges variant sources and configurations. You must assign
  // each product flavor you configure to one of the flavor dimensions.
  flavorDimensions "api", "mode"

  productFlavors {
    demo {
      // Assigns this product flavor to the "mode" flavor dimension.
      dimension "mode"
      ...
    }

    full {
      dimension "mode"
      ...
    }

    // Configurations in the "api" product flavors override those in "mode"
    // flavors and the defaultConfig block. Gradle determines the priority
    // between flavor dimensions based on the order in which they appear next
    // to the flavorDimensions property above--the first dimension has a higher
    // priority than the second, and so on.
    minApi24 {
      dimension "api"
      minSdkVersion 24
      // To ensure the target device receives the version of the app with
      // the highest compatible API level, assign version codes in increasing
      // value with API level. To learn more about assigning version codes to
      // support app updates and uploading to Google Play, read Multiple APK Support
      versionCode 30000 + android.defaultConfig.versionCode
      versionNameSuffix "-minApi24"
      ...
    }

    minApi23 {
      dimension "api"
      minSdkVersion 23
      versionCode 20000  + android.defaultConfig.versionCode
      versionNameSuffix "-minApi23"
      ...
    }

    minApi21 {
      dimension "api"
      minSdkVersion 21
      versionCode 10000  + android.defaultConfig.versionCode
      versionNameSuffix "-minApi21"
      ...
    }
  }
}
...
```

Gradle 创建的构建变体数量等于每个风格维度中的风格数量与您配置的构建类型数量的乘积。在 Gradle 为每个构建变体或对应 APK 命名时，属于较高优先级风格维度的产品风格首先显示，之后是较低优先级维度的产品风格，再之后是构建类型。以上面的构建配置为例，Gradle 可以使用以下命名方案创建总共 12 个构建变体：
构建变体：`[minApi24, minApi23, minApi21][Demo, Full][Debug, Release]`
对应 APK：`app-[minApi24, minApi23, minApi21]-[demo, full]-[debug, release].apk`

Gradle 会为您配置的产品风格与构建类型的每个可能的组合创建构建变体。不过，某些特定的构建变体在您的项目环境中并不必要，也可能没有意义。可以在模块级 `build.gradle` 文件中创建一个变体过滤器，以移除某些构建变体配置。

以上一部分中的构建配置为例，假设仅计划为演示版本的应用提供 API 级别 23 和更高级别支持。您可使用 [`variantFilter`](http://google.github.io/android-gradle-dsl/current/com.android.build.api.variant.VariantFilter.html) 代码块过滤出组合“minApi21”和“demo”产品风格的所有构建变体配置：

```groovy
android {
  ...
  buildTypes {...}

  flavorDimensions "api", "mode"
  productFlavors {...}

  variantFilter { variant ->
      def names = variant.flavors*.name
      // To check for a certain build type, use variant.buildType.name == "<buildType>"
      if (names.contains("minApi21") && names.contains("demo")) {
          // Gradle ignores any variants that satisfy the conditions above.
          setIgnore(true)
      }
  }
}
...
```

### Splits 

You can use the optional `splits` block to configure different APK builds that contain only the code and resources for each supported screen density or ABI. 

### 声明依赖项 Dependencies 

The `dependencies` block specifies the dependencies required to build your application. 

By default, a new project will include a local binary dependency that tells Gradle to include all JAR files located in the apps/libs folder, remote binary dependencies on the Android Support Library and JUnit, and a dependency on the Android Espresso testing library: 

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support:appcompat-v7:27.1.1'
    implementation 'com.android.support.constraint:constraint-layout:1.1.2'     
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test.1.0.2' 
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.2' 
}
```

可以通过使用构建变体或测试源集的名称作为 `Implementation` 关键字的前缀，为特定的构建变体或[测试源集](https://developer.android.com/studio/test/index.html#sourcesets)配置依赖项。如需了解详细信息，请参阅[添加构建依赖项](https://developer.android.com/studio/build/dependencies.html)。

## Gradle 属性文件

Gradle 还包括两个属性文件，均位于项目根目录中，可用于指定适用于 Gradle 构建工具包本身的设置：

- `gradle.properties`：可以在其中配置项目范围 Gradle 设置，例如 Gradle 后台进程的最大堆大小，请参阅[构建环境](https://docs.gradle.org/current/userguide/build_environment.html)。
- `local.properties`：为构建系统配置本地环境属性，例如 SDK 安装路径。 由于该文件的内容由 Android Studio 自动生成并且专用于本地开发者环境，因此您不应手动修改该文件，或将其纳入您的版本控制系统。

## 源集 Source sets

Android Studio 按逻辑关系将每个模块的源代码和资源分组为*源集*。 模块的 `main/` 源集包括其所有构建变体使用的代码和资源。 其他源集目录为可选项，在您配置新的构建变体时，Android Studio 不会自动为您创建这些目录。 不过，创建类似于 `main/` 的源集有助于让 Gradle 仅在构建特定应用版本时才应使用的文件和资源井然有序：

- `src/main/`：此源集包括所有构建变体共用的代码和资源。
- `src/buildType/`：创建此源集可加入特定构建类型(a specific build type)专用的代码和资源。
- `src/productFlavor/`：创建此源集可加入特定产品风格(a specific product flavor)专用的代码和资源。如果配置构建以组合多个产品风格，则可为风格维度间产品风格的各个*组合*创建源集目录：`src/productFlavor1ProductFlavor2/`
- `src/productFlavorBuildType/`：创建此源集可加入特定构建变体(a specific build variant)专用的代码和资源。

例如，要生成应用的“fullDebug”版本，构建系统需要合并来自以下源集的代码、设置和资源：

- `src/fullDebug/`（构建变体源集）
- `src/debug/`（构建类型源集）
- `src/full/`（产品风格源集）
- `src/main/`（主源集）

如果不同源集包含同一文件的不同版本，Gradle 将按以下优先顺序决定使用哪一个文件（左侧源集替换右侧源集的文件和设置）：
构建变体 > 构建类型 > 产品风格 > 主源集 > 库依赖项

这样一来，Gradle 便可使用专用于您试图构建的构建变体的文件，同时对与其他应用版本共用的 Activity、应用逻辑和资源加以重复利用。 在[合并多个清单](https://developer.android.com/studio/build/manifest-merge.html)时，Gradle 使用同一优先顺序，这样每个构建变体都能在最终清单中定义不同的组件或权限。 如需了解有关创建自定义源集的更多信息，请转至[创建用于构建变体的源集](https://developer.android.com/studio/build/build-variants.html#sourcesets)。

