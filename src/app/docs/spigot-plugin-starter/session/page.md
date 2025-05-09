---
title: Spigot Session Management
nextjs:
  metadata:
    title: Spigot Session Management
    description: Use platform-specific session types to access sender context safely.
---

Quartz provides a dedicated **SpigotSession** type to access the current **Player** or **CommandSender** directly within your plugin logic.

---

## Injecting Spigot Session

You can inject **SpigotSession** just like any other bean:

```cpp
@Inject
private SpigotSession session;
```

Once injected, you can retrieve the current sender or player safely:

```cpp
Player player = session.getPlayer();
CommandSender sender = session.getSender();
```

---

## Purpose

Using **SpigotSession** avoids the need to pass the sender manually across method layers. It ensures consistent access to sender context within Quartz-managed threads such as commands, tasks, and events.

➡️ Learn more in [Session Management](/docs/core/session)