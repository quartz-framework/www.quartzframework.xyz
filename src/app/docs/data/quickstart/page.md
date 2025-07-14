---
title: Getting Started
nextjs:
  metadata:
    title: Getting Started
    description: Learn how to define a storage and run basic queries with Quartz Data.
---

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

Then, make sure you have the **quartz-data** dependency in <dependencies> block:

```xml
<dependencies>
    <dependency>
        <groupId>xyz.quartzframework</groupId>
        <artifactId>quartz-data</artifactId>
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

Then, make sure you have the **quartz-data** dependency in dependencies {} block:

```kotlin
dependencies {
    implementation("xyz.quartzframework:quartz-data")
}
```

---

## 1. Define Your Entity

Create a simple Java class representing your domain object:

```java
public class Employee {
    
    @Identity
    private UUID id;
    private String name;
    private String department;
    private int score;
    private boolean active;
    
}
```

Your entity **must** have an identity field, either annotated with:

* **@Identity** from **xyz.quartzframework.data.entity**
* or **@jakarta.persistence.Id** (mandatory for JPA-based modules)

Quartz uses this field to uniquely identify entities when storing, updating, or deleting them.

---

## 2. Create a Storage Interface

Create a new interface and annotate it with **@Storage**. Then extend one of the built-in storage types like **InMemoryStorage**:

```java
@Storage
public interface EmployeeStorage extends InMemoryStorage<Employee, UUID> {

    List<Employee> findByName(String name);

    @Query("find where score > ?1 order by score desc")
    List<Employee> findTopScorers(int minScore);
}
```

The interface must be parameterized as **<Entity, ID>**, where **ID** matches the type of the identity field in your entity.

This storage interface will be automatically discovered, registered, and made available for dependency injection.

---

## 3. Use Your Storage

Inject your storage and call query methods like any regular service:

```java
@Inject
private EmployeeStorage employeeStorage;

public void printActiveEmployees() {
    List<Employee> employees = employeeStorage.findByName("Alice");
    employees.forEach(e -> System.out.println(e.getName()));
}
```

If using a module like **quartz-starter-data-jpa**, ensure your JPA configuration is correctly set up (e.g. persistence unit, entity scanning).

---