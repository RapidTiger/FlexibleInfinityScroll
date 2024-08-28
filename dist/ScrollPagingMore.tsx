import React, {ElementType, HTMLAttributes, MutableRefObject, ReactNode, useEffect, useRef, useState} from "react";

type ScrollPagingMoreType = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
	as?: ElementType
	children: ReactNode
	moreElementRef: MutableRefObject<HTMLElement | undefined>
	event: Function
	end: boolean
	[key: string]: any
}

export const ScrollPagingMore = ({as = 'div', children, moreElementRef, event, end, ...other}: ScrollPagingMoreType) => {
	const Tag = as;
	const throttle = useRef(false);

	useEffect(() => {
		const moreEl = moreElementRef.current as Element;
		const observer = new IntersectionObserver(async ([entry]) => {
			if (entry.isIntersecting && !throttle.current) {
				throttle.current = true;
				await event();
				throttle.current = false;
				observer.disconnect()
				observer.observe(moreEl)
			}
		})
		observer.observe(moreEl);
	}, []);

	return (
		<>
			{!end && <Tag ref={(r: HTMLElement) => {
				moreElementRef.current = r
				other?.ref && other.ref(r)
			}} {...other}>
				{children}
			</Tag>}
		</>
	)
}