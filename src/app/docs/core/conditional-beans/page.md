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

```cpp
@Environment("dev")
public class DevOnlyFeature { }
```

```cpp
@Environment("!prod")
public class NotInProduction { }
```

```cpp
@Environment({"prod", "!mysql", "psql"})
public class ComplexRuleBean { }
```

## @ActivateWhen

Activates the bean only if a custom condition passes. The condition must implement GenericCondition:

```cpp
@Injectable
public class SaturnAlignedWithJupiter implements GenericCondition {

    public boolean test() { 
        return true; 
    }
}
```

```cpp
@ActivateWhen(SaturnAlignedWithJupiter.class)
public class CosmicBean { }
```

## @ActivateWhenAnnotationPresent

Activates the bean if another bean with a specific annotation exists in the container:

```cpp
@ActivateWhenAnnotationPresent(SpecialFeature.class)
public class DependsOnSpecialFeature { }
```

## @ActivateWhenBeanPresent / @ActivateWhenBeanMissing

Activates the bean only if a specific bean is present or not:

```cpp
@ActivateWhenBeanMissing(MyFallback.class)
public class UseFallbackIfMissing { }
```

```cpp
@ActivateWhenBeanPresent(MyService.class)
public class DependentBean { }
```

## @ActivateWhenClassPresent / @ActivateWhenClassMissing

Checks if a class exists or not on the classpath:

```cpp
@ActivateWhenClassPresent(classNames = {"com.example.SomeClass"})
public class OptionalIntegration { }
```

```cpp
@ActivateWhenClassMissing(classNames = {"com.example.SomeClass"})
public class OptionalIntegration { }
```

## `@ActivateWhenPropertyEquals`

Activates if a configuration property has a specific value:

```cpp
@ActivateWhenPropertyEquals(
value = @Property("${feature.enabled:true}"),
expected = "true"
)
public class FeatureFlaggedBean { }
```

These conditions allow you to dynamically register or ignore beans depending on environment, presence of other beans, classpath inspection, or configuration properties.