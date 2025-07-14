---
title: Task & Scheduling
nextjs:
  metadata:
    title: Task & Scheduling
    description: Run tasks, schedule executions, and control thread pools with Quartz Framework.
---

Quartz Framework provides a unified, abstract task scheduling API through **TaskFactory** and **ScheduledTaskExecutorService**. It allows you to submit, delay, repeat, or cancel tasks in a simple and extensible way, all while supporting async execution and cron expressions.

---

## Default Setup

By default, Quartz registers a shared **TaskFactory** and **ScheduledTaskExecutorService** using a configurable thread pool size:

```yaml
#application.yml
quartz:
  default-task-pool:
    size: 5
```

These beans are automatically created if not already present, thanks to the internal **TaskContextBootstrapper**.

---

## Submitting Tasks

Submit any **Runnable** or **Callable<T>** to the task pool:

```java
@Inject
private TaskFactory taskFactory;

public void runTask() {
    taskFactory.submit("default", () -> {
        System.out.println("Running task");
    });
}
```

### Timeout Handling

You can submit tasks with a timeout. If the task doesn’t finish in time, it will be cancelled automatically:

```java
taskFactory.submitWithTimeout("default", () -> {
    // logic
}, 3, TimeUnit.SECONDS);
```

### Delayed Scheduling

To delay a task execution:

```java
taskFactory.schedule("default", () -> doSomething(), 2, TimeUnit.SECONDS);
```

### Fixed-Rate Scheduling

Quartz allows tasks to run repeatedly at a fixed interval:

```java
taskFactory.scheduleAtFixedRate("default", () -> checkHeartbeat(), 5, 10, TimeUnit.SECONDS);
```

### Cron-Based Scheduling

Quartz supports CRON expressions using the UNIX Cron format:

```java
taskFactory.scheduleCron("default", () -> generateReport(), "0 0 * * * *", ZoneId.systemDefault());
```

This uses [cron-utils](https://mvnrepository.com/artifact/com.cronutils/cron-utils) under the hood and will re-calculate the next execution time automatically after each run.

### Executors by Name

You can register and use custom executor services if needed:

```java
ScheduledTaskExecutorService pool = new DefaultScheduledTaskExecutorService(10);
taskFactory.register("heavy-tasks", pool);
```

Then target it by name when submitting or scheduling tasks.

---

## Graceful Shutdown

Quartz allows stopping all registered executors:

```java
taskFactory.shutdownAll();
```