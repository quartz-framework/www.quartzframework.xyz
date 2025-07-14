---
title: Conditional Beans
nextjs:
  metadata:
    title: Conditional Beans
    description: Enable or disable beans dynamically using Quartz Framework annotations.
---

Quartz supports fine-grained bean activation control through several conditional annotations:

## @Environment

Defines in which environments the bean should be active. Accepts single or multiple names, and negation with !:

```java
@Environment("dev")
public class DevOnlyFeature { }
```

```java
@Environment("!prod")
public class NotInProduction { }
```

```java
@Environment({"prod", "!mysql", "psql"})
public class ComplexRuleBean { }
```

## @ActivateWhen

Activates the bean only if a custom condition passes. The condition must implement GenericCondition:

```java
@Injectable
public class SaturnAlignedWithJupiter implements GenericCondition {

    public boolean test() { 
        return true; 
    }
}
```

```java
@ActivateWhen(SaturnAlignedWithJupiter.class)
public class CosmicBean { }
```

## @ActivateWhenAnnotationPresent

Activates the bean if another bean with a specific annotation exists in the container:

```java
@ActivateWhenAnnotationPresent(SpecialFeature.class)
public class DependsOnSpecialFeature { }
```

## @ActivateWhenBeanPresent / @ActivateWhenBeanMissing

Activates the bean only if a specific bean is present or not:

```java
@ActivateWhenBeanMissing(MyFallback.class)
public class UseFallbackIfMissing { }
```

```java
@ActivateWhenBeanPresent(MyService.class)
public class DependentBean { }
```

## @ActivateWhenClassPresent / @ActivateWhenClassMissing

Checks if a class exists or not on the classpath:

```java
@ActivateWhenClassPresent(classNames = {"com.example.SomeClass"})
public class OptionalIntegration { }
```

```java
@ActivateWhenClassMissing(classNames = {"com.example.SomeClass"})
public class OptionalIntegration { }
```

## @ActivateWhenPropertyEquals

Activates if a configuration property has a specific value:

```java
@ActivateWhenPropertyEquals(
expression = "${feature.enabled:true}",
expected = "true"
)
public class FeatureFlaggedBean { }
```

These conditions allow you to dynamically register or ignore beans depending on environment, presence of other beans, classpath inspection, or configuration properties.