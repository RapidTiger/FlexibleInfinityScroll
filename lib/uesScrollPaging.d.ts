type ScrollPagingHookType<T> = {
    list: T[];
    padding?: number;
};
export type itemOffsetType = {
    top: number;
    bot: number;
    visible: number;
};
export declare const uesScrollPaging: <T>({ list, padding }: ScrollPagingHookType<T>) => {
    container: {
        scrollEvent: (isRender?: boolean) => void;
        containerElementRef: import("react").MutableRefObject<HTMLElement | undefined>;
    };
    wrap: {
        wrapElementRef: import("react").MutableRefObject<HTMLElement | undefined>;
        minHeight: number;
        paddingTop: number;
    };
    item: {
        list: T[];
        itemOffset: itemOffsetType[];
        itemElementRef: import("react").MutableRefObject<HTMLElement[]>;
        fillHeight: number;
    };
    more: {
        moreElementRef: import("react").MutableRefObject<HTMLElement | undefined>;
    };
};
export {};
