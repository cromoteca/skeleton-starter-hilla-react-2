import { HelloEndpoint } from "Frontend/generated/endpoints";
import { Button, VerticalLayout } from "@vaadin/react-components";
import { useSignal } from "@vaadin/hilla-react-signals";
import { TextField } from "@vaadin/react-components/TextField.js";

const contacts = HelloEndpoint.contacts();

export default function ValidatorsView() {
    const newVal = useSignal('');

    return <VerticalLayout theme='spacing padding'>
        <TextField value={newVal.value} onValueChanged={({ detail: { value } }) => newVal.value = value}></TextField>
        <Button onClick={() => contacts.insertLast(newVal.value)}>Add to list</Button>
        {Array.from(contacts.value.values()).map((name, index) => <div key={index}>{name}</div>)}
    </VerticalLayout>
}
