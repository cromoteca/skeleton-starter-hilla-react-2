import { HelloEndpoint } from "Frontend/generated/endpoints";
import { computed, ValueSignal } from "@vaadin/hilla-react-signals";

const names = HelloEndpoint.names({defaultValue: ''});
const list = computed(() => {
    const result: ValueSignal<string>[] = [];
    result.push(names);
    return result;
});

export default function ListView() {
    return <>
        {list.value.map((item, index) => <div key={index}>{item.value}</div>)}
    </>;
}
