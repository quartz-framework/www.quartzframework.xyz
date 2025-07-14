---
title: Pagination & Sorting
nextjs:
  metadata:
    title: Pagination & Sorting
    description: Quartz Data provides built-in support for pagination and sorting via the Pagination interface and the Page<T> result container. When your query method accepts a Pagination parameter and returns a Page<T>, Quartz will automatically handle pagination and sorting at the query level.
---

## Using Pagination

To enable pagination in a repository method, simply:
* Add a Pagination parameter to the method. 
* Return a **Page<T>**.

Quartz will detect this pattern and apply paging semantics accordingly.

```java
Page<User> findByActiveTrue(Pagination pagination);
```

You can construct pagination using PageRequest:

```java
Pagination pagination = PageRequest.of(0, 10); // page 0, size 10
```

To include sorting:

```java
Pagination pagination = PageRequest.of(0, 10, Sort.by("createdAt").descending());
```

---

## Return Type: Page<T>

The **Page<T>** interface wraps paginated results and provides useful metadata:

```java
Page<User> page = userRepository.findByActiveTrue(pagination);
List<User> users = page.content();
int currentPage = page.page();
int pageSize = page.size();
long totalItems = page.totalElements();
int totalPages = page.totalPages();
```

You can also chain operations on pages:

```java
Page<UserDTO> dtos = page.map(user -> new UserDTO(user.id(), user.name()));
Page<User> filtered = page.filter(user -> user.isVerified());
```

---

## Creating Pagination

You can create pagination instances with:

```java
Pagination.of(int page, int size)
Pagination.of(int page, int size, Sort sort)
Pagination.ofSize(int size)              // default to page 0
Pagination.unpaged()                     // disables pagination
```

**Pagination.unpaged()** returns all records (internally uses size = Integer.MAX_VALUE).

---

## Sorting

Sorting is handled via the Sort class:

```java
Sort.by("name")                        // ascending by default
Sort.by("createdAt").descending()     // descending
Sort.unsorted()                       // no ordering
```

The Sort object can be passed directly into PageRequest:

```java
Pagination p = PageRequest.of(1, 20, Sort.by("score").descending());
```

---

## Example

```java
Page<Order> findByCustomerId(Long customerId, Pagination pagination);
```

Called with:

```java
Pagination p = PageRequest.of(0, 5, Sort.by("createdAt").descending());
Page<Order> page = repository.findByCustomerId(123L, p);
```

---

## Unpaged Behavior

If a method is called with **Pagination.unpaged()**, Quartz will return all matching records with no limit applied.

```java
List<User> users = userRepository.findByActiveTrue(Pagination.unpaged()).content();
```

---