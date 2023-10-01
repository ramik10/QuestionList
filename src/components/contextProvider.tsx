"use client";
import { RecoilRoot } from "recoil";
import { ElementType } from "react";


interface ContextProviderProps {
    Component: ElementType;
    pageProps: any;
}

export default function ContextProvider({ Component, pageProps }: ContextProviderProps) {
    return (
        <RecoilRoot>
            <Component {...pageProps} />
        </RecoilRoot>
    );
}