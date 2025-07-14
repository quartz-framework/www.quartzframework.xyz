---
title: Getting started
---

{% quick-links %}

{% quick-link title="Starting with Quartz" icon="installation" href="https://start.quartzframework.xyz" description="Kickstart your project using start.quartzframework.xyz, a simple initializer to configure your plugin in seconds." /%}

{% quick-link title="GitHub" icon="presets" href="https://github.com/quartz-framework" description="Browse the Quartz source code and related repositories directly on GitHub." /%}

{% /quick-links %}

Quartz is a modular framework that provides core infrastructure primitives essential for building robust application architectures, including dependency injection, configuration management, lifecycle orchestration, aspect-oriented programming (AOP), and command routing. It is explicitly designed for deterministic execution within classloader-isolated environments, making it particularly suitable for plugin-based runtimes and constrained platforms where conventional frameworks relying on reflection or dynamic classpath scanning are impractical or unsafe.

Quartz’s architecture enforces explicit wiring and static metadata usage, ensuring predictable behavior and resource management in environments such as Minecraft plugins, command-line tools, and embedded runtimes, where traditional frameworks often encounter limitations due to global state, classloader leaks, or complex runtime introspection.

---

## Quartz Architecture

Quartz is architected around a statically constructed dependency injection container that leverages compile-time metadata for bean resolution and lifecycle management. Rather than relying on runtime scanning or reflection, Quartz employs a metadata-driven approach where application contexts are explicitly defined and initialized in discrete phases.

The framework segments the application lifecycle into well-defined stages—discovery, injection, construction, initialization, and teardown—each with deterministic ordering and scoped execution. This model facilitates fine-grained control over bean instantiation, lifecycle callbacks, and proxy generation.

Quartz is designed for JVM environments requiring strict classloader isolation and scoped runtime separation, enabling multiple independent modules or plugins to coexist safely within the same process without classloader leakage or state contamination. This design supports isolated execution contexts with explicit dependency graphs, ensuring modularity and predictable resource management.

---

### Core Capabilities

### Deterministic Dependency Injection

Quartz provides a custom dependency injection container with advanced features including explicit bean registration, qualified injection, and support for proxy handling. It implements custom lifecycle scopes beyond singleton and prototype, allowing deferred initialization and context-scoped beans.

The DI system performs context-aware resolution using static metadata, avoiding runtime reflection. It supports lifecycle annotations such as `@ContextLoads` and `@PreDestroy`, enabling precise control over bean initialization and destruction. Proxy creation is integrated into the lifecycle, facilitating AOP and scoped proxy support without dynamic bytecode weaving.

### Modular Lifecycle Management

Quartz manages application lifecycle through a deterministic phase execution model. Each phase—discovery, conditional evaluation, bean construction, aspect injection, and initialization—is executed in a defined order with dependency evaluation ensuring correct sequencing.

This phased approach enables scoped proxy-aware construction and lifecycle hook invocation, supporting reloading or hot-swapping of contexts at runtime. Lifecycle hooks are registered and invoked within the container’s managed environment, ensuring resource safety and consistent state transitions throughout the application lifecycle.

### Property Binding and Configuration

Quartz implements hierarchical, type-safe configuration binding using annotation processing and metadata resolution strategies. Properties can be bound to fields or classes via annotations, supporting integration with YAML files, system properties, and environment variables.

The configuration system merges multiple sources statically at startup, avoiding runtime scanning or reflection. This approach guarantees consistent and deterministic property resolution across different execution contexts, facilitating predictable configuration management in modular applications.

### Native Asynchronous Support

Quartz integrates asynchronous execution primitives with fine-grained control over executors and thread contexts. It supports declarative asynchronous task execution via annotations such as `@Async`, ensuring tasks run within thread-isolated environments that preserve classloader boundaries.

The asynchronous framework is designed for plugin-reload safety, preventing resource leaks and ensuring deterministic scheduling. Platform-specific adaptations, such as tick-based scheduling for Minecraft, are supported to maintain consistency across diverse runtime environments.

### Aspect-Oriented Programming Without Overhead

Quartz includes first-class AOP support based on a proxy factory mechanism. Interceptors are registered and managed within the lifecycle phases, enabling declarative cross-cutting concerns such as logging, metrics, and tracing.

