---
title: Dependency Injection
nextjs:
  metadata:
    title: Dependency Injection
    description: Understand how Quartz Framework handles dependency injection using annotations.
---

Dependency Injection (DI) is a design pattern that allows a class to receive its dependencies from external sources rather than creating them itself. It promotes loose coupling, better testability, and cleaner code.

Quartz Framework's DI system is built around annotations, offering a lightweight and flexible model for wiring dependencies.

---

## Beans and Annotations

In Quartz, objects managed by the DI container are called beans. To be recognized as a bean, a class must be annotated with one of the supported bean-level annotations — most commonly **@Injectable**, but other types like **@Bootstrapper** and **@Configurer** are also valid and will be covered in future sections.

{% callout title="Spring Support" %}

`@Injectable` is annotated with `@ManagedBean`, which ensures support with the Spring ecosystem. Also, if you use `@ManagedBean` instead of `@Injectable`, Quartz will be able to recognize it as an injectable normally.

{% /callout %}

```cpp
@Injectable
public class MyService {
    // dependencies injected here
}
```

You can also define beans within injectable classes using the **@Provide** annotation on methods:

```cpp
@Bootstrapper
public class MyBootstrapper {

    @Provide
    public MyDependency provideDependency() {
        return new MyDependency();
    }
}
```
### Naming Beans

All registered beans, regardless of how they are declared (**@Injectable**, **@Provide**, etc.), can be named using **@NamedInstance**. This makes it possible to resolve a specific bean among multiple candidates of the same type.

{% callout title="Spring Support" %}

Tip: Works with Spring's `@Qualifier` annotation.

{% /callout %}

```cpp
@Provide
@NamedInstance("customName")
public MyDependency provideDependency() { ... }
```

You can also use **@NamedInstance** on fields, methods, or constructor parameters to explicitly request a named bean during injection.

### Special Characteristics

Quartz beans can carry additional behavior semantics through annotations:

- **@Preferred**: Marks the bean as a priority candidate for injection. If multiple candidates exist, this one is chosen first.

- **@Secondary**: Flags the bean as a fallback. It will only be injected if no other candidates are available.

- **@Deferred**: Marks the bean for lazy loading. It is only created when explicitly accessed, either by calling it via the BeanFactory or by injecting a BeanProvider<T>. This is useful for delaying expensive instantiation until absolutely necessary.

- **@NoProxy**: Disables proxy generation for the bean. By default, Quartz uses AspectJ Load-Time Weaving to proxy all beans for features like AOP, lifecycle control, and scope customization. If a bean must not be proxied — due to performance or design constraints — use this annotation.

- **@Priority**: Allows ordering between beans. This applies within a @Provide context to determine order of method execution, and among @Injectable classes to prioritize initialization.

{% callout type="warning" title="You should know" %}

If more than one bean of the same type is marked as `@Preferred` or `@Secondary`, Quartz will raise a conflict at runtime.

{% /callout %}

{% callout title="Spring Support" %}

Using Spring's `@Order` will have the same impact as `@Priority`

{% /callout %}

---

## Injection Modes

When a class is declared as a bean, the Quartz container takes charge of providing its required dependencies. Wherever you declare an injection point — constructor, method, or field — the container resolves the right instance according to type, name, or resolution strategy.

{% callout title="Spring Support" %}

Using Spring's `@Autowired` will have the same impact as `@Inject`

{% /callout %}

### Constructor Injection

```cpp
@Injectable
public class Service {
    private final MyDependency dep;

    @Inject
    public Service(MyDependency dep) {
        this.dep = dep;
    }
}
```

If there are multiple constructors, use **@Inject** to explicitly mark the one to use. If none is marked, the first declared constructor is chosen by default.

### Method Injection

```cpp
@Inject
public void setup(MyDependency dep) {
    // initialization logic
}
```
Any method annotated with **@Inject** will be called automatically, with its parameters resolved through the DI context.

### Field Injection

```cpp
@Inject
private MyDependency dep;
```

All fields annotated with **@Inject** will be processed — regardless of their visibility (private, protected, etc.).

---

## Injection Tips

- You can inject BeanProvider<T> to obtain a lazy-access wrapper that defers resolution until needed.

- You can inject Collection<T> to retrieve all beans of a given type.

- You can inject Map<String, T> to retrieve all beans of a type with their names.

### Injection resolution order

- Properties ([@Property](#property-injection) annotation)

- BeanProvider

- Collection

- NamedInstance (via [@NamedInstance](#naming-beans))

- General Type Matching

{% callout type="warning" title="Known limitation" %}

Only public classes are scanned as injectables. But fields and methods inside those classes can be private, protected, or default.

{% /callout %}

### Scopes

By default, all beans are **Singletons**, meaning one instance per application context.

Use `@Prototype` to mark a bean as non-singleton, meaning each injection point will receive a new instance.

```cpp
@Prototype
@Injectable
public class StatelessWorker { }
```

You can also use **@Singleton** explicitly for clarity.

## Property Injection

Quartz supports external configuration binding through **@Property**, which allows you to inject values from your application configuration.

Learn more in [Property Configuration Binding](/docs/core/property-configuration).

## Types of Injectable Beans

Quartz supports different classes of injectable components, each with a unique role in the lifecycle:

- **@Injectable**: Standard bean declaration.

- **@Bootstrapper**: Used to initialize components early during context setup.

- **@Configurer**: Runs before the context becomes active and is ideal for customization logic.

Execution phase hooks are also available:

- **@PostConstruct**: Invoked after the bean is fully initialized.

- **@PreDestroy**: Called before the context is shut down.

- **@ContextLoads**: Marks a bean to be executed after the context finishes autoconfiguration.