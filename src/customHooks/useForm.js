import { useState } from "react";
import { useEffectUpdate } from "./useEffectUpdate";

export function useForm(initialFields, cb = () => { }) {
    const [fields, setFields] = useState(initialFields)

    useEffectUpdate(() => {
        cb(fields)
    }, [fields])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        console.log(target)
        console.log(value)

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
            default:
                break;
        }
        // console.log(typeof value)
        // setFields(value)
        setFields((prevFields) => ({ ...prevFields, [field]: value }))
    }

    return [
        fields,
        handleChange,
        setFields
    ]

}