AOP is fully optional and explicitly configured per context, avoiding dynamic bytecode manipulation or weaving. This design ensures runtime safety, predictable proxy behavior, and tight integration with the container’s lifecycle management.

### Unified Command System

Quartz provides a pluggable command framework with structured argument parsing and asynchronous execution capabilities. The command infrastructure supports handler routing and contextual permission checks, suitable for CLI tools, Minecraft server environments, and embedded REPLs.

Commands are defined with lifecycle isolation, allowing coexistence across multiple plugins or modules without interference. The framework’s extensible syntax and routing mechanisms enable flexible command composition and integration within diverse application domains.

---

### Platform Compatibility

Quartz is engineered to operate within strict classloader boundaries and thread contexts, ensuring safe coexistence of multiple isolated modules or plugins within a single JVM process. It supports dynamic plugin reloadability without classloader leaks or static state pollution.

The framework avoids reliance on reflection, servlet APIs, or global lifecycle management, enabling deployment in environments where such mechanisms are unavailable or undesirable. This design facilitates seamless operation on platforms including Minecraft plugin systems (Spigot and its forks, BungeeCord/Waterfall), with planned support for Velocity, Fabric, Forge, and Bedrock via Nukkit. Quartz also targets standalone CLI applications, JDA-based bots, and general-purpose JVM runtimes.

---

### Technical Motivation

Conventional frameworks such as Spring Boot, while powerful for general-purpose applications, face significant challenges in modular, embedded, or plugin-based environments. Key issues include:

- Memory leaks and classloader retention due to static caches and global state.
- Inability to support multiple independent application contexts within the same process.
- High runtime overhead from extensive classpath scanning, proxy generation, and autowiring.
- Tight coupling to servlet infrastructure and static initialization patterns, limiting applicability in non-servlet or constrained runtimes.

Quartz addresses these challenges through a fundamentally different architectural approach:

- Static resolution of dependencies and configuration via compile-time metadata eliminates costly runtime scanning.
- Scoped metadata and explicit wiring enable fully isolated bootstrap pipelines per context, preventing cross-context interference.
- Deterministic lifecycle segmentation ensures predictable initialization and teardown, critical for plugin reload scenarios.
- Absence of global or static state avoids classloader leaks and facilitates clean resource management.
- Integration of asynchronous execution and AOP within the container lifecycle provides advanced capabilities without sacrificing determinism or isolation.

This rigorous design enables Quartz to function reliably and efficiently in environments where traditional frameworks are either over-engineered or incompatible.

---

### Conclusion

Quartz is a purpose-built framework that delivers statically defined, modular application architectures optimized for constrained and plugin-based platforms. Its core design principles emphasize deterministic lifecycles, strict classloader isolation, and explicit wiring, bridging the gap between traditional application frameworks and environments with stringent runtime constraints.

By providing a comprehensive suite of infrastructure primitives—including dependency injection, lifecycle management, asynchronous execution, AOP, and command routing—Quartz enables developers to build robust, maintainable applications across diverse JVM-based platforms without sacrificing architectural rigor or developer ergonomics.

Quartz’s platform-neutral, reflection-free approach ensures predictable behavior and resource safety, making it a compelling choice for modular systems requiring fine-grained control over execution contexts and lifecycle phases.


## Ways to Contribute

here are multiple ways to support the development of Quartz:

### [Join Discord Community](https://discord.gg/pdtjpbDauS)

Interact with Quartz community using [discord](https://discord.com).

### Report Bugs

Use GitHub Issues to report problems

Include logs, stack traces, reproduction steps, and environment details

### Propose Features

Open a GitHub Discussion or Issue describing your idea

Explain the motivation and potential use cases

###  Submit Pull Requests

Fork the relevant repository

Create a feature branch and commit your changes

Open a PR and link it to any related issues or discussions

###  Improve the Docs

Found a typo, outdated information, or want to add new examples?

Quartz documentation lives under **/docs**

---

## Code Standards

Before submitting a pull request:

- Use consistent formatting

- Keep commits clean and descriptive

- Write or update Javadoc for public APIs

---

## Community Guidelines

Be kind. Be constructive. Work together.

- Treat others with respect and patience

- Follow GitHub’s Community Guidelines

- Avoid spam or off-topic discussions

Thanks for helping make Quartz better!