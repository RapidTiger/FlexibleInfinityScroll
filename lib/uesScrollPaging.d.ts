type ScrollPagingHookType<T> = {
    list: T[];
    padding?: number;
};
export type ItemOffsetType = {
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
        itemOffset: ItemOffsetType[];
        itemElementRef: import("react").MutableRefObject<HTMLElement[]>;
        fillHeight: number;
        end: boolean;
    };
    more: {
        moreElementRef: import("react").MutableRefObject<HTMLElement | undefined>;
        end: boolean;
    };
    setEnd: () => void;
    reset: () => void;
};
export {};
