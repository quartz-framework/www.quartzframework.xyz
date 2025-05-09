---
title: Listening & Publishing Events
nextjs:
  metadata:
    title: Listening & Publishing Events
    description: Learn how Quartz Framework handles platform-specific event listening and publishing.
---

Quartz Framework provides a platform-agnostic way to listen and publish events in your plugins. Its event system is designed to support multiple Minecraft platforms like Spigot and BungeeCord — without forcing you to write boilerplate listeners.

---

## Listening to Events with @Listen

Instead of implementing platform-specific listener interfaces, Quartz allows you to annotate any method in an injectable bean with @Listen:

```cpp
@Slf4j
@Injectable
public class PlayerEvents {

    @Listen
    public void onJoin(PlayerJoinEvent event) {
        log.info("Welcome " + event.getPlayer().getName());
    }
}
```

This works on any supported platform, as long as the event class is appropriate (e.g., org.bukkit.event.Event on Spigot).

### Multi-Platform First

Quartz prioritizes multi-platform plugin development. This means:

- You don’t need to implement platform-specific Listener interfaces (e.g., implements Listener in Spigot).

- You can still use them if desired — any injectable implementing a native Listener (like org.bukkit.event.Listener) will be automatically registered.

- Native **@EventHandler** annotations still work inside Quartz-managed beans.

This flexibility allows you to migrate existing listeners easily or take full advantage of Quartz’s streamlined approach.

---

## Publishing Events

Quartz provides a unified API for dispatching events through the EventPublisher interface:

```cpp
@Inject
private EventPublisher eventPublisher;

public void fireCustomEvent() {
    eventPublisher.publish(new SomeCustomEvent());
}
```

You can also choose to publish asynchronously:

```cpp
eventPublisher.publish(new SomeCustomEvent(), true);
```

Or trigger internal-only events (used by Quartz context itself):

```cpp
eventPublisher.publish(new MyApplicationInternalEvent(), true, false);
```

### Internal Events

Quartz supports internal event publishing to keep framework-specific logic isolated and avoid exposing internal state to the platform's global event system.

This ensures better encapsulation, prevents conflicts with external plugins, and allows more control over how and when framework events are triggered.

{% callout title="You should know" %}

Use the internal = true flag when calling publish(...) to restrict the event scope to inside the Quartz context.

{% /callout %}

---

{% callout type="warning" title="Known limitation" %}

Events must implement the platform’s native base class, such as org.bukkit.event.Event (Spigot) or its equivalent in platform.

{% /callout %}

{% callout type="warning" title="Known limitation" %}

Listeners registered directly via platform APIs (like Spigot's Listener) are not proxied. This means AOP and certain context hooks won’t apply directly to them.
However, you can inject and delegate calls to Quartz-managed (proxied) beans inside those listeners to still benefit from Quartz features.

{% /callout %}