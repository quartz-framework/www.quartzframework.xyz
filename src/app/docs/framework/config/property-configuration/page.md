---
title: Property Configuration Binding
nextjs:
  metadata:
    title: Property Configuration Binding
    description: Understand how to bind and resolve properties dynamically in Quartz Framework.
---

Quartz Framework supports powerful property resolution via the **@Property** annotation. It allows injecting configuration values from YAML files, system properties, and environment variables, with support for defaults, conversion, and nested references.

---

## Declaring Property Values

To inject a value into a bean field, constructor, or method parameter, simply annotate it with **@Property**:

```java
@Property("${my.plugin.enabled:true}")
private boolean enabled;
```

This expression means:

- Look for a property called my.plugin.enabled

- If not found, fallback to the default true

You can use `${key:default}` syntax in any **@Property**.

## Sources and Resolution Order

Quartz resolves properties in the following order:

1. YAML configuration files from the data folder (e.g. application.yml, config.yml, etc.)

2. Environment variables

3. Java system properties

4. Fallback default value (if defined)

{% callout title="You should know" %}

If a property points to another `${key}` internally, it is recursively resolved.

{% /callout %}

### YAML File Binding

By default, Quartz looks for files like **application.yml**, but you can specify a different source:

```java
@Property(value = "${plugin.name}", source = "custom")
private String pluginName;
```

This will load the property from **custom.yml** in the data folder.
If the file doesn’t exist, Quartz will copy it from the jar (if bundled) or create a blank version.

### Lazy and Dynamic Access with Supplier

Quartz supports injecting **Supplier<T>** types for on-demand property access:

```java
@Property("${plugin.dynamicValue}")
private Supplier<String> dynamicValue;

// Later
String value = dynamicValue.get();
```

This not only defers evaluation but also ensures live updates, if the property file is modified, Quartz reloads it and fetches the latest value.

{% callout type="warning" title="You should know" %}

Internally, Quartz calls `PropertySource.reload()` every time a dynamic property is accessed.

{% /callout %}

---

## Type Conversion

Quartz uses Spring's ConversionService for property type conversion. By default, it registers support for primitives, enums, collections, UUID, Charset, Locale, Currency, Pattern, and more.

You can also inject complex types like:

```java
@Property("${plugin.settings}")
private Map<String, Object> settings;
```

Custom converters can be added by extending the ConversionService or replacing the default bean.

---

## Internal Bootstrapping

The following beans are registered automatically via the internal bootstrap phase:

- **ConversionService** via ConvertContextBootstrapper

- **PropertySourceFactory** via PropertyContextBootstrapper

- **PropertyPostProcessor** for evaluating ${} expressions

These ensure full property support is available by default in every Quartz context.

---

## Example Configuration File

```yaml
# application.yml
broadcast:
    interval: 10
```

Used in code:

```java
@Property("${broadcast.interval:5}")
private int interval;
```

---

## Extending Property Binding

You can define custom behavior by implementing and registering your own:

- **PropertySourceFactory** – to load values from other formats like JSON

- **PropertyPostProcessor** – to override how placeholders are parsed and resolved

- **ConversionService** – for custom or domain-specific type conversions

Quartz will use your implementation if no existing bean is present.