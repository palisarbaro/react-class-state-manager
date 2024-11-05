import { memo, useContext, useMemo } from "react";
import { ctx } from "../providers/Provider";
import { Input } from "./Input";


function SimpleAcces() {
    let state = useContext(ctx);
    let [value, setValue] = state.a.useListen();
    return <div>
        <h1 onClick={()=>state.b.y.set(y=>y+1)}>Simple Acess</h1>
        <Input value={value || ""} onChange={setValue} ></Input>
        <div>Value: {value}</div>
    </div>
}
// export default memo(SimpleAcces)
export default SimpleAcces