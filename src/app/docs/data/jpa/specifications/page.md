---
title: Query Specifications
nextjs:
  metadata:
    title: Query Specifications
    description: Powerful, type-safe, and composable dynamic queries for Quartz Data JPA
---

Quartz Data offers robust support for **Query Specifications**, a powerful, type-safe, and composable way to define complex dynamic queries over your entities using the **JPA Criteria API**. Unlike raw JPQL or SQL, specifications provide structure, reusability, and enhanced developer experience through IDE tooling and type safety.

Inspired by the Specification pattern in **Domain-Driven Design (DDD)** and adopted widely in Spring Data, this approach helps encapsulate query logic in a clean, declarative, and testable manner.

---

## What is a Specification?

At its core, a query specification is an implementation of the **QuerySpecification<T>** functional interface:

```java
@FunctionalInterface
public interface QuerySpecification<T> {
    Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb);
}
```

This method describes the predicate (or condition) that defines your query. For example, to find users with the username **"admin"**:

```java
QuerySpecification<UserEntity> spec = (root, query, cb) ->
    cb.equal(root.get("username"), "admin");
```

You write queries without strings, fully validated at compile time, with full refactor support.

---

## Executing a Specification

All storages extending **QuerySpecificationExecutor** can execute these specifications natively:

```java
List<UserEntity> all = userStorage.find(spec);

Page<UserEntity> paged = userStorage.find(spec, Pagination.of(1, 10));

boolean exists = userStorage.exists(spec);

long total = userStorage.count(spec);
```

Specifications are resolved and executed internally using the **Criteria API** in combination with **EntityManager**.

---

## Composability

Specifications can be freely composed, reused, and layered, making them ideal for complex business logic. For example:

```java
QuerySpecification<UserEntity> isActive = (root, query, cb) ->
    cb.isTrue(root.get("enabled"));

QuerySpecification<UserEntity> hasEmail = (root, query, cb) ->
    cb.isNotNull(root.get("email"));

QuerySpecification<UserEntity> composite = (root, query, cb) ->
    cb.and(isActive.toPredicate(root, query, cb), hasEmail.toPredicate(root, query, cb));
```

You can define specifications like small building blocks, reusable across services, modules, or features.

---

## Sorting and Pagination

Specifications naturally support sorting and pagination:

```java
Pagination pagination = Pagination.of(1, 20);
Sort sort = Sort.by(Sort.Order.desc("createdAt"));

Page<UserEntity> result = userStorage.find(spec, pagination);
List<UserEntity> sorted = userStorage.find(spec, sort);
```

This works seamlessly with the underlying Hibernate **EntityManager**

---

## Advanced Queries

You’re not limited to basic fields, you can create deeply nested filters, subqueries, and joins as needed using the full JPA Criteria API. For example:

```java
QuerySpecification<PostEntity> hasPublishedComments = (root, query, cb) -> {
    Join<PostEntity, CommentEntity> comments = root.join("comments");
    return cb.isTrue(comments.get("published"));
};
```

---

## Why Use Specifications?

Using specifications over raw JPQL or repository methods has several benefits:

* **Type-safe**: No more stringly-typed queries
* **Composable**: Easy to combine and reuse across contexts
* **Separation of concerns**: Query logic lives independently of storage APIs
* **Testable**: Each spec can be unit tested in isolation
* **Hibernate-compatible**: Executed through Criteria API internally

---

## Summary

Query Specifications in Quartz Data are one of the most powerful tools for dynamic data access, combining the flexibility of Criteria with the simplicity of lambdas. They eliminate boilerplate, reduce coupling, and unlock advanced patterns like layered filters and conditional logic, all without giving up the type safety and developer productivity you're used to.