---
title: BungeeCord Permissions & Security
nextjs:
  metadata:
    title: BungeeCord Permissions & Security
    description:  BungeeCord-specific security helpers built on top of Quartz permission system.
---

Quartz for BungeeCord includes additional annotations tailored for Proxy-based platforms to simplify sender permission checks.

---

## Built-in BungeeCord Annotations

These are shortcuts for common permission checks, especially useful in command and event logic:

### @ProxiedPlayerOnly

Restricts access to players only. If the sender is not a player, a **PlayerNotFoundException** will be thrown.

```cpp
@ProxiedPlayerOnly
public void onlyForProxiedPlayers() {
    ProxiedPlayer player = session.getPlayer();
    ...
}
```

These annotations are powered by the same expression engine used by **@Authorize**, so they integrate seamlessly with the broader security system.

➡️ Learn more in [Permissions & Security](/docs/core/security)