---
title: Storage Interfaces
nextjs:
  metadata:
    title: Storage Interfaces
    description: Understand how to define, register, and execute queries in storage layers in Quartz Data.
---

Quartz Data provides a flexible abstraction layer for declaring and using storage interfaces. These allow you to define repository-style interfaces and access entities through consistent patterns.

---

## Declaring a Storage Interface

To create a storage, annotate an interface with **@Storage** and extend a base interface such as **InMemoryStorage**, which already includes basic CRUD, listing, and paging capabilities:

```cpp
@Storage
public interface EmployeeStorage extends InMemoryStorage<Employee, UUID> {
    List<Employee> findByName(String name);
}
```

{% callout title="Important" %}
All storages must extend an interface annotated with `@SuperStorage`, which links the storage to a backend provider.
{% /callout %}

Quartz will automatically register and inject a proxy-backed implementation of this interface.

---

## Built-in Default: InMemoryStorage

Quartz Data comes with built-in support for **InMemoryStorage**, backed by a thread-safe **ConcurrentHashMap**. 
This is ideal for initial development, testing, or lightweight environments where persistence is not required.

{% callout title="Zero Config" %}
No setup is required, the necessary provider and executor are auto-registered.
{% /callout %}

---

## Supported Operations & Return Types

Quartz storages support three dynamic operations:

* **find** → for fetching data
* **count** → for counting results
* **exists** → for checking existence

### 'find' Return Types

The **find** operation supports multiple return types:

| Return Type        | Description                                      |
| ------------------ | ------------------------------------------------ |
| `List<T>`          | Default list result                              |
| `Set<T>`           | Converts the result into a Set                   |
| `Stream<T>`        | Returns a Java stream                            |
| `Optional<T>`      | Returns the first result or empty                |
| `Page<T>`          | Requires a `Pagination` parameter                |
| `T` (Entity class) | Returns the first result or throws if none found |

{% callout title="Pagination Required" %}
Methods returning `Page<T>` must include a `Pagination` argument.
{% /callout %}

### 'count' Return Types

Must return a numeric type:

* **long**, **Long**
* Any subclass of `Number`

### 'exists' Return Types

Must return:

* **boolean**, **Boolean**

---

## Query Support (Overview)

Quartz supports two query declaration styles:

* **Method name-based**: **findBy**, **countBy**, **existsBy**, etc.
* **Annotation-based with @Query** using QQL (Quartz Query Language)

For more details, see:

* [Query Language (QQL)](/docs/data/qql)
* [Method Name Based Queries](/docs/data/method-name-queries)

---

## Discovery & Registration

Quartz automatically detects all **@Storage** interfaces located in the same package or subpackages of the class annotated with **@QuartzPlugin**.

To explicitly include storages from other packages:

```cpp
@DiscoverStorages(basePackages = "com.example.external")
public class ExternalStorageDiscovery {}
```

Or to register specific ones manually:

```cpp
@DiscoverStorages({EmployeeStorage.class, ProductStorage.class})
public class ExplicitStorageList {}
```

{% callout title="You should know" %}
`@DiscoverStorages` must be placed on a valid Quartz bean, such as one annotated with `@Bootstrapper`, `@Injectable`, or directly on your `@QuartzApplication` class.
{% /callout %}

---

## Under the Hood

1. **StorageDiscovery** scans for **@Storage** interfaces
2. **StorageFactory** checks the **@SuperStorage** interface to determine the appropriate **StorageProvider**
3. The provider creates the actual storage implementation and its corresponding **QueryExecutor**
4. A proxy is created using **StorageMethodInterceptor**
5. The proxy is registered via **StorageRegistrar** and becomes injectable

---

## Extending Quartz with Custom Storages

You can define your own base storage type by creating an interface annotated with **@SuperStorage**:

```cpp
@SuperStorage(MyCustomStorageProvider.class)
public interface RedisStorage<E, ID> extends SimpleStorage<E, ID> {}
```

Then implement a custom **StorageProvider**:

```cpp
public class MyCustomStorageProvider implements StorageProvider {
    public <E, ID> RedisStorageImpl<E, ID> create(Class<E> entity, Class<ID> id) {
        return new RedisStorageImpl<>(entity, id);
    }

    public <E, ID> QueryExecutor<E> getQueryExecutor(SimpleStorage<E, ID> storage) {
        return new RedisQueryExecutor<>(...);
    }
}
```

Finally, register the provider as a bean:

```cpp
@Provide
public MyCustomStorageProvider redisStorageProvider() {
    return new MyCustomStorageProvider();
}
```

Quartz will then recognize and route any storage that extends **RedisStorage<E, ID>** to your custom provider.

---