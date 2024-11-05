import { useCallback, useState } from "react";

export function useCounter(init = 0) {
    let [state, setState] = useState(init);
    let inc = useCallback((inc_by = 1) => { setState(x => x + inc_by) }, [setState])
    return [state, inc]
}