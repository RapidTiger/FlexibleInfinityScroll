import React, { ElementType, HTMLAttributes, MutableRefObject, ReactNode } from "react";
type ScrollPagingMoreType = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    as?: ElementType;
    children: ReactNode;
    moreElementRef: MutableRefObject<HTMLElement | undefined>;
    event: Function;
    end: boolean;
    [key: string]: any;
};
export declare const ScrollPagingMore: ({ as, children, moreElementRef, event, end, ...other }: ScrollPagingMoreType) => React.JSX.Element;
export {};
