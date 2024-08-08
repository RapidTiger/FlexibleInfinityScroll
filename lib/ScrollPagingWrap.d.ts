import React, { ElementType, HTMLAttributes, MutableRefObject } from "react";
type ScrollPagingWrapType = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    as?: ElementType;
    children: Element;
    wrapElementRef: MutableRefObject<HTMLElement | undefined>;
    minHeight: number;
    paddingTop: number;
    [key: string]: any;
};
export declare const ScrollPagingWrap: ({ as, children, wrapElementRef, minHeight, paddingTop, ...other }: ScrollPagingWrapType) => React.JSX.Element;
export {};
