---
title: Repeated Tasks
nextjs:
  metadata:
    title: Repeated Tasks
    description:  Learn how Quartz Framework supports automatic scheduling of repeated tasks using annotations
---

Quartz Framework supports declarative scheduling of repeated tasks using the **@RepeatedTask** annotation. This allows developers to define periodic logic in a clean, annotation-driven way without managing scheduling manually.

---

## Enabling Repeated Tasks

To activate support for repeated task discovery, annotate any Quartz-managed bean (including the main class) with:

```java
@EnableRepeatedTasks
@QuartzPlugin
public class MyPlugin extends SpigotPlugin { ... }
```

This enables the internal **TaskInitializationContextBootstrapper**, which scans all beans for methods annotated with **@RepeatedTask** and schedules them automatically after the context is loaded.

## Usage

Annotate any method inside an injectable or other context-managed bean with **@RepeatedTask**:

```java
@RepeatedTask(fixedDelay = 5, timeUnit = TimeUnit.SECONDS)
public void tick() {
    log.info("Running every 5 seconds");
}
```

You can use either fixed delays or cron expressions, depending on your use case.

---

### Available Options


| Attribute        | Description                                                           |
|------------------|-----------------------------------------------------------------------|
| **fixedDelay**   | Delay between executions (default: -1 = disabled)                     |
| **initialDelay** | Optional delay before first execution                                 |  
| **timeUnit**     | Unit of time for fixed delays (default: MILLISECONDS)                 |
| **cron**         | Cron expression (default: * * * * *)                                  |
| **zoneId**       | Time zone for cron execution (default: system time zone or "default") |
| **executorName** | Executor pool name to target (default: **default**)                   |

If fixedDelay is set to -1, Quartz will use the cron strategy to determine execution.

---

## Cron-based Execution

```java
@RepeatedTask(cron = "0 */5 * * * *")
public void everyFiveMinutes() {
    log.info("Triggered on schedule");
}
```

---

## Lifecycle Management

When **@EnableRepeatedTasks** is active:

All **@RepeatedTask** methods are scheduled after the DI context is fully loaded (**@ContextLoads**)

All executors are gracefully shutdown during **@PreDestroy** phase