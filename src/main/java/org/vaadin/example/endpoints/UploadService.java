package org.vaadin.example.endpoints;

import java.util.UUID;

import org.jspecify.annotations.NonNull;
import org.springframework.web.multipart.MultipartFile;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

@BrowserCallable
@AnonymousAllowed
public class UploadService {

    /**
     * Simulates uploading a file.
     *
     * @param file the uploaded file
     * @return an identifier for the uploaded file
     */
    @NonNull
    public String uploadFile(@NonNull MultipartFile file) {
        return file.getOriginalFilename() + '_' + file.getSize() + '_' + UUID.randomUUID();
    }

}
