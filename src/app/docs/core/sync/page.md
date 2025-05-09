---
title: Sync method execution
nextjs:
  metadata:
    title: Sync method execution
    description: Enforce method execution on the main thread using Quartz Framework.
---

Quartz Framework provides an annotation-based mechanism to ensure methods run on the main thread — useful when dealing with APIs that must not be accessed from async threads (e.g., Bukkit API).

---

## Enabling Synchronization Support

To activate synchronization handling, add **@EnableMainThreadSynchronization** to any class (including your main class):

```cpp
@EnableMainThreadSynchronization
@QuartzApplication
public class MyPlugin extends SpigotPlugin { ... }
```

---

This activates the internal AOP interceptor for main thread execution enforcement.

## Using @Synchronize

Apply **@Synchronize** to any method (or class) to guarantee it will run on the main thread:

```cpp
@Synchronize
public void updatePlayerUI(Player player) {
    player.sendMessage("Synced to main thread!");
}
```

If the method is called outside the main thread, Quartz will schedule the call for the next tick instead.

### Class-Level Synchronization

You can annotate an entire class to apply synchronization to all methods:

```cpp
@Synchronize
@Injectable
public class SafeService {

    public void doSomething() { ... }

    public void updateWorld() { ... }
}
```

### Return Values

If a synchronized method is executed off the main thread and rescheduled:

- It will not block waiting for the result

- The return value will be null if accessed immediately

Use this only for void or fire-and-forget style methods unless you are calling from the main thread.