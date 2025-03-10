package org.vaadin.example;

import java.lang.annotation.Annotation;
import java.util.List;

import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.engine.EngineConfiguration;

public class CustomEngineConfiguration extends EngineConfiguration.Service {

    @Override
    public List<Class<? extends Annotation>> getEndpointAnnotations() {
        return List.of(BrowserCallable.class);
    }

}
