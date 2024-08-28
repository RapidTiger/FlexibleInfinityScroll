import {useEffect, useRef, useState} from "react";
import _ from "lodash";

type ScrollPagingHookType<T> = {
	list: T[]
	padding?: number
}

export type ItemOffsetType = {
	top: number
	bot: number
	visible: number
}

export const uesScrollPaging = <T, >({list, padding = 200}: ScrollPagingHookType<T>) => {
	const containerElementRef = useRef<HTMLElement>()
	const wrapElementRef = useRef<HTMLElement>()
	const itemElementRef = useRef<HTMLElement[]>([])
	const moreElementRef = useRef<HTMLElement>();
	const listPrevRef = useRef<T[]>([]);

	const visibleFirstTopRef = useRef(-1)
	const visibleLastBotRef = useRef(-1)

	const [itemOffset, setItemOffset] = useState<ItemOffsetType[]>([])
	const [listTrigger, setListTrigger] = useState(0)
	const [scrollTrigger, setScrollTrigger] = useState(0)
	const [minHeight, setMinHeight] = useState(0)
	const [paddingTop, setPaddingTop] = useState(0)
	const [fillHeight, setFillHeight] = useState(0)
	const [end, setEnd] = useState(false)

	useEffect(() => {
		if (!containerElementRef.current) {
			containerElementRef.current = document.querySelector('html') || document.body
		}

		let throttle = false
		let timeout: NodeJS.Timeout

		const resetOffsetAct = () => {
			if (throttle && timeout) clearTimeout(timeout);
			throttle = true
			timeout = setTimeout(reset, 500);
		};
		window.addEventListener('resize', resetOffsetAct)

		return () => {
			window.removeEventListener('resize', resetOffsetAct)
		}
	}, []);

	useEffect(() => {
		if (listPrevRef.current.length === list.length && !_.isEqual(listPrevRef.current, list)) {
			for (let i = 0; i < listPrevRef.current.length; i++) {
				if (!_.isEqual(listPrevRef.current[i], list[i])) {
					setItemOffset(v => v.slice(0, i))
					setFillHeight(0)
					break
				}
			}
			listPrevRef.current = _.cloneDeep(list)
			setListTrigger(v => ++v)
		} else {
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
		}
	}, [list, listTrigger])

	useEffect(() => {
		scrollEvent(true)
		listPrevRef.current = _.cloneDeep(list)
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
				const b = itemOffset.length === list.length;
				setItemOffset(v1 => v1.map(v2 => {
					v2.visible = scrollTop - padding <= v2.bot && scrollBot + padding + paddingY >= v2.top ? 1 : 0
					if (v2.visible === 1 && b) {
						visibleLastBotRef.current = v2.bot
						setFillHeight(Math.max(minHeight - (v2.bot - offsetTop), 0))
						if (first) {
							visibleFirstTopRef.current = v2.top
							setPaddingTop(v2.top - warpTop)
							first = !first
						}
					}
					return v2
				}))
			}
		}
	}

	const reset = () => {
		setItemOffset([])
		setListTrigger(0)
		setScrollTrigger(0)
		setMinHeight(0)
		setPaddingTop(0)
		setFillHeight(0)
		useState(false)
	}

	return {
		container: {scrollEvent, containerElementRef},
		wrap: {wrapElementRef, minHeight, paddingTop},
		item: {list, itemOffset, itemElementRef, fillHeight, end},
		more: {moreElementRef, end},
		setEnd: () => setEnd(true),
		reset
	}
}