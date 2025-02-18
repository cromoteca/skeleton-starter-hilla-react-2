package org.vaadin.example.models;

import lombok.*;
import com.example.library.unpublished.SomeEnum;
import org.vaadin.api.model.Greeting;

@Setter
@Getter
@AllArgsConstructor
@Builder
public class GreetingWrapper {
    private final Greeting greeting;
    private final SomeEnum someEnum;
}
