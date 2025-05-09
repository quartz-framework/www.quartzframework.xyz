---
title: Quartz Bungee Plugin Starter
nextjs:
  metadata:
    title: Get started with Quartz Framework on BungeeCord
    description: Learn how Quartz Core powers the foundation of your plugin's architecture.
---

Quartz Bungee Plugin Starter is the official way to build plugins for BungeeCord and forks using the Quartz Framework. It brings the full power of Quartz Core to the proxy layer, enabling structured development with lifecycle hooks, dependency injection, AOP, task scheduling, command parsing, event listeners, and more.

## What It Does

- Bootstraps a full-featured plugin context

- Registers and initializes @Injectable, @Configurer, and @Bootstrapper beans

- Sets up your command system, event listeners, and task schedulers

- Provides direct access to Bukkit classes (e.g., ProxiedPlayer, CommandSender, ProxyServer)

- Automatically manages plugin lifecycle with shutdown hooks and context cleanup

---

## Your Plugin Class

```cpp
@QuartzApplication
public class MyPlugin extends BungeePlugin {

    @Override
    public void main() {
        BungeePlugin
                .builder(this)
                .build();

    }
```
## Learn More

Ready to build powerful BungeeCord plugins with Quartz? Continue to the [Bungee Starter Guide](/docs/bungee-plugin-starter/quickstart)