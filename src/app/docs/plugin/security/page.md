---
title: Permissions & Security
nextjs:
  metadata:
    title: Permissions & Security
    description: Secure method access in Quartz Framework using declarative permission checks and sender evaluation.
---

Quartz Framework includes a flexible and expressive system for securing method execution using annotations and expression-based access control. It is especially useful in environments where actions often depend on the sender's permissions.

---

## Enabling Security

To activate support for security, annotate any Quartz-managed bean (including the main class) with:

```java
@EnablePluginSecurity
@QuartzPlugin
public class MyPlugin extends SpigotPlugin { ... }
```

This initializes the internal security mechanisms that allow evaluating sender context and running expressions.

---

## Restricting Method Access

### @Authorize

This annotation allows you to restrict access based on SpEL (Spring Expression Language) conditions:

```java
@Authorize("hasPermission('admin') or isOp()")
public void sensitiveAction() {
    // will only run if sender has permission
}
```

| Attribute   | Description                                                |
|-------------|------------------------------------------------------------|
| **value**   | SpEL expression to evaluate before method execution        |
| **message** | Optional error message if access is denied                 |
| **params**  | Optional values available as #params inside the expression |

If the expression returns false, a **PermissionDeniedException** is thrown. If there's no sender available, **PlayerNotFoundException** is raised.

### @HasPermission

A shorthand for checking if the current sender has all the specified permissions:

```java
@HasPermission({"plugin.feature.use"})
public void securedFeature() {
    // Will only run if sender has both permissions
}
```
This annotation is internally backed by [@Authorize](#authorize), and can also define a custom denial message:

```java
@HasPermission(value = {"admin.permission"}, message = "You don't have permission to use this feature.")
```

---

## Expression Language

Quartz leverages Spring Expression Language (SpEL) to build powerful permission logic. Some useful expressions include:

- hasPermission('some.permission')

- isOp()

- #params.?[!#root.hasPermission(#this)].length == 0 → all permissions in #params are satisfied

You can also build complex conditions using AND/OR logic:

```java
@Authorize("hasPermission('perm.a') and (hasPermission('perm.b') or isOp())")
```