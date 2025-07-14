---
title: Quartz Starter Bungee Plugin
nextjs:
  metadata:
    title: Get Started with Quartz on BungeeCord
    description: Use Quartz Core to power BungeeCord plugins with a robust architecture, modular lifecycle, and advanced DI support.
---

Quartz Bungee Plugin Starter is the official way to build plugins for BungeeCord and forks using the Quartz Framework. It brings the full power of Quartz Core to the proxy layer, enabling structured development with lifecycle hooks, dependency injection, AOP, task scheduling, command parsing, event listeners, and more.

## What It Does

- Bootstraps a full-featured plugin context

- Registers and initializes **@Injectable**, **@Configurer**, and **@Bootstrapper** beans

- Sets up your command system, event listeners, and task schedulers

- Provides direct access to Bukkit classes (e.g., ProxiedPlayer, CommandSender, ProxyServer)

- Automatically manages plugin lifecycle with shutdown hooks and context cleanup

---

## Your Plugin Class

```java
@QuartzPlugin
public class MyPlugin extends BungeePlugin {

    @Override
    public void main() {
        BungeePlugin
                .builder(this)
                .build();

    }
```
## Learn More

Ready to build powerful BungeeCord plugins with Quartz? Continue to the [Bungee Starter Guide](/docs/plugin/bungee/quickstart)