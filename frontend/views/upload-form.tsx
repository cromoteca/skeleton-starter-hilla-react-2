import { HelloEndpoint } from "Frontend/generated/endpoints";
import { FormEvent, useState } from "react";

export default function UploadForm({ }) {
    const [uploadState, setUploadState] = useState("");

    const uploadFile = async (event: FormEvent) => {
        event.preventDefault();
        const file = new FormData(event.target as HTMLFormElement).get("file");
        await HelloEndpoint.uploadAvatar("user", file as File);
        setUploadState("ok!");
    };

    return <form onSubmit={uploadFile}>
        <input type="file" name="file" />
        <button type="submit">Upload</button>
        <output>{uploadState}</output>
    </form>;
}
