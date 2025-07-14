---
title: Session Management
nextjs:
  metadata:
    title: Propagate Sender Context Everywhere
    description: Keep track of the active sender across threads, command chains, and schedulers using Quartz's session propagation system.
---

Quartz Framework introduces a powerful and transparent sender-aware context system called Session Management. This mechanism allows you to access contextual information about the sender (e.g. a player, console, or command source) without explicitly passing it down through method arguments.

---

## Core Concept

When a command or action is triggered by a sender, Quartz automatically captures and associates that sender with the current thread of execution using its internal SenderSession system. This sender context can then be accessed at any point during execution, even deep inside service methods that have no direct reference to the sender.

{% callout title="You should know" %}

This works across all platforms. Each supported platform has its own session implementation (e.g., SpigotSession, BungeeSession), but they behave the same way.

{% /callout %}

---

## Accessing the Sender

You can inject the current session anywhere and retrieve the current sender:

```java
@Inject
private SenderSession<?, ?> session;

public void doSomething() {
    var sender = session.getSender();
    // do something with context-aware sender
}
```

You do not need to pass the player explicitly through your method chain. The context is always available as long as the method was invoked within a Quartz-managed thread (such as command execution, tasks, or event listeners).

---

## Why This Matters

This design eliminates tightly-coupled method signatures and reduces boilerplate:

```java
// Instead of this:
public void execute(Player sender, String arg) {...}

// You can do this:
public void execute(String arg) {
    Player sender = session.getPlayer();
    ...
}
```

This also enables features like:

- Secured calls using context-aware security (@Authorize, @HasPermission)

- Automatic command execution routing

- Async-safe sender access with wrap(...) utilities

---

## Context Propagation

When using async or delayed tasks, Quartz allows you to wrap your logic so that the sender context is preserved:

```java
Runnable safeTask = session.wrap(() -> {
    Player player = session.getPlayer();
    player.sendMessage("Context restored!");
});

executor.submit(safeTask);
```

All major functional types are supported: **Runnable**, **Callable<T>**, **Supplier<T>**, **Consumer<T>**, **Function<T,R>**, etc.

---

## Sender Session Utilities

- **runWithSender(...)**: Temporarily binds a sender to the current thread

- **wrap(...)**: Wraps tasks with the current sender context

- **getSender()**: Returns the raw platform sender (e.g., CommandSender)

- **getPlayer()**: Attempts to cast the sender to a Player (or returns null)

- **getSenderId()**: Returns a consistent sender identifier (UUID or lowercase name)