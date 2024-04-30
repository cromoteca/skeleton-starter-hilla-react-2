package org.vaadin.example;

import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.crud.CrudRepositoryService;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@BrowserCallable
@AnonymousAllowed
public class ProductService
        extends CrudRepositoryService<Product, Long, ProductRepository> {
}
