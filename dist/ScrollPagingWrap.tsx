import React, {ElementType, HTMLAttributes, MutableRefObject, ReactNode} from "react";

type ScrollPagingWrapType = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
	as?: ElementType;
	children: ReactNode;
	wrapElementRef: MutableRefObject<HTMLElement | undefined>
	minHeight: number
	paddingTop: number
	[key: string]: any
}

export const ScrollPagingWrap = ({as = 'div', children, wrapElementRef, minHeight, paddingTop, ...other}: ScrollPagingWrapType) => {
	const Tag = as;

	return (
		<Tag {...other} ref={(r: HTMLElement) => {
			wrapElementRef.current = r
			other?.ref && other.ref(r)
		}} style={{minHeight, paddingTop}}>
			{children}
		</Tag>
	)
}
