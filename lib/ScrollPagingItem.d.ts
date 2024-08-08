import React, { ElementType, HTMLAttributes, MutableRefObject, ReactNode } from "react";
import { itemOffsetType } from "./uesScrollPaging";
type ScrollPagingItemType<T> = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    list: T[];
    itemOffset: itemOffsetType[];
    as?: ElementType;
    children: (v: T, i: number) => ReactNode;
    itemElementRef: MutableRefObject<HTMLElement[]>;
    fillHeight: number;
    [key: string]: any;
};
export declare const ScrollPagingItem: <T>({ list, itemOffset, as, children, itemElementRef, fillHeight, ...other }: ScrollPagingItemType<T>) => React.JSX.Element;
export {};
