import { createContext } from "react";

/**
 * @template T
 * @typedef {import('react').Context<T>} Context
 */

/**
 * @template T
 * @param {() => T} getUseStateObject
 * @returns {[Context<T>, ({ children }: { children: React.ReactNode }) => JSX.Element]}
 */
export function makeStateProvider(getUseStateObject) {
    /**
     * @type {Context<T>}
     */
    const ctx = createContext();

    /**
     * @param {{ children: React.ReactNode }} props
     * @returns {JSX.Element}
     */
    const Provider = ({ children }) => {
        const state = getUseStateObject();
        return <ctx.Provider value={state}>
            {children}
        </ctx.Provider>
    };

    return [ctx, Provider];
}