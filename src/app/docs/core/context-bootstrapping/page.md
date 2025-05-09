---
title: Context Lifecycle & Bootstrapping
nextjs:
  metadata:
    title: Context Lifecycle & Bootstrapping
    description: Understand the initialization phases and lifecycle hooks available in Quartz Framework.
---

The first thing to understand when working with Quartz Framework is that it acts as a modular, phased container. When your application starts, Quartz creates and manages its own context, executing initialization in well-defined lifecycle phases.

This ensures predictable ordering, contextual awareness, and custom extension support — from bean registration to full execution.

---

## Summary

Quartz initializes context in structured phases to ensure that cross-cutting features, context customization, and internal setup occur in the right order. Here's how to plug into it:

| Annotation     | Role                                 | Phase          |
|----------------|--------------------------------------|----------------|
| @Discover      | Scans additional packages for beans  | Early          |
| @Configurer    | Programmatic context customization   | Early          |         
| @Bootstrapper  | Internal service or logic setup      | Mid-phase      |   
| @Injectable    | General bean declaration             | Post-bootstrap | 
| @PostConstruct | Called after bean instantiation      | Per bean       | 
| @PreDestroy    | Called before context shutdown       | Per bean       |
| @ContextLoads  | Called after full context bootstrap  | End boot phase |
| @External      | Imports external configuration class | Pre-scan       |

These lifecycle hooks and bootstrap annotations make Quartz an excellent foundation for modular plugin development and framework composition.

---

## Context Initialization Phases

Quartz processes beans in a specific sequence. Internally, the engine uses a phase(...) mechanism to run through the following boot lifecycle:

- Aspect Beans — Beans responsible for runtime weaving and AOP

- Context Bootstrappers — Executed very early to prepare context-wide state

- Configurers — Used for customizing bean context before general bean instantiation

- Bootstrappers — Main plugin setup logic

- Regular Beans — All other injectables

- Start Hooks — Beans with lifecycle methods like **@ContextLoads**

### Bean Construction Lifecycle

- All beans follow this construction pipeline:

- If the bean is a singleton and already initialized, it's skipped.

  - Otherwise, Quartz calls:

    1. construct(...) → instantiate the class if needed

    2. recursiveInjection(...) → inject all dependencies

    3. **@PostConstruct** methods

    4. Any matching **@Provide** method beans are also constructed

    5. Finally, the bean is marked as initialized

### Lifecycle Hooks

Quartz provides several lifecycle annotations to hook into different phases of your application:

#### @PostConstruct

Executed after a bean is created and dependencies are injected.

```cpp
@PostConstruct
public void init() {
    // runs after bean is constructed
}
```

#### @PreDestroy

Executed right before the context is shut down.

```cpp
@PreDestroy
public void cleanUp() {
    // run logic here
}
```

#### @ContextLoads

Executed after all beans have been initialized. Use this for final setup once the DI context is ready.

```cpp
@ContextLoads
public void onContextReady() {
    // executed at the end of boot
}
```

---

## @Configurer

**@Configurer** is a special kind of **@Injectable** that is processed early in the boot phase. It allows you to programmatically register or manipulate beans before the main plugin logic executes.

```cpp
@Configurer
public class MetricsConfigurer {

    @Provide
    @NamedInstance("metrics")
    public MetricsService provideMetrics() {
        return new MetricsService("quartz-plugin");
    }
}
```

{% callout title="You should know" %}

Configurers run before `@Bootstrapper` or general beans are initialized.

If the main class is annotated with `@QuartzApplication(enableConfigurers = false)`, configurers will be skipped unless they are marked with `@Configurer(force = true)`.

{% /callout %}

All registered beans, regardless of how they are declared (**@Injectable**, **@Provide**, etc.), can be named using **@NamedInstance**. This makes it possible to resolve a specific bean among multiple candidates of the same type.

{% callout title="Spring Support" %}

Tip: Works with Spring's `@Qualifier` annotation.

{% /callout %}

---

## @Bootstrapper

**@Bootstrapper** is another specialized **@Injectable** used for early plugin logic. It can prepare internal services, state, or resources that must be ready before the rest of the plugin executes.

```cpp
@Bootstrapper
public class MainInitializer {

    @PostConstruct
    public void setup() {
        System.out.println("Bootstrapping plugin...");
    }
}
```

---

## External beans with @External

You can include configuration or bean definitions from external classes using the **@External** annotation. This is useful for modularizing functionality across libraries:

```cpp
@External(MyExternalConfiguration.class)
public class MyFeature { }
```

This triggers the registration of all beans provided by **MyExternalConfiguration**.

You can also compose higher-level annotations (e.g. **@EnableX**) that internally reference **@External**.

---

## Scanning with @Discover

To scan for beans outside the default package, annotate any bean (or your main class) with **@Discover** or configure it via **@QuartzApplication(basePackages = {"xyz.my.lib"})**:

This enables annotation scanning for beans, configurers, and bootstrappers in your own packages or in shared libraries.

---

## Extension-Oriented by Design

Quartz Core was built from the ground up to be extensible. You can:

- Define your own **@Configurer** and **@Bootstrapper** classes inside external libraries

- Use **@External(SomeConfig.class)** to import external config classes

Control activation using conditional annotations like **@ActivateWhenPropertyEquals**, **@Environment**, **@ActivateWhenClassPresent**, etc.

This design allows developers to build reusable modules and starter libraries that automatically self-configure when included.

### Example: Enable Feature Module

You can create a custom annotation like this:

```cpp
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@External(DatabaseConfigurer.class)
public @interface EnableDatabase { }
```

---

These lifecycle hooks and bootstrap annotations make Quartz an excellent foundation for modular plugin development and framework composition.