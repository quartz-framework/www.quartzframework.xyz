---
title: Quartz Query Language (QQL)
nextjs:
  metadata:
    title: QQL (Quartz Query Language)
    description: Learn how to write dynamic queries using Quartz's built-in DSL, QQL.
---

**Quartz Query Language (QQL)** is a built-in DSL for defining expressive and strongly-typed 
queries directly inside annotated methods. It is designed to be concise, readable, and 
integrated seamlessly with the Quartz data abstraction layer.

---

## Basic Syntax

QQL supports method annotations using the **@Query** annotation. Each query starts with one of the supported actions:

* **find**: returns a list, stream, set, optional, or paginated result
* **count**: returns the number of matching records
* **exists**: returns a boolean based on whether any record matches

```java
@Query("find where name = :name and age >= :minAge")
List<User> findByNameAndMinAge(@QueryParameter("name") String name, @QueryParameter("minAge") int age);
```

You can also define projections using the **returns new** syntax:

```java
@Query("find where age > :minAge order by name asc returns new com.acme.UserSummary(id, name)")
List<UserSummary> findSummaries(@QueryParameter("minAge") int age);
```

---

## Return Types

QQL supports flexible return types depending on the method signature. When using **find**, you can return:

* **List<T>**: the most common result type
* **Set<T>**: deduplicated result
* **Stream<T>**: lazy processing
* **Optional<T>**: returns the first result if available
* The entity class itself (e.g., **User**): returns the first result or throws if none found
* **Page<T>**: if a **Pagination** parameter is passed (for paginated results)

{% callout title="You should know" %}
To return `Optional<T>` or a single entity, your query should return at most one result, for example, when using `top 1`, filtering by unique attributes, or enforcing limits manually.
{% /callout %}

---

## Filters and Logical Operators

You can chain conditions using **'and'** / **'or'**, similar to SQL:

```java
@Query("find where name = :name or age >= :minAge and status = 'ACTIVE'")
List<User> findComplex(@QueryParameter("name") String name, @QueryParameter("minAge") int age);
```

Operators supported:

* Equality: `=`, `!=`, `<>`
* Comparison: `>`, `>=`, `<`, `<=`
* Like: `like`, `not like`
* Null: `is null`, `is not null`
* Collections: `in`, `not in`

The parser automatically respects operator precedence and parses **'and'** and **'or'** expressions in order.

---

## Nested Properties

You can reference nested properties by using dot notation (e.g., **department.name**, **user.address.city**):

```java
@Query("find where department.name = :dept")
List<Employee> findByDepartment(@QueryParameter("dept") String dept);
```

The parser handles attribute resolution, case conversion (e.g., snake_case → camelCase), and access to nested object fields.

---

## Case-Insensitive Matching

QQL supports **lower()** and **upper()** functions in both field and value:

```java
@Query("find where lower(email) = lower(:email)")
Optional<User> findByEmailIgnoreCase(@QueryParameter("email") String email);
```

If both the field and value use the same case function (**lower** or **upper**), Quartz will optimize comparison using **ignoreCase = true** internally.

---

## Ordering and Limits

You can sort using **order by**:

```java
@Query("find where active = true order by createdAt desc")
List<User> findActiveOrdered();
```

To limit results, use **top N**:

```java
@Query("find top 5 where score >= :min order by score desc")
List<ScoreEntry> findTopScores(@QueryParameter("min") int min);
```

---

## Projection (DTO Mapping)

You can return DTOs using **returns new <FQCN>(...)**. Fields inside the parentheses must match attributes from the entity:

```java
@Query("find where active = true returns new com.acme.UserDTO(id, name)")
List<UserDTO> getActiveUsers();
```

This maps each result row to the constructor of the specified class.

---

## Parameter Binding

Named parameters (**':name'**) must be annotated with **@QueryParameter("name")** in the method signature. Quartz validates that all parameters used in the query are declared.

If you use positional parameters **(?1, ?2, ...)**, they are matched by index (starting at 1).

---

## Summary

QQL makes dynamic querying declarative and readable. It supports:

* Filters with **'and'** / **'or'**
* Nested attribute access with dot notation
* Case-insensitive comparison using **lower()**/**upper()**
* Pagination, projection, ordering, and limits
* Strict parameter validation with helpful errors

You can mix power and simplicity to write complex queries that stay concise and type-safe.

---