---
title: Quartz Spigot Plugin Starter
nextjs:
  metadata:
    title: Get started with Quartz Framework on Spigot
    description: Build Spigot-based plugins with lifecycle, DI, AOP, cli, and more.
---

Quartz Spigot Plugin Starter is the official entry point for building Spigot, Paper, and forked server plugins using the Quartz Framework. It offers a structured and extensible boot layer that integrates tightly with Quartz Core, providing lifecycle hooks, dependency injection, AOP support, command handling, scheduled tasks, configuration binding, and event listening out of the box.

## What It Does

- Bootstraps a full-featured plugin context

- Registers and initializes @Injectable, @Configurer, and @Bootstrapper beans

- Sets up your command system, event listeners, and task schedulers

- Provides direct access to Bukkit classes (e.g., Player, CommandSender, Server)

- Automatically manages plugin lifecycle with shutdown hooks and context cleanup

---

## Your Main Class

```java
@QuartzPlugin
public class MyPlugin extends SpigotPlugin {

    @Override
    public void main() {
        SpigotPlugin
            .builder(this)
            .build();
    }
}
```
## Learn More

Ready to build powerful Spigot plugins with Quartz? Continue to the [Spigot Starter Guide](/docs/plugin/spigot/quickstart)