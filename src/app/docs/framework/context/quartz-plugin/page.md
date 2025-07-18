---
title: Quartz Plugin
nextjs:
  metadata:
    title: Defining a Quartz Plugin
    description: The @QuartzPlugin annotation marks the entry point of a module, enabling Quartz to discover components, initialize dependencies, and activate features.
---

The **@QuartzPlugin** annotation is the entry point of any Quartz-based application. It defines the root of the context and controls scanning, behavior, and bootstrapping options.

You must place **@QuartzPlugin** on your main class to initialize Quartz properly.

## Parameters

- **basePackages**: Manually define the packages to scan for beans, configurers, and bootstrappers.

- **excludeClasses**: Skip specific classes from the context.

- **exclude**: String-based exclusion logic (wildcard, etc.).

- **verbose**: Enable detailed logs of boot process.

- **enableConfigurers**: Whether to process **@Configurer** beans. Can be overridden on the annotation itself with **@Configurer(force = true)**.

---

## Quick Example

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