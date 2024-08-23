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
	const [scrollTrigger, setScrollTrigger] = useState(0)
	const [minHeight, setMinHeight] = useState(0)
	const [paddingTop, setPaddingTop] = useState(0)
	const [fillHeight, setFillHeight] = useState(0)

	useEffect(() => {
		if (!containerElementRef.current) {
			containerElementRef.current = document.querySelector('html') || document.body
		}

		let throttle = false
		let timeout: NodeJS.Timeout

		const resetOffsetAct = () => {
			if (throttle && timeout) clearTimeout(timeout);
			throttle = true
			timeout = setTimeout(() => {
				setItemOffset([])
				setMinHeight(0)
				setPaddingTop(0)
				setFillHeight(0)
			}, 500);
		};
		window.addEventListener('resize', resetOffsetAct)

		return () => {
			window.removeEventListener('resize', resetOffsetAct)
		}
	}, []);

	useEffect(() => {
		const wrapElement = wrapElementRef.current;
		const containerElement = containerElementRef.current;

		setItemOffset(v => {
			if (containerElement) {
				itemElementRef.current.forEach((e, i) => {
					if (e && !v[i]) {
						const top = e.offsetTop;
						const bot = top + e.clientHeight;
						v[i] = {top, bot, visible: 2}
					}
				})
			}
			return v
		})

		if (wrapElement && containerElement) {
			const scrollHeight = containerElement.scrollHeight;
			const clientHeight = containerElement.clientHeight;
			if (list.length && scrollHeight > clientHeight) {
				const computedStyle = getComputedStyle(containerElement);
				const paddingTop = parseInt(computedStyle.getPropertyValue('padding-top'));
				const paddingBot = parseInt(computedStyle.getPropertyValue('padding-bottom'));
				const containerHeight = scrollHeight - (paddingTop + paddingBot + wrapElement.offsetTop);
				const moreHeight = moreElementRef.current?.clientHeight || 0;
				setMinHeight(containerHeight - moreHeight)
			} else {
				setMinHeight(0)
			}
		}

		setScrollTrigger(v => ++v)
	}, [list])

	useEffect(() => {
		scrollEvent(true)
		if (containerElementRef.current?.tagName === 'HTML') {
			const listener = () => scrollEvent();
			window.addEventListener('scroll', listener)
			return () => {
				window.removeEventListener('scroll', listener)
			}
		}
	}, [scrollTrigger]);

	const scrollEvent = (isRender = false) => {
		const containerElement = containerElementRef.current;
		const wrapElement = wrapElementRef.current;
		if (containerElement && wrapElement) {
			const paddingTop = parseInt(getComputedStyle(containerElement).paddingTop);
			const paddingBot = parseInt(getComputedStyle(containerElement).paddingBottom);
			const paddingY = paddingTop + paddingBot;
			const offsetTop = containerElement.offsetTop;
			const scrollTop = containerElement.scrollTop + offsetTop;
			const warpTop = wrapElement.offsetTop;
			const scrollBot = scrollTop + containerElement.clientHeight - paddingY;
			const firstTop = scrollTop < visibleFirstTopRef.current;
			const lastBot = scrollBot > visibleLastBotRef.current - paddingY;

			if (isRender || visibleFirstTopRef.current < 0 || firstTop || lastBot) {
				let first = true
				setItemOffset(v => v.map((v, i) => {
					v.visible = scrollTop - padding <= v.bot && scrollBot + padding + paddingY >= v.top ? 1 : 0
					if (v.visible === 1) {
						visibleLastBotRef.current = v.bot
						setFillHeight(Math.max(minHeight - (v.bot - offsetTop), 0))
						if (first) {
							visibleFirstTopRef.current = v.top
							setPaddingTop(v.top - warpTop)
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
		more: {moreElementRef},
	}
}