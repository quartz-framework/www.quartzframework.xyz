---
title: Transactions Support
nextjs:
  metadata:
    title: Transactions Support
    description: Learn how Quartz Data enables declarative transaction management with minimal configuration.
---

## Declarative Transaction Management

Quartz Data provides built-in support for declarative transactions using standard Jakarta annotations like **@Transactional**. The framework wraps method calls in managed transactions using an interceptor-based approach, without relying on Spring or a heavyweight container.

This allows you to control transaction propagation, isolation, rollback behavior, and timeouts directly on methods or classes.

### Enabling Transactional Support

Transactional support is **opt-in**. To enable it, simply annotate your main entrypoint class with:

```java
@EnableTransactionalSupport
public class MyTransactionalBootstrapper {
   
}
```

This activates Quartz's internal transaction interceptor.

### Using @Transactional

Once enabled, you can annotate methods or entire classes with **@jakarta.transaction.Transactional** or **@org.springframework.transaction.annotation.Transactional**:

```java
@Transactional
public void updateAccount(Account account) {
    account.setUpdatedAt(Instant.now());
    accountRepository.save(account);
}
```

You can customize transactional behavior:

```java
@Transactional(
    propagation = Propagation.REQUIRES_NEW,
    isolation = Isolation.READ_COMMITTED,
    timeout = 10,
    readOnly = true
)
public void readOperation() {
    // read-only query
}
```

### Rollback Behavior

By default, any **RuntimeException** will cause a rollback. You can explicitly control rollback behavior with **rollbackFor** and **noRollbackFor**:

```java
@Transactional(rollbackFor = CustomCheckedException.class)
public void riskyOperation() throws CustomCheckedException {
    // ...
}
```

### Cleanup Handling

Quartz automatically closes the **EntityManager** and clears its context after transactional methods, ensuring no leaks.

{% callout title="Note" %}
Transactional support does not require Spring context. Quartz wires its own lightweight interceptor for `@Transactional` and manages lifecycle internally.
{% /callout %}