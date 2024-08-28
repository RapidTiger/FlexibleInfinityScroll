import React, {ElementType, Fragment, HTMLAttributes, MutableRefObject, ReactNode, useEffect} from "react";
import {ItemOffsetType} from "./uesScrollPaging";

type ScrollPagingItemType<T> = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
	list: T[]
	itemOffset: ItemOffsetType[]
	as?: ElementType;
	children: [(v: T, i: number) => ReactNode] | [(v: T, i: number) => ReactNode, ReactNode]
	itemElementRef: MutableRefObject<HTMLElement[]>
	fillHeight: number
	end: boolean
	[key: string]: any
}

export const ScrollPagingItem = <T, >({list = [], itemOffset, as = 'div', children, itemElementRef, fillHeight, end, ...other}: ScrollPagingItemType<T>) => {
	const Tag = as;
	return (
		<>
			{children?.length && list?.length ? list.map((v, i) => {
				const itemOffsetType = itemOffset[i];
				return (!itemOffsetType || itemOffsetType.visible > 0) &&
					<Fragment key={i}>
						<Tag {...other} ref={(r: HTMLElement) => {
							itemElementRef.current[i] = r
							other?.ref && other.ref(r)
						}}>
							{children[0](v, i)}
						</Tag>
						{(!!fillHeight && itemOffsetType?.visible === 1) && !itemOffset?.[i + 1]?.visible && <div style={{height: fillHeight}}></div>}
					</Fragment>
			}) : end && <>{children[1]}</>}
		</>
	)
}
