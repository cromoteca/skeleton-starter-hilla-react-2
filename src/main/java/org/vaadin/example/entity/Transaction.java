package org.vaadin.example.entity;

import java.util.List;

@lombok.Data
public class Transaction {

    private String description;
    private List<InvoiceItem> items;
}
