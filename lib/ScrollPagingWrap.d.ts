import React, { ElementType, HTMLAttributes, MutableRefObject, ReactNode } from "react";
type ScrollPagingWrapType = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    as?: ElementType;
    children: ReactNode;
    wrapElementRef: MutableRefObject<HTMLElement | undefined>;
    minHeight: number;
    paddingTop: number;
    [key: string]: any;
};
export declare const ScrollPagingWrap: ({ as, children, wrapElementRef, minHeight, paddingTop, ...other }: ScrollPagingWrapType) => React.JSX.Element;
export {};
