---
title: Async method execution
nextjs:
  metadata:
    title: Async method execution
    description: Run annotated methods asynchronously with managed thread pools in Quartz Framework.
---

Quartz Framework provides an annotation-based mechanism for running methods asynchronously using the **@Async** annotation. It supports thread pool management and is integrated with the Quartz **TaskFactory** system.

---

## Enabling Async Support

To enable async method execution, annotate any bean (e.g. your @QuartzPlugin class) with **@EnableAsyncMethods**:

```java
@EnableAsyncMethods
@QuartzPlugin
public class MyPlugin extends SpigotPlugin { ... }
```

This activates the internal **AsyncAspect**, allowing Quartz to intercept and offload method executions to background threads.

---

## Using @Async

Mark any method with **@Async** to execute it in a background thread:

```java
@Async
public void performAsyncWork() {
    log.info("Running async logic");
}
```

You can also specify the executor name (previously registered in the **TaskFactory**):

```java
@Async(executorName = "io-bound-tasks")
public void heavyIO() {
    // background work
}
```

---

## Return Types

Quartz allows the following method signatures for async execution:


| Return Type                          | Behavior                                                       |
|--------------------------------------|----------------------------------------------------------------|
| **void**                             | Runs in background, returns immediately                        |
| **Future<T> / CompletableFuture<T>** | Executed normally, Quartz does not wrap it, allowing chaining  |

Other return types are not allowed and will trigger an **AsyncException**.

### Future-based Execution

```java
@Async
public CompletableFuture<String> fetchData() {
    return CompletableFuture.supplyAsync(() -> "data");
}
```

---

## Thread Pool Registration

Quartz provides a default async executor named default-async-pool, but you can register custom ones:

```java
ScheduledTaskExecutorService pool = new DefaultScheduledTaskExecutorService(4);
taskFactory.register("io-bound-tasks", pool);
```