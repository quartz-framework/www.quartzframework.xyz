---
title: Command System
nextjs:
  metadata:
    title: Command System
    description: Use a powerful Picocli-based command framework integrated with Quartz’s DI and session system.
---

Quartz Framework features a fully-integrated, annotation-driven Command System built on top of [Picocli](https://picocli.info), enabling expressive, type-safe command registration with native support for dependency injection, conversion, sender session tracking, and modular composition.

---

## Creating Commands

To create a command, annotate your injectable with @Command. You can implement Runnable or Callable<T> for result-based output:

```java
@Injectable
@Command(name = "broadcast")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class BroadcastCommand implements Runnable {

    private final Server server;

    @Parameters(index = "0..*", arity = "1..*", paramLabel = "<message>")
    private String[] words;

    @Override
    public void run() {
        String message = String.join(" ", words);
        server.spigot().broadcast(MineDown.parse(message));
    }
}
```

The command will be automatically discovered and registered in the command graph.

---

## Accessing Sender Context

Quartz automatically injects the sender context using SenderSession. For example:

```java
@PlayerOnly
@Injectable
@Command(name = "fly")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class FlyCommand implements Callable<String> {

    private final SpigotSession session;

    @Override
    public String call() {
        Player player = session.getPlayer();
        boolean allowFlight = player.getAllowFlight();
        player.setAllowFlight(!allowFlight);
        player.setFlying(!allowFlight);
        return String.format("&aFly mode &e%s&a.", allowFlight ? "disabled" : "enabled");
    }
}
```

No need to pass the sender manually, Quartz handles it.

---

## Subcommands

```java
@SubCommand
@Injectable
@Command(name = "set")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class HomeSetCommand implements Runnable {
    @Override
    public void run() {
        // logic here
    }
}
```

Attach it to a main command using subcommands = {} in the **@Command** annotation:

```java
@Injectable
@Command(name = "home", subcommands = { HomeSetCommand.class })
public class HomeCommand implements Runnable {
    @Override
    public void run() {
        // parent command logic
    }
}
```

Quartz will automatically wire the command tree.

---

## Tab Completion

Quartz supports dynamic and context-aware tab completion by allowing injection of **Iterable<String>** providers:

Create a suggestion provider as an injectable class:

```java
@Injectable
public class WarpSuggestions implements Iterable<String> {

    @Inject
    private WarpService warpService;

    @Inject
    private SpigotSession session;

    @Override
    public Iterator<String> iterator() {
        return warpService.getAvailableWarpsFor(session.getSender()).iterator();
    }
}
```

Then, use it on your command parameter:

```java
@Parameters(index = "0", completionCandidates = WarpSuggestions.class)
private String warpName;
```

This ensures real-time suggestions are shown based on sender permissions or runtime context.

---

## Type Conversion

Quartz integrates with its own ConversionService, so parameters like enums or custom types are resolved automatically:

```java
@Parameters(index = "0")
private GameMode gameMode;
```

Built-in converters are extended via a decorated converterRegistry, ensuring compatibility with Spring's type system.

---

## Executing Commands Programmatically

Use **CommandExecutor** to run a command manually:

```java
@Inject
private CommandExecutor commandExecutor;

commandExecutor.execute("fly");
```

It returns a **CommandResult** containing output and error state.