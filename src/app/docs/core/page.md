---
title: Core Concepts
nextjs:
  metadata:
    title: Core Concepts
    description: Understand the foundational role of Quartz Core in the framework architecture.
---

Quartz Core defines the base architecture of the Quartz Framework, a lightweight, annotation-based foundation that powers all module features without enforcing any opinionated logic.

It provides:

- The structural backbone for all Quartz modules
- Lightweight dependency injection and lifecycle handling
- Modular context bootstrapping and plugin wiring

By itself, Quartz Core doesn't offer plugin-specific behavior, instead, it exposes all the tools needed to build, wire, and configure systems on top of it. Think of it as the minimal runtime that other Quartz modules plug into.

If you're familiar with frameworks like Spring, you’ll recognize familiar patterns, but stripped down for performance, clarity, and control.

{% callout title="Heads up" %}
Quartz Core is not meant to be used directly in most cases. It exists to support other modules like `quartz-beans`, `quartz-config`, and any custom tooling you build on top of the framework.
{% /callout %}