import { memo, useCallback, useContext, useMemo } from "react";
import { ctx } from "../providers/Provider";
import { Input } from "./Input";

function _Element(props) {
    return <div>
        <label>{props.label}</label>
        <Input value={props.value} onChange={(v) => props.onChange(props.index, v)}></Input>
    </div>
}
const Element = memo(_Element)

function ArrayAccess() {
    let state = useContext(ctx);
    let [value, setValue] = state.array.useListen();
    let onElementChange = useCallback((index, value) => {
        setValue(array => {
            array[index] = { ...array[index], value };
            return [...array];
        });
    }, [setValue])
    return <div>
        <h1>ArrayAccess</h1>
        <div>
            {
                value.map(({ label, value, id }, index) => (
                    <Element index={index} key={id} label={label} value={value} onChange={onElementChange} />
                ))
            }
        </div>

    </div>
}
export default ArrayAccess