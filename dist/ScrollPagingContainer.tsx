import React, {ElementType, HTMLAttributes, MutableRefObject, ReactNode} from "react";

type ScrollPagingContainerType = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
	as?: ElementType
	children: ReactNode
	scrollEvent: Function
	containerElementRef: MutableRefObject<HTMLElement | undefined>
	[key: string]: any
}

export const ScrollPagingContainer = ({as = 'div', children, scrollEvent, containerElementRef, ...other}: ScrollPagingContainerType) => {
	const Tag = as;
	return (
		<Tag {...other} onScroll={(e: React.UIEvent<HTMLElement, UIEvent>) => {
			scrollEvent()
			other.onScroll && other.onScroll(e)
		}} ref={(r: HTMLElement) => {
			containerElementRef.current = r
			other?.ref && other.ref(r)
		}}
		>
			{children}
		</Tag>
	)
}