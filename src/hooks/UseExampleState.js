import { UseStateBase } from "../common/hooks/UseStateBase";
const makeArrayState = (n)=>{
    return Array.from({length: n}, (_,i)=>{
        return {label: "Field"+i, id: i, value:""};
    })
}
const makeDefaultState = () => ( { a: "3", b: { x: "1", y: 3 }, array: makeArrayState(9)})
/**
 * @template {ReturnType<typeof makeDefaultState>} State
 * @extends UseStateBase<State>
 */
export class UseExampleState extends UseStateBase {
    constructor() {
        super(makeDefaultState());
        this.b = {
            x: this._makeSimpleGetSetListen((state) => state.b.x, (state, fn) => { state.b.x = fn(state.b.x) }),
            y: this._makeSimpleGetSetListen((state) => state.b.y, (state, fn) => { state.b.y = fn(state.b.y) })
        }
        this.a = this._makeSimpleGetSetListen((state) => state.a, (state, fn) => { state.a = fn(state.a) });
        this.array = this._makeSimpleGetSetListen((state)=>state.array, (state, fn) => { state.array = fn(state.array) })
    }
}