import React, { ElementType, HTMLAttributes, MutableRefObject, ReactNode } from "react";
type ScrollPagingContainerType = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    as?: ElementType;
    children: ReactNode;
    scrollEvent: Function;
    containerElementRef: MutableRefObject<HTMLElement | undefined>;
    [key: string]: any;
};
export declare const ScrollPagingContainer: ({ as, children, scrollEvent, containerElementRef, ...other }: ScrollPagingContainerType) => React.JSX.Element;
export {};
