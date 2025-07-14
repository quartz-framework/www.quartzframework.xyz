---
title: DataSource & HikariCP
nextjs:
  metadata:
    title: DataSource & HikariCP
    description: Learn how Quartz Framework configures HikariCP and JDBC connections with powerful, production-ready defaults and full YAML customization.
---

Managing database connections efficiently is crucial for performance and scalability in any application. Quartz Data relies on HikariCP, a best-in-class JDBC connection pool, to ensure fast, lightweight, and resilient database access. This integration provides automatic bootstrapping of JDBC drivers and Hibernate dialects, with sensible defaults that work out-of-the-box, yet allows full customization when needed. Whether you're connecting to PostgreSQL, MySQL, Oracle, or H2, this section guides you through configuring your connection pool, overriding auto-detection, and leveraging fine-grained tuning options via YAML.

---

## DataSource & Connection Pooling

The framework configures Hikari automatically based on the properties you provide, but you can also fine-tune it using a rich set of YAML options.

Supported JDBC drivers (auto-detected if on the classpath):

- PostgreSQL (`org.postgresql.Driver`)
- MySQL (`com.mysql.cj.jdbc.Driver`)
- SQL Server (`com.microsoft.sqlserver.jdbc.SQLServerDriver`)
- H2 (`org.h2.Driver`)
- Oracle (`oracle.jdbc.OracleDriver`)

You can override detection explicitly via:

```yaml
quartz:
  data:
    jpa:
      datasource:
        url: jdbc:postgresql://localhost:5432/mydb
        username: admin
        password: secret
        driver: org.postgresql.Driver
```

## HikariCP Configuration Properties

All HikariCP options are available under `quartz.data.hikari`. Here is a reference:

```yaml
quartz:
  data:
    hikari:
      minimum-idle: 1
      maximum-pool-size: 10
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
      keepalive-time: 0
      leak-detection-threshold: 0
      validation-timeout: 5000
      connection-test-query: ""
      connection-init-sql: ""
      pool-name: QuartzHikariPool
      auto-commit: true
      read-only: false
      isolate-internal-queries: false
      register-mbeans: false
      allow-pool-suspension: false
      initialization-fail-timeout: -1
      transaction-isolation: ""
      schema: ""
```

## JPA Connection Properties

Basic datasource settings are defined under the `quartz.data.jpa.datasource` and `quartz.data.jpa.connection` prefixes. These are typically used to define the connection URL, credentials, and transaction behaviors.

```yaml
quartz:
  data:
    jpa:
      datasource:
        url: jdbc:h2:mem:testdb
        driver: "" # Optional, auto-detected
        username: sa
        password: ""
      connection:
        pool-size: 10
        isolation: -1 # Default (driver-specific)
        autocommit: true
        provider-disables-autocommit: false
```

{% callout title="Tip" %}
The values under `jpa.connection.*` are also applied directly to Hibernate's environment where applicable.
{% /callout %}

{% callout title="Tip" %}
You can also configure basic connection-level behavior (like autocommit, isolation, and pool size) using `quartz.data.jpa.connection.*`.
{% /callout %}