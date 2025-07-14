---
title: Quickstart (Spigot, +Forks)
nextjs:
  metadata:
    title: Quickstart (Spigot, +Forks)
    description: Get started with Quartz Framework for Spigot in minutes
---

Start building Spigot, Paper, or forked server plugins effortlessly with Quartz Framework. This guide walks you through setting up your project with the Quartz Spigot Plugin Starter.

![RELEASE](https://img.shields.io/github/v/tag/quartz-framework/quartz-parent?include_prereleases&label=RELEASE&color=%2300FF00)
![SNAPSHOT](https://img.shields.io/github/v/tag/quartz-framework/quartz-parent?include_prereleases&label=SNAPSHOT)

---

## Maven Setup

### Add Quartz Parent

First, include the Quartz parent BOM in your Maven project. This centralizes version management and simplifies dependency declarations.
```xml
<parent>
    <groupId>xyz.quartzframework</groupId>
    <artifactId>quartz-parent</artifactId>
    <version>{version}</version>
    <relativePath/>
</parent>
```

### Add Snapshot Repository

Quartz is published through Maven Central, but if you are using a snapshot version, be sure to add their repository to your <repositories> block:
```xml
<repositories>
    <repository>
        <id>sonatype-central</id>
        <url>https://central.sonatype.com/repository/maven-snapshots</url>
        <releases>
            <enabled>false</enabled>
        </releases>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
    </repository>
</repositories>
```

### Add Dependency

Then, make sure you have the **quartz-starter-spigot-plugin** dependency in <dependencies> block:

```xml
<dependencies>
    <dependency>
        <groupId>xyz.quartzframework</groupId>
        <artifactId>quartz-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>xyz.quartzframework</groupId>
        <artifactId>quartz-starter-spigot-plugin</artifactId>
    </dependency>
</dependencies>
```

## Gradle Setup

Add Quartz dependencies in your **build.gradle.kts** or **build.gradle**.

### Add Quartz Parent

First, include the Quartz parent BOM in your Gradle project. This centralizes version management and simplifies dependency declarations.

```kotlin
plugins {
  java
  id("xyz.quartzframework:quartz-parent") version "{version}"
}
```

### Add Snapshot Repository

Quartz is published through Maven Central, but if you are using a snapshot version, be sure to add their repository to your <repositories> block:

```kotlin
repositories {
    mavenCentral()
    maven {
        name = "SonatypeSnapshots"
        url = uri("https://central.sonatype.com/repository/maven-snapshots")
        mavenContent {
            snapshotsOnly()
        }
    }
}
```

### Add Dependency

Then, make sure you have the **quartz-starter-spigot-plugin** dependency in <dependencies> block:

```kotlin
dependencies {
    implementation("xyz.quartzframework:quartz-starter")
    implementation("xyz.quartzframework:quartz-starter-spigot-plugin")
}
```

## Define your Main class

```java
@QuartzPlugin
public class MyPlugin extends SpigotPlugin {

    @Override
    public void main() {
        SpigotPlugin
            .builder(this)
            .build();
    }
}
```

{% callout type="warning" title="You should know" %}

The Quartz Framework will not handle your plugin if you do not annotate your main class with `@QuartzPlugin`

{% /callout %}

## Create your plugin.yml
```yaml
name: '@project.name@'
version: '@project.version@'
main: xyz.foo.bar.MyPlugin
```

{% callout type="warning" title="You should remember" %}

Remember to correctly reference your main class in your `plugin.yml`

{% /callout %}