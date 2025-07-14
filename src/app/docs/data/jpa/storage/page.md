---
title: JPA Storage
nextjs:
  metadata:
    title: JPA Storage
    description: Learn how Quartz integrates with Hibernate JPA to enable type-safe entity persistence and dynamic query execution

---

Quartz provides robust first-class support for [Jakarta Persistence (JPA)](https://jakarta.ee/specifications/persistence/3.1/) 
through the **JPAStorage** contract, a specialized interface that exposes entity persistence, query execution, and integration with the Quartz query and specification infrastructure.

## Overview

The **JPAStorage** interface builds on top of Quartz’s **SimpleStorage**, enhancing it with:

- **Flush control**: Manage pending persistence state via **flush()** and **saveAndFlush()**.
- **Transactional boundaries**: Write operations are implicitly wrapped in transactions.
- **Interceptors**: Transparent support for transaction handling and cleanup.
- **Full support for JPQL, native SQL, and dynamic query specifications.**

At runtime, **JPAStorage** instances are backed by **HibernateJPAStorage**, a type-safe storage engine built on top of **EntityManager** and fully integrated with Quartz’s dependency injection and lifecycle management.

## Defining a JPA Storage

To define a JPA-backed repository, simply declare an interface annotated with **@Storage** and extend **JPAStorage**:

```java
@Storage
public interface UserStorage extends JPAStorage<UserEntity, UUID> {
  Optional<UserEntity> findByUsername(String username);
}
```

Quartz automatically binds the interface to **HibernateJPAStorage** through the **JPAStorageProvider**, using your application's injected **EntityManagerFactory**.

## Runtime Behavior

The storage is provisioned lazily, scoped to your application context, and powered by a managed **EntityManager**. Quartz guarantees:

- **Thread safety** across plugin boundaries
- **Memory efficiency** by avoiding unnecessary allocations
- **Clean transactional demarcation** using the interceptor system
- **Contextual entity manager resolution**, allowing external management when needed

## Storage Lifecycle

Quartz binds the following interceptors to every **JPAStorage** instance by default:

- **TransactionalInterceptor**: Begins and commits/rolls back transactions around write operations.
- **TransactionCleanupInterceptor**: Ensures **EntityManager** is properly closed and detached from thread-local scope.

## Integration with Specifications

Every **JPAStorage** can extend the **QuerySpecificationExecutor** interface, allowing complex criteria logic to be composed fluently:

```java
@Storage
public interface UserStorage extends JPAStorage<UserEntity, UUID>, QuerySpecificationExecutor<Entity> { }
```

```java
List<UserEntity> results = userStorage.find((root, query, cb) ->
  cb.equal(root.get("username"), "admin")
);
```

You can also paginate and sort:

```java
Page<UserEntity> recent = userStorage.find(spec, Pagination.of(1, 20));
```

{% callout title="Note" %}
Behind the scenes, this delegates to JPA CriteriaBuilder and constructs type-safe dynamic queries, no string parsing, no reflection, full compile-time safety.
{% /callout %}

## Dynamic Query Execution

The storage system is deeply integrated with Quartz’s custom **@Query** engine, which supports:

- JPQL-style queries (e.g., `from UserEntity u where ...`)
- Native SQL queries
- Automatic binding of named and positional parameters
- Projections, joins, DTO mapping, and aggregates
- Native Method Name-Based Queries & Quartz Query Language (QQL) Support bundled from Quartz Data

Queries are parsed, validated, and executed through the **JPAQueryExecutor**, which supports pagination, result counting, and **exists** checks out of the box.

## Customization & Extensibility

Quartz keeps everything modular and extensible:

* You can override the default **JPAStorageProvider** with your own bean.
* You can register custom interceptors, enrich metadata, or augment behavior.
* You can even subclass **HibernateJPAStorage** to customize its internal logic.

## Why it Matters

In typical Minecraft plugin development, using frameworks like Spring Boot is often overkill, classloader conflicts, heavy dependencies, and poor plugin isolation make it unsustainable.

Quartz solves this by providing:

- Lightweight, container-independent data access
- Seamless integration with Bukkit/Spigot, BungeeCord, and other platforms
- Full async compatibility and a clear DI architecture

The **JPAStorage** system is designed to give you **real power with zero boilerplate**, while staying 100% compatible with Minecraft's unique runtime environment.

---