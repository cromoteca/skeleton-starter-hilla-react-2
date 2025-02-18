import { Button, Notification, TextField } from "@vaadin/react-components";
import { HelloEndpoint } from "Frontend/generated/endpoints";

const counter = HelloEndpoint.counter();

export default function MainView() {
  function logUppercase(m: string) {
    HelloEndpoint.uppercase(m).then(msg => Notification.show(msg, { theme: "success", position: "bottom-end", duration: 1000 }));
  }

  return (
    <div className="p-m">
      <TextField onValueChanged={({ detail: { value } }) => logUppercase(value)}></TextField>
      <Button onClick={() => HelloEndpoint.setInterval(1).then(console.log)}>1 second</Button>
      <Button onClick={() => HelloEndpoint.setInterval(5).then(console.log)}>5 seconds</Button>
      <Button onClick={() => counter.incrementBy(1)}>Increment</Button>
      <Button onClick={() => console.log(counter.value)}>Log {counter}</Button>
    </div>
  );
}
