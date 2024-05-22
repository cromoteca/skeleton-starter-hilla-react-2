import { AutoGrid } from "@vaadin/hilla-react-crud";
import { ProductAdvancedDtoListService } from "Frontend/generated/endpoints.js";
import ProductAdvancedDtoModel from "Frontend/generated/org/vaadin/example/ProductAdvancedDtoModel";

export default function MainView() {
  return (
    <>
      <AutoGrid model={ProductAdvancedDtoModel} service={ProductAdvancedDtoListService} hiddenColumns={['id', 'supplier.id']} />
    </>
  );
}
