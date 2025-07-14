---
title: Method Name-Based Queries
nextjs:
  metadata:
    title: Building Queries from Method Names
    description: Define dynamic database queries by simply writing method names that follow a readable pattern
---

In addition to annotation-based queries using **@Query**, Quartz also supports method name-based queries, 
a convention-over-configuration approach inspired by Spring Data. This lets you define dynamic queries 
simply by naming your repository methods using a specific pattern.

Method-based queries are parsed automatically and converted into structured query definitions at runtime.

---

## Supported Actions

A method name must start with one of the following keywords:

* **find**: returns one or more results
* **count**: returns the number of matching records
* **exists**: returns a boolean indicating whether any record matches

## Basic Syntax

You can define methods like:

```java
List<User> findByNameAndAgeGreaterThan(String name, int age);
```

This query would be parsed as:

* Action: find
* Filters:
  * name = ?
  * age > ?
* Return type: List<User>

---

## Operators

Quartz recognizes several suffixes to indicate specific operations:


| Suffix             | Operation                                    |
|--------------------|----------------------------------------------|
| After, GreaterThan | >                                            |
| Before, LessThan   | <                                            |       
| GreaterThanOrEqual | >=                                           |  
| LessThanOrEqual    | <=                                           |
| Not                | !=                                           |
| Like, NotLike      | LIKE, NOT LIKE                               |
| In, NotIn          | IN, NOT IN                                   |
| IsNull, IsNotNull  | IS NULL, IS NOT NULL                         |
| True, False        | Literal true or false                        |
| IgnoreCase         | Applies case-insensitive match using LOWER() |

---

## Logical Conditions

Method names can chain conditions using **'And'** and **'Or'**. Example:

```java
List<User> findByStatusOrRoleAndActive(String status, String role);
```

This would be parsed as:

```java
find where status = ? or (role = ? and active = ?)
```

Quartz respects logical precedence and inserts parentheses automatically when mixing **'And'** and **'Or'**.

## Ordering and Limits

---

You can control ordering and limit results using:
* OrderBy<Attribute>[Asc|Desc]
* TopN or First (limit 1)

```java
List<User> findTop5ByScoreGreaterThanOrderByScoreDesc(int minScore);

Optional<User> findFirstByEmail(String email);
```

---

## Distinct Results

Prefix your method with findDistinct... to return only distinct results:

```java
List<User> findDistinctByRole(String role);
```

---

## Nested Attributes

Quartz supports nested property resolution using snake case segments:

```java
List<Employee> findByDepartment_Name(String name);
```

This resolves department.name as the property path.

---

## Case-Insensitive Queries

Use the IgnoreCase suffix to apply **LOWER()** function to both field and value:

```java
Optional<User> findByEmailIgnoreCase(String email);
```

This performs a case-insensitive match.

---

## Parameter Binding

All parameters are positional. Their order in the method signature determines their position in the generated query.

Special literals like true, false, or null (used in IsNull, True, False, etc.) are injected directly into the query.

---
