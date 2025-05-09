---
title: Quartz Application
nextjs:
  metadata:
    title: Quartz Application
    description: Understand why @QuartzApplication is the most important annotation in the Quartz Framework ecosystem.
---

The **@QuartzApplication** annotation is the entry point of any Quartz-based application. It defines the root of the context and controls scanning, behavior, and bootstrapping options.

You must place **@QuartzApplication** on your main class to initialize Quartz properly.

## Parameters

- **basePackages**: Manually define the packages to scan for beans, configurers, and bootstrappers.

- **excludeClasses**: Skip specific classes from the context.

- **exclude**: String-based exclusion logic (wildcard, etc.).

- **verbose**: Enable detailed logs of boot process.

- **enableConfigurers**: Whether or not to process **@Configurer** beans. Can be overridden on the annotation itself with **@Configurer(force = true)**.

---

## Quick Example

```cpp
@QuartzApplication
public class MyPlugin extends SpigotPlugin {

    @Override
    public void main() {
        SpigotPlugin
            .builder(this)
            .build();
    }
}
```