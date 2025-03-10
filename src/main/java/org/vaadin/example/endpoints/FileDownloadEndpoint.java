package org.vaadin.example.endpoints;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;

@Endpoint
@AnonymousAllowed
public class FileDownloadEndpoint {

    @RequestMapping(value = "/download/{id}", method = RequestMethod.GET)
    public ResponseEntity<Resource> downloadFile(@PathVariable("id") String id) {
        // Generate file contents on the fly
        String content = "File content for ID: " + id;
        Resource file = new ByteArrayResource(content.getBytes());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"file_" + id + ".txt\"")
                .body(file);
    }
}
