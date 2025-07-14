---
title: Spigot Permissions & Security
nextjs:
  metadata:
    title: Spigot Permissions & Security
    description:  Spigot-specific security helpers built on top of Quartz permission system.
---

Quartz for Spigot includes additional annotations tailored for Bukkit-based platforms to simplify sender permission checks.

---

## Built-in Spigot Annotations

These are shortcuts for common permission checks, especially useful in command and event logic:

### @PlayerOnly

Restricts access to players only. If the sender is not a player, a **PlayerNotFoundException** will be thrown.

```java
@PlayerOnly
public void onlyForPlayers() {
    Player player = session.getPlayer();
    ...
}
```

### @OpOnly

Restricts execution to operator (OP) players.

```java
@OpOnly
public void onlyForOps() {
    // will only run if sender is a player and isOp()
}
```

These annotations are powered by the same expression engine used by **@Authorize**, so they integrate seamlessly with the broader security system.

➡️ Learn more in [Permissions & Security](/docs/plugin/security)