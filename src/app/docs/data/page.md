---
title: Quartz Data
nextjs:
  metadata:
    title: Quartz Data
    description: Learn how Quartz Data provides a flexible abstraction for data access in Quartz Framework
---

Quartz Data is the foundational data access layer in the Quartz Framework. It provides a lightweight, implementation-agnostic API to define and execute database operations using a consistent pattern — regardless of the underlying technology (JPA, MongoDB, in-memory, etc.).

Quartz Data does **not** persist data itself — instead, it defines a powerful contract for describing and querying entities that can be interpreted by various modules like `quartz-data-starter-jpa`.

## Features

* Implementation-agnostic abstraction (JPA, MongoDB, in-memory, etc.)
* Annotation-based query definitions via **@Query**
* Method name-based queries (à la Spring Data)
* Support for projections, pagination, sorting, filtering
* Built-in support for custom **Quartz Query Language (QQL)**

## Query Options

Quartz Data supports two primary ways to define queries:

### 1. Method Name-Based Queries

Inspired by Spring Data, you can define methods like:

```java
Optional<Entity> findByName(String name);

List<Entity> findByScoreGreaterThan(int minScore);

boolean existsByName(String name);

long countByActiveTrue();

List<Entity> findByCreatedAtAfter(Instant time);
```

These are automatically parsed into dynamic queries by the framework.

### 2. Annotation-Based Queries

You can also write QQL queries manually with **@Query**:

```java
@Query("find where score >= ?1 and active = true order by score desc")
List<Entity> findActivesWithMinScore(int score);

@Query("count where name like :pattern")
long countMatchingNamesWithParameters(@QueryParameter("pattern") String pattern);
```

This allows greater flexibility with projections, parameter names, and ordering.

## Quartz Query Language (QQL)

QQL is a simple, expressive, and readable query language designed specifically for Quartz Data. It is ideal for basic and moderately complex queries, without requiring full SQL or JPQL syntax.

Here’s a real example using QQL:

```java
@Query("find where score >= ?1 and active = true order by score desc")
List<Entity> findActivesWithMinScore(int score);
```

## Next Steps

Explore the following sections to learn more about Quartz Data:

* [Getting Started](/docs/data/quickstart)
* [Storage Interfaces](/docs/data/storage-interfaces)
* [Query Language (QQL)](/docs/data/qql)
* [Pagination & Sorting](/docs/data/pagination)
* [Method Name-Based Queries](/docs/data/method-based-queries)
* [Creating Entities](/docs/data/creating-entities)
