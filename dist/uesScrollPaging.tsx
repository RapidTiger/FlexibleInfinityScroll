import {useEffect, useRef, useState} from "react";

type ScrollPagingHookType<T> = {
	list: T[]
	padding?: number
}

export type itemOffsetType = {
	top: number
	bot: number
	visible: number
}

export const uesScrollPaging = <T, >({list, padding = 200}: ScrollPagingHookType<T>) => {
	const containerElementRef = useRef<HTMLElement>()
	const wrapElementRef = useRef<HTMLElement>()
	const itemElementRef = useRef<HTMLElement[]>([])
	const moreElementRef = useRef<HTMLElement>();

	const visibleFirstTopRef = useRef(-1)
	const visibleLastBotRef = useRef(-1)

	const [itemOffset, setItemOffset] = useState<itemOffsetType[]>([])
	const [minHeight, setMinHeight] = useState(0)
	const [paddingTop, setPaddingTop] = useState(0)
	const [fillHeight, setFillHeight] = useState(0)

	useEffect(() => {
		if (containerElementRef.current) {
			const computedStyle = getComputedStyle(containerElementRef.current);
			const paddingTop = parseInt(computedStyle.getPropertyValue('padding-top'));
			const paddingBot = parseInt(computedStyle.getPropertyValue('padding-bottom'));
			const containerHeight = containerElementRef.current.scrollHeight - (paddingTop + paddingBot);
			const moreHeight = moreElementRef.current?.offsetHeight || 0;
			setMinHeight(containerHeight - moreHeight)
		}
		setItemOffset(v => {
			if (containerElementRef.current) {
				itemElementRef.current.forEach((e, i) => {
					if (e && !v[i]) {
						const top = e.offsetTop;
						const bot = top + e.offsetHeight;
						v[i] = {top, bot, visible: 2}
					}
				})
			}
			return v
		})
	}, [list])

	useEffect(() => {
		minHeight && scrollEvent(true)
	}, [minHeight]);

	const scrollEvent = (isRender = false) => {
		if (containerElementRef.current) {
			const computedStyle = getComputedStyle(containerElementRef.current);
			const paddingTop = parseInt(computedStyle.getPropertyValue('padding-top'));
			const paddingBot = parseInt(computedStyle.getPropertyValue('padding-bottom'));
			const offsetTop = containerElementRef.current.offsetTop;
			const scrollTop = containerElementRef.current.scrollTop + offsetTop;
			const scrollBot = scrollTop + containerElementRef.current.offsetHeight - (paddingTop + paddingBot);

			const firstTop = scrollTop < visibleFirstTopRef.current;
			const lastBot = scrollBot > visibleLastBotRef.current;

			if (isRender || visibleFirstTopRef.current < 0 || firstTop || lastBot) {
				let first = true
				setItemOffset(v => v.map(v => {
					v.visible = scrollTop - padding <= v.bot && scrollBot + padding >= v.top ? 1 : 0
					if (v.visible === 1) {
						visibleLastBotRef.current = v.bot
						setFillHeight(Math.max(minHeight - v.bot, 0))

						if (first) {
							visibleFirstTopRef.current = v.top
							setPaddingTop(v.top - offsetTop - paddingTop)
							first = !first
						}
					}
					return v
				}))
			}
		}
	}

	return {
		container: {scrollEvent, containerElementRef},
		wrap: {wrapElementRef, minHeight, paddingTop},
		item: {list, itemOffset, itemElementRef, fillHeight},
		more: {moreElementRef}
	}
}