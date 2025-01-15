import {useSignal} from "@vaadin/hilla-react-signals";
import {Button} from "@vaadin/react-components";
import {HelloEndpoint} from "Frontend/generated/endpoints";
import {ActionOnLostSubscription} from "@vaadin/hilla-frontend";
import { useEffect } from "react";

const subscribe = function(apply: (val: string) => void) {
  HelloEndpoint.subscribeToHello().onNext((message) => {
    apply(message);
  }).onError(() => {
    console.log('error');
  }).onComplete(() => {
    console.log('complete');
  }).onSubscriptionLost(() => {
    console.log('subscription lost');
    return ActionOnLostSubscription.RESUBSCRIBE;
  });
}

const counter = HelloEndpoint.counter();

export default function MainView() {
  const msg = useSignal('');

  // useEffect(() => subscribe((val) => msg.value = val), []);
  // useEffect(() => {
  //   HelloEndpoint.counter(true).incrementBy(1).then(() => console.log('ECCO'));
  // }, []);

  return (
    <div className="p-m">
      {msg}
      <Button onClick={() => HelloEndpoint.setInterval(1).then(console.log)}>1 second</Button>
      <Button onClick={() => HelloEndpoint.setInterval(5).then(console.log)}>5 seconds</Button>
      <Button onClick={() => counter.incrementBy(1)}>Increment</Button>
      <Button onClick={() => console.log(counter.value)}>Log {counter}</Button>
    </div>
  );
}
