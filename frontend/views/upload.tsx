import { useSignal } from "@vaadin/hilla-react-signals";
import { Notification, Upload, UploadBeforeEvent, UploadFile } from "@vaadin/react-components";
import { HelloEndpoint } from "Frontend/generated/endpoints";

export default function UploadView() {
    const files = useSignal<UploadFile[]>([]);

    const sendToServer = async (e: UploadBeforeEvent) => {
        e.preventDefault();
        const file = e.detail.file;
        file.uploading = true;
        const buffer = await file.arrayBuffer();
        await HelloEndpoint.upload(file.name, [...new Int8Array(buffer)]);
        Notification.show(`Uploaded ${file.name}`);
        file.held = false;
        file.status = "";
        file.complete = true;
        files.value = [file, ...files.value];
        return false;
    };

    return <div className="flex-wrap gap-m">
        <Upload
            files={files.value}
            onFilesChanged={({ detail: { value } }) => files.value = value}
            accept="image/*"
            capture="camera"
        />
        <div className="flex p-m gap-m">
            {files.value.map((file) => (
                <img
                    key={file.name}
                    src={URL.createObjectURL(file)}
                    style={{ maxWidth: "10rem", maxHeight: "10rem" }}
                />
            ))}
        </div>
    </div>
}
