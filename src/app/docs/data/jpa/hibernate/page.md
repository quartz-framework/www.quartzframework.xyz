---
title: Hibernate Integration
nextjs:
  metadata:
    title: Hibernate Integration
    description: Discover how Quartz Framework seamlessly bootstraps Hibernate, auto-configures your persistence layer, and offers powerful customization via YAML properties.
---

---

Hibernate is the default JPA engine used by Quartz Data. This section explains how the framework automatically configures Hibernate, 
how it integrates with your entities, and what settings are available to fine-tune its behavior. 
If you're coming from a traditional Spring JPA setup, you'll find most features here, but with a simplified and opinionated bootstrap process.

## Hibernate Integration

Quartz Data JPA uses Hibernate as its underlying persistence provider and configures it dynamically at runtime. 
It **auto-registers** a **PersistenceUnitInfo**, injects the managed entities, and boots Hibernate **without the need** for a **persistence.xml**.

You don’t need to manually configure **EntityManagerFactory** or **PersistenceProvider**, the bootstrapper does that for you.

Hibernate is configured using properties under the **quartz.data.hibernate** namespace.

## Entity Definitions

Quartz Data works seamlessly with standard Hibernate-compatible entity definitions. 
Entities must be annotated with **@jakarta.persistence.Entity**, and each must define a primary key using **@jakarta.persistence.Id**.

Example:

```java
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.util.UUID;

@Entity
public class User {
    @Id
    private UUID id;

    private String name;
    private boolean active;
    private int score;
}
```

## Full HQL Support

Quartz Data JPA offers full support for **Hibernate Query Language (HQL)** through the **@Query** annotation. 
This allows for expressive and flexible queries beyond method name conventions. 
You can write JPQL-style queries directly, including joins, projections, subqueries, and even use of constructors for DTO mapping.

Here are some examples:

```java
// Basic HQL query
@Query("from UserEntity u where u.username = ?1")
List<UserEntity> findByUsername(String username);

// Named parameter
@Query("from UserEntity u where u.username like :pattern")
List<UserEntity> findByUsernamePattern(@QueryParameter("pattern") String pattern);

// Count query
@Query("select count(u) from UserEntity u where u.enabled = true")
long countEnabledUsers();

// DTO projection using constructor expression
@Query("select new xyz.app.dto.UserSummary(u.id, u.username) from UserEntity u where u.enabled = true")
List<UserSummary> findEnabledUserSummaries();

// Join with fetch
@Query("from UserEntity u join fetch u.profile where u.username = :username")
UserEntity findUserWithProfile(@QueryParameter("username") String username);

// Existence check
@Query("select count(u) > 0 from UserEntity u where u.email is null")
boolean existsUsersWithoutEmail();
```

You can also combine HQL with dynamic filtering, sorting, and pagination features provided by Quartz Data.

{% callout title="Note" %}
HQL queries are parsed, validated, and transformed by the Quartz Data runtime. You don't need to manage any native `EntityManager` logic manually.
{% /callout %}

These annotations are required for Hibernate to detect and manage your entities correctly during the bootstrapping process. You can use any standard JPA/Hibernate annotations for mapping, constraints, and relationships. For a full reference on how to define Hibernate entities, see the [official Hibernate ORM User Guide – Entity Mapping](https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html#mapping-declaration) documentation.

## Hibernate Configuration Properties

Below is the list of available Hibernate properties supported by Quartz:

```yaml
quartz:
  data:
    hibernate:
      dialect: "" # Auto-detected if empty
      ddl-auto: "none" # One of: none, validate, update, create, create-drop
      show-sql: false
      format-sql: false
      highlight-sql: false
      log-slow-query: 0 # ms threshold for slow query logging
      use-sql-comments: false
      fetch-size: 0
      use-scrollable-resultset: true
      lob:
        non-contextual-creation: true
      log-jdbc-warnings: true
      jdbc:
        time-zone: "" # Optional timezone
      use-get-generated-keys: true
      connection-handling: "" # Optional Hibernate setting
      statement-inspector: "" # Fully qualified class name
      validation-mode: "AUTO" # AUTO, CALLBACK, NONE
      shared-cache-mode: "NONE" # ENABLE_SELECTIVE, DISABLE_SELECTIVE, ALL, NONE
      exclude-unlisted-classes: false
```

{% callout title="Tip" %}
You only need to explicitly set `dialect` or `driver` if auto-detection fails.
{% /callout %}