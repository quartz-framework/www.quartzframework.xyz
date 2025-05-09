---
title: Aspect Oriented Programming
nextjs:
  metadata:
    title: Aspect Oriented Programming (AOP)
    description: Understand how Quartz Framework enables native AspectJ support and integrates with Spring AOP.
---

Quartz Framework provides native support for Aspect-Oriented Programming (AOP) using AspectJ. This allows you to modularize cross-cutting concerns such as logging, transactions, metrics, and security in a clean and maintainable way.

---

## Native AspectJ Integration

Any bean annotated with **@Aspect** (from the AspectJ lang annotation package) is recognized and processed by Quartz.

```cpp
@Aspect
@Slf4j
@Injectable
public class LoggingAspect {

    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore() {
        log.info("Method called");
    }
}
```

Quartz registers and initializes all **@Aspect** beans early in the lifecycle. These beans are auto-proxied using AspectJ load-time weaving, which allows advanced interception that goes beyond Spring AOP limitations.

{% callout type="warning" title="You should know" %}

All aspect beans must also be valid injectable or declared via `@Provide` to be properly managed by the container.

{% /callout %}

---

## Spring AOP Compatibility

Quartz is also compatible with Spring AOP, which is based on proxies and works by wrapping method invocations.

However, Spring AOP is limited to:

- Public method execution only

- Beans that are directly managed by the container

- Method-level interception only (no field access, constructors, etc.)

If you're using Spring-style aspects (e.g., **@Around**, **@Before**, etc.), those will work only if the target methods are public and invoked through the proxy.

```cpp
@Aspect
@Injectable
public class MyAspect {

    @Around("execution(public * com.example..*(..))")
    public Object wrap(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("Around advice");
        return joinPoint.proceed();
    }
}
```

---

## Recommendations

Prefer AspectJ for powerful, cross-cutting concerns across methods, constructors, and fields

Use **@NoProxy** if a bean should not be wrapped by Quartz proxies

{% callout title="You should know" %}

Remember that AOP in Quartz is enabled by default — no extra config required

{% /callout %}