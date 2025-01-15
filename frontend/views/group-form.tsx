import { useForm, useFormArrayPart, useFormPart } from '@vaadin/hilla-react-form';
import { Button, NumberField, TextField } from "@vaadin/react-components";
import InvoiceItemModel from 'Frontend/generated/org/vaadin/example/entity/InvoiceItemModel';
import TransactionModel from 'Frontend/generated/org/vaadin/example/entity/TransactionModel';


function InvoiceItemForm({ model, remove }: { model: InvoiceItemModel, remove: () => void }) {
    const { field } = useFormPart(model);

    return (
        <div>
            <NumberField {...field(model.quantity)} />
            <Button onClick={remove}>Remove</Button>
        </div>
    );
}

export default function GroupFormView() {
    const { field, model } = useForm(TransactionModel);
    const { items, value, setValue } = useFormArrayPart(model.items);

    return (
        <>
            <TextField {...field(model.description)} />
            {items?.map((item, index) => (
                <InvoiceItemForm key={index} model={item} remove={() => setValue(value!.filter((_, i) => i !== index))} />
            ))}
            <Button onClick={() => setValue([...(value ?? []), InvoiceItemModel.createEmptyValue()])}>Add item</Button>
        </>
    );
}
