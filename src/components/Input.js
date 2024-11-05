import { useCallback } from "react"

export function Input({ value, onChange }) {
    let onChange_m = useCallback((e) => onChange(e.target.value), [onChange])
    return <input style={{margin: 10}} type="text" value={value} onChange={onChange_m}></input>
}