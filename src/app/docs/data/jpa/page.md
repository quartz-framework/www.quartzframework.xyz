---
title: Quartz Data JPA
nextjs:
  metadata:
    title: JPA Storage Layer for Quartz Data
    description: Enable JPA-based persistence in Quartz Data with dynamic queries, projections, and transactional support
---

## Getting Started with Quartz Data JPA

To begin using Quartz Data with JPA, add the following to your project and follow these setup steps.

### 1. Add the Dependency

Maven:

```xml
<dependency>
  <groupId>xyz.quartzframework</groupId>
  <artifactId>quartz-starter-data-jpa</artifactId>
</dependency>
```

Gradle:

```kotlin
implementation("xyz.quartzframework:quartz-starter-data-jpa")
```

### 2. Define Your Entity

Standard JPA entity format:

```java
@Entity
public class User {
    @Id
    private UUID id;
    private String name;
    private boolean active;
    private int score;
    private Instant createdAt;
}
```

### 3. Create a Repository Interface

```java
@Storage
public interface UserStorage extends JPAStorage<User, UUID> {
    List<User> findByActiveTrueOrderByScoreDesc();

    @Query("count where name like :pattern")
    long countUsersMatching(@QueryParameter("pattern") String pattern);
}
```

### 4. Configure Properties

By default, Quartz Data auto-detects the JDBC driver and Hibernate dialect based on the classpath.

You can configure the following (all optional unless auto-detection fails):

```properties
quartz.data.jpa.datasource.url=jdbc:postgresql://localhost:5432/mydb
quartz.data.jpa.datasource.username=admin
quartz.data.jpa.datasource.password=admin
quartz.data.jpa.datasource.driver=org.postgresql.Driver
quartz.data.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

Additional tuning options are available under [`quartz.data.hikari.*`](/docs/data/jpa/datasource)and [`quartz.data.hibernate.*`](/docs/data/jpa/hibernate).

### 5. Enable Transactional Support (Optional)

If you want Quartz Data to manage transactions automatically:

```java
@Bootstrapper
@EnableTransactionalSupport
public class MyBootstrapper {

}
```

### 6. Using the Storage

You can inject and use the storage like this:

```java
@Injectable
public class UserService {
    private final UserStorage storage;

    public UserService(UserStorage storage) {
        this.storage = storage;
    }

    public List<User> getTopActives() {
        return storage.findByActiveTrueOrderByScoreDesc();
    }
}
```

That's it! Quartz Data JPA is ready to go.