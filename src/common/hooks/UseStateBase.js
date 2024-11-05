import { useEffect, useMemo, useState } from "react";
import { makeValueFunc } from "../utils/makeValueFunc";
/* eslint-disable react-hooks/rules-of-hooks */

/**
 * @template T
 * @typedef {(v:T|(v:T)=>T)} SetterArg
 */

/**
 * @template State
 */
export class UseStateBase {
    /**
     * @protected
     * @type {State}
     */
    _state;
    /**
     * @protected
     */
    _setState;
    /**
     * @protected
     */
    _listeners;
    /**
     * 
     * @param {State} init 
     */
    constructor(init) {
        this._listeners = new Set();
        let [state, setState] = useState(init);
        this._state = state;
        this._setState = setState;
    }

    /**
     * @template T
     * @protected
     * @param {(state: State)=>T} getter
     * @param {((state: State, fn: (T)=>T) => void)} setter
     * @returns {[T,(SetterArg<T>)=>void]}
     */
    _wrapUseListen(getter, setter) {
        let value = this._useListen(getter);
        let setValue = useMemo(()=>this._wrapSetter(setter), [setter])
        return [value, setValue]
    }
    /**
     * @template T
     * @protected
     * @param {((state: State, fn: (T)=>T) => void)} setter
     * @returns {(SetterArg<T>)=>void}
     */
    _wrapSetter(setter) {
        return (v) => {
            let fn = makeValueFunc(v)
            this._update(state => {
                setter(state, fn)
                return state;
            })
        }
    }
    /**
     * @template T
     * @protected
     * @param {(state: State)=>T} getter
     * @param {((state: State, fn: (T)=>T) => void)} setter
     */
    _makeSimpleGetSetListen(getter, setter) {
        const useListen = () => {
            return this._wrapUseListen(getter, setter)
        }
        /**
         * 
         * @param {T} v 
         */
        const set = (v) => {
            this._wrapSetter(setter)(v)
        }
        const get = () => getter(this._state)
        return {
            get,
            set,
            useListen
        }
    }
    /**
     * @protected
     */
    _update(v) {
        let fn = makeValueFunc(v);
        let next = null;
        const doNotify = (next) => {
            this._state = next;
            for (let listener of this._listeners) {
                listener(next)
            }
        }
        this._setState(v => (next = fn(v), doNotify(next), next))
    }
    /**
     * @protected
     */
    _useListen(accessor = (x) => x) {
        let [state, setState] = useState(accessor(this._state));
        useEffect(() => {
            let listener = (next) => {
                setState(accessor(next));
            }
            this._listeners.add(listener);
            return () => this._listeners.delete(listener)
        }, [accessor, setState])
        return state;
    }
}
/* eslint-enable */
