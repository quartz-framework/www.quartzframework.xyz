---
title: Entity Modeling
nextjs:
  metadata:
    title: Modeling Data with Quartz Entities
    description: Structure your data with annotated entities and unlock powerful query features in Quartz Data
---

Quartz Data allows you to define entities as plain Java classes with annotated fields. These entities represent the structure of your data and are used both for persistence and query abstraction.

Quartz supports field-based metadata using standard and Quartz-specific annotations to define identifiers and attribute aliases.

---

## Defining an Entity

To define an entity, create a plain Java class with fields representing the data columns. You can annotate fields with:

* **@Id** (from jakarta.persistence): standard primary key
* **@Identity** (from xyz.quartzframework.data.entity): Quartz-specific alternative to **@Id**
* **@Attribute("...")**: optional alias for the field, used in queries

Example:

```java
import jakarta.persistence.Id;
import xyz.quartzframework.data.entity.Attribute;
import xyz.quartzframework.data.entity.Identity;

public class User {

    @Id
    private Long id;

    private String name;

    @Attribute("email_address")
    private String email;

    private boolean active;
}
```

Alternatively, you can use **@Identity**:

```java
public class Product {

    @Identity
    private String sku;

    private String name;

    private double price;
}
```

---

## Identity Field

An entity must have exactly one identity field. Quartz will look for either:

1. A field annotated with @jakarta.persistence.Id
2. A field annotated with @xyz.quartzframework.data.entity.Identity

If both annotations are present on different fields, Quartz will throw an error at runtime.

This identity is used for:
* Query resolution (e.g. by ID)
* Entity tracking and updates
* Auto-generating default queries

---

## Attribute Aliases

The **@Attribute("alias")** annotation lets you define an alias for a field. This alias is used in queries instead of the Java field name.

For example:

```java
@Attribute("email_address")
private String email;
```

Allows the following query:

```java
@Query("find where email_address = :email")
Optional<User> findByEmail(@QueryParameter("email") String email);
```

It also supports method name-based queries:

```java
Optional<User> findByEmailAddress(String email);
```

{% callout title="You should know" %}

If no `@Attribute` is present, the default query field name is the Java field name (email → email, createdAt → createdAt, etc.)

{% /callout %}

---

## Field Resolution

Quartz resolves fields in the following order:

* Match by field name
* Match by **@Attribute** alias (case-insensitive)
* Match nested properties using underscores or dot notation

Examples:

```java
List<Employee> findByDepartment_Name(String name); // resolves department.name
```

## Discovery & Registration

Quartz automatically detects all Entities located in the same package or subpackages of the class annotated with **@QuartzPlugin**.

To explicitly include storages from other packages:

```cpp
@Bootstrapper
@DiscoverEntities(basePackages = "com.example.external.modal")
public class ExternalEntitiesDiscovery {}
```

Or to register specific ones manually:

```cpp
@Bootstrapper
@DiscoverEntities({Employee.class, User.class})
public class ExplicitStorageList {}
```

{% callout title="You should know" %}
`@DiscoverEntities` must be placed on a valid Quartz bean, such as one annotated with `@Bootstrapper`, `@Injectable`, or directly on your `@QuartzPlugin` class.
{% /callout %}