import { AutoGrid } from "@vaadin/hilla-react-crud";
import { Button } from "@vaadin/react-components/Button.js";
import { Notification } from "@vaadin/react-components/Notification.js";
import { TextField } from "@vaadin/react-components/TextField.js";
import { HelloEndpoint, ProductAdvancedDtoListService } from "Frontend/generated/endpoints.js";
import ProductAdvancedDtoModel from "Frontend/generated/org/vaadin/example/ProductAdvancedDtoModel";
import { useState } from "react";

export default function MainView() {
  const [name, setName] = useState("");

  return (
    <>
      <AutoGrid model={ProductAdvancedDtoModel} service={ProductAdvancedDtoListService} hiddenColumns={['id', 'supplier.id']} />
    </>
  );
}
