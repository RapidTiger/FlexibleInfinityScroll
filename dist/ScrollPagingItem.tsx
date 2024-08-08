import React, {ElementType, Fragment, HTMLAttributes, MutableRefObject, ReactNode} from "react";
import {itemOffsetType} from "./uesScrollPaging";

type ScrollPagingItemType<T> = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
	list: T[]
	itemOffset: itemOffsetType[]
	as?: ElementType;
	children: (v: T, i: number) => ReactNode
	itemElementRef: MutableRefObject<HTMLElement[]>
	fillHeight: number
	[key: string]: any
}

export const ScrollPagingItem = <T, >({list = [], itemOffset, as = 'div', children, itemElementRef, fillHeight, ...other}: ScrollPagingItemType<T>) => {
	const Tag = as;
	return (
		<>
			{list.map((v, i) => {
				const itemOffsetType = itemOffset[i];
				return (!itemOffsetType || itemOffsetType.visible > 0) &&
					<Fragment key={i}>
						<Tag {...other} ref={(r: HTMLElement) => {
							itemElementRef.current[i] = r
							other?.ref && other.ref(r)
						}} index={i}>
							{children(v, i)}
						</Tag>
						{(itemOffsetType?.visible === 1) && !itemOffset?.[i + 1]?.visible && <div style={{height: fillHeight}}></div>}
					</Fragment>
			})}
		</>
	)
}
