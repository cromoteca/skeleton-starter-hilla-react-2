package org.vaadin.example.endpoints;

import java.time.Duration;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.Nullable;
import org.springframework.web.multipart.MultipartFile;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import com.vaadin.hilla.EndpointSubscription;
import com.vaadin.hilla.signals.ListSignal;
import com.vaadin.hilla.signals.NumberSignal;
import com.vaadin.hilla.signals.ValueSignal;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Endpoint
@AnonymousAllowed
public class HelloEndpoint {

    AtomicLong interval = new AtomicLong(1);
    AtomicLong counter = new AtomicLong(0);

    public EndpointSubscription<String> subscribeToHello() {
        var f = Flux.defer(() -> Mono.delay(Duration.ofSeconds(interval.get())))
                .repeatWhen(flux -> flux.delayElements(Duration.ofSeconds(interval.get())))
                .map(l -> "#" + counter.incrementAndGet())
                .subscribeOn(Schedulers.parallel());

        return EndpointSubscription.of(f, () -> {
            System.out.println("disconnected");
        });
    }

    public String setInterval(int seconds) {
        interval.set(seconds);
        return "Interval set to " + seconds + " seconds";
    }

    public @Nullable
    Flux<@Nullable String> nullableFlux() {
        return null;
    }

    private final NumberSignal ns = new NumberSignal();

    public NumberSignal counter() {
        return ns;
    }

    List<ValueSignal<String>> names = List.of(
            new ValueSignal<>("Alice", String.class),
            new ValueSignal<>("Bob", String.class),
            new ValueSignal<>("Charlie", String.class),
            new ValueSignal<>("David", String.class)
    );

    public ValueSignal<String> names() {
        return names.get(0);
    }

    ListSignal<String> contactSignal = new ListSignal<>(String.class);

    public ListSignal<String> contacts() {
        return contactSignal;
    }

    public void upload(@NonNull String filename, byte @NonNull [] data) {
        System.out.format("Uploaded `%s`: %d bytes\n", filename, data.length);
    }

    public record User(String name, MultipartFile avatar) {}

    public void uploadUser(User user) {
        System.out.format("Uploaded `%s` with avatar `%s`: %d bytes\n", user.name(), user.avatar().getOriginalFilename(), user.avatar().getSize());
    }
}
