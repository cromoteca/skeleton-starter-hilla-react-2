import { useSignal } from "@vaadin/hilla-react-signals";
import { Upload, UploadFile, UploadRequestEvent } from "@vaadin/react-components";
import { HelloEndpoint } from "Frontend/generated/endpoints";

type UploadProps = React.ComponentProps<typeof Upload>;

type WrappedUploadProps = Omit<UploadProps, 'onUploadRequest' | 'files' | 'onFilesChanged'> & {
    service: (file: File) => Promise<string>;
    onResponse?: (value: string) => void;
}

function WrappedUpload({ service, onResponse, ...props }: WrappedUploadProps): JSX.Element {
    const files = useSignal<UploadFile[]>([]);
    const sendToServer = async (e: UploadRequestEvent) => {
        e.preventDefault();
        const file = e.detail.file;
        file.uploading = true;
        service(file).then(response => {
            onResponse?.(response);
            file.held = false;
            file.status = "";
            file.complete = true;
        });
        return false;
    };

    return <Upload
        onUploadRequest={sendToServer}
        files={files.value}
        onFilesChanged={({ detail: { value } }) => files.value = value}
        {...props}
    />;
}

export default function UploadView() {
    const msg = useSignal('');
    return <>
        <WrappedUpload service={HelloEndpoint.uploadFile} onResponse={value => msg.value = value} />
        <p>{msg}</p>
    </>;
}
