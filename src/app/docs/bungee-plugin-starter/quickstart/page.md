---
title: Quickstart (BungeeCord)
nextjs:
  metadata:
    title: Quickstart (BungeeCord)
    description: Get started with Quartz Framework for BungeeCord in minutes.
---

Start building BungeeCord or Waterfall plugins effortlessly with Quartz Framework. This guide walks you through setting up your project using the Quartz Bungee Plugin Starter.

[![!](https://maven-badges.sml.io/sonatype-central/xyz.quartzframework/quartz-parent/badge.svg)](https://central.sonatype.com/artifact/xyz.quartzframework/quartz-parent)
[![!](https://img.shields.io/badge/SNAPSHOT-get--latest-orange?style=flat-square)](https://central.sonatype.com/service/rest/repository/browse/maven-snapshots/xyz/quartzframework/quartz-parent/)

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

Then, make sure you have the **quartz-bungee-plugin-starter** dependency in <dependencies> block:

```xml
<dependencies>
    <dependency>
        <groupId>xyz.quartzframework</groupId>
        <artifactId>quartz-bungee-plugin-starter</artifactId>
    </dependency>
</dependencies>
```

## Gradle Setup

Add Quartz dependencies in your **build.gradle.kts** or **build.gradle**.

### Add Quartz Parent

First, include the Quartz parent BOM in your Gradle project. This centralizes version management and simplifies dependency declarations.

```kotlin
dependencies {
    implementation(platform("xyz.quartzframework:quartz-parent:{version}"))
}
```

### Add Snapshot Repository

Quartz is published through Maven Central, but if you are using a snapshot version, be sure to add their repository to your repositories {} block:

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

Then, make sure you have the **quartz-bungee-plugin-starter** dependency in dependencies {} block:

```kotlin
dependencies {
    implementation("xyz.quartzframework:quartz-bungee-plugin-starter")
}
```

## Define your Main class

```cpp
@QuartzApplication
public class MyPlugin extends BungeePlugin {

    @Override
    public void main() {
        BungeePlugin
                .builder(this)
                .build();

    }
```

{% callout type="warning" title="You should know" %}

The Quartz Framework will not handle your plugin if you do not annotate your main class with `@QuartzApplication`

{% /callout %}

## Create your bungee.yml
```yaml
name: '@project.name@'
version: '@project.version@'
main: xyz.foo.bar.MyPlugin
```

{% callout type="warning" title="You should remember" %}

Remember to correctly reference your main class in your `bungee.yml`

{% /callout %}