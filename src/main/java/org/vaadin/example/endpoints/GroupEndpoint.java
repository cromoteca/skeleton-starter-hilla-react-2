package org.vaadin.example.endpoints;

import java.util.List;

import org.vaadin.example.entity.InvoiceItem;
import org.vaadin.example.entity.Transaction;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;

@Endpoint
@AnonymousAllowed
public class GroupEndpoint {

    public record Person(String fullName, int age) {}

    public static class Group {
        private String name;
        private Person[] people;

        public Person[] getPeople() {
            return people;
        }

        public void setPeople(Person[] people) {
            this.people = people;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public Group getGroup() {
        var group = new Group();
        group.setName("My Group");
        group.setPeople(new Person[] { new Person("John Doe2", 42), new Person("Jane Doe", 43) });
        return group;
    }

    public String getDummy2() {
        return "dummy";
    }

    public Transaction getTransaction() {
        var transaction = new Transaction();
        transaction.setDescription("A transaction");
        transaction.setItems(List.of(new InvoiceItem(1), new InvoiceItem(2)));
        return transaction;
    }
}
