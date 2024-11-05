import { memo, useContext, useMemo } from "react";
import { ctx } from "../providers/Provider";
import { Input } from "./Input";

function X() {
    let state = useContext(ctx);
    let [value, setValue] = state.b.x.useListen();
    return <div style={{margin:10}}>X:{value}</div>
}
function _Y() {
    let state = useContext(ctx);
    let [value, setValue] = state.b.y.useListen();
    return <div>Y:{value}</div>
}
const Y = memo(_Y)
function DeepAcces() {
    let state = useContext(ctx);
    let [value, setValue] = state.b.x.useListen();
    return <div>
        <h1>Deep Acess</h1>
        <Input value={value} onChange={setValue} ></Input>
        <X/>
        <Y/>

    </div>
}

// export default memo(DeepAcces)
export default DeepAcces