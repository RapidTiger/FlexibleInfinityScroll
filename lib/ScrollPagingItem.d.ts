import React, { ElementType, HTMLAttributes, MutableRefObject, ReactNode } from "react";
import { ItemOffsetType } from "./uesScrollPaging";
type ScrollPagingItemType<T> = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    list: T[];
    itemOffset: ItemOffsetType[];
    as?: ElementType;
    children: [(v: T, i: number) => ReactNode] | [(v: T, i: number) => ReactNode, ReactNode];
    itemElementRef: MutableRefObject<HTMLElement[]>;
    fillHeight: number;
    end: boolean;
    [key: string]: any;
};
export declare const ScrollPagingItem: <T>({ list, itemOffset, as, children, itemElementRef, fillHeight, end, ...other }: ScrollPagingItemType<T>) => React.JSX.Element;
export {};
