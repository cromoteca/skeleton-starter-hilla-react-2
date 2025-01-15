import { Button } from "@vaadin/react-components";
import { HelloEndpoint } from "Frontend/generated/endpoints";

export default function SignalView() {
    const signal = HelloEndpoint.counter();
    return (
        <div className="p-m">
            <Button onClick={() => signal.incrementBy(1)}>Value: {signal}</Button>
        </div>
    );
}
