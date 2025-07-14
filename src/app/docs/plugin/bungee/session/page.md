---
title: BungeeCord Session Management
nextjs:
  metadata:
    title: BungeeCord Session Management
    description: Use platform-specific session types to access sender context safely.
---

Quartz provides a dedicated **BungeeSession** type to access the current **ProxiedPlayer** or **CommandSender** directly within your plugin logic.

---

## Injecting Bungee Session

You can inject **BungeeSession** just like any other bean:

```java
@Inject
private BungeeSession session;
```

Once injected, you can retrieve the current sender or player safely:

```java
ProxiedPlayer player = session.getPlayer();
CommandSender sender = session.getSender();
```

---

## Purpose

Using **BungeeSession** avoids the need to pass the sender manually across method layers. It ensures consistent access to sender context within Quartz-managed threads such as commands, tasks, and events.

➡️ Learn more in [Session Management](/docs/plugin/session)