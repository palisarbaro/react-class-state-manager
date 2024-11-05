export function makeValueFunc(v) {
    let fn = v;
    if (typeof v != "function") {
        fn = () => v;
    }
    return fn;
}