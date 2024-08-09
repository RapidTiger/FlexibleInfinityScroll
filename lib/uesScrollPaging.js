"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uesScrollPaging = void 0;
var react_1 = require("react");
var uesScrollPaging = function (_a) {
    var list = _a.list, _b = _a.padding, padding = _b === void 0 ? 200 : _b;
    var containerElementRef = (0, react_1.useRef)();
    var wrapElementRef = (0, react_1.useRef)();
    var itemElementRef = (0, react_1.useRef)([]);
    var moreElementRef = (0, react_1.useRef)();
    var visibleFirstTopRef = (0, react_1.useRef)(-1);
    var visibleLastBotRef = (0, react_1.useRef)(-1);
    var _c = (0, react_1.useState)([]), itemOffset = _c[0], setItemOffset = _c[1];
    var _d = (0, react_1.useState)(0), scrollTrigger = _d[0], setScrollTrigger = _d[1];
    var _e = (0, react_1.useState)(0), minHeight = _e[0], setMinHeight = _e[1];
    var _f = (0, react_1.useState)(0), paddingTop = _f[0], setPaddingTop = _f[1];
    var _g = (0, react_1.useState)(0), fillHeight = _g[0], setFillHeight = _g[1];
    (0, react_1.useEffect)(function () {
        var _a;
        if (wrapElementRef.current) {
            if (!containerElementRef.current) {
                containerElementRef.current = document.querySelector('html') || document.body;
                window.addEventListener('scroll', function () { return scrollEvent(); });
            }
            var scrollHeight = containerElementRef.current.scrollHeight;
            var offsetHeight = containerElementRef.current.offsetHeight;
            if (scrollHeight > offsetHeight) {
                var computedStyle = getComputedStyle(containerElementRef.current);
                var paddingTop_1 = parseInt(computedStyle.getPropertyValue('padding-top'));
                var paddingBot = parseInt(computedStyle.getPropertyValue('padding-bottom'));
                var containerHeight = scrollHeight - (paddingTop_1 + paddingBot);
                var moreHeight = ((_a = moreElementRef.current) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 0;
                setMinHeight(containerHeight - moreHeight);
            }
            else {
                setMinHeight(0);
            }
        }
        setItemOffset(function (v) {
            if (containerElementRef.current) {
                itemElementRef.current.forEach(function (e, i) {
                    if (e && !v[i]) {
                        var top_1 = e.offsetTop;
                        var bot = top_1 + e.offsetHeight;
                        v[i] = { top: top_1, bot: bot, visible: 2 };
                    }
                });
            }
            return v;
        });
        setScrollTrigger(function (v) { return ++v; });
    }, [list]);
    (0, react_1.useEffect)(function () {
        scrollEvent(true);
    }, [scrollTrigger]);
    var scrollEvent = function (isRender) {
        if (isRender === void 0) { isRender = false; }
        if (containerElementRef.current && wrapElementRef.current) {
            var computedStyle = getComputedStyle(containerElementRef.current);
            var paddingTop_2 = parseInt(computedStyle.getPropertyValue('padding-top'));
            var paddingBot = parseInt(computedStyle.getPropertyValue('padding-bottom'));
            var offsetTop = containerElementRef.current.offsetTop;
            var scrollTop_1 = containerElementRef.current.scrollTop + offsetTop;
            var warpTop_1 = wrapElementRef.current.offsetTop;
            var scrollBot_1 = scrollTop_1 + containerElementRef.current.offsetHeight - (paddingTop_2 + paddingBot);
            var firstTop = scrollTop_1 < visibleFirstTopRef.current;
            var lastBot = scrollBot_1 > visibleLastBotRef.current;
            if (isRender || visibleFirstTopRef.current < 0 || firstTop || lastBot) {
                var first_1 = true;
                setItemOffset(function (v) { return v.map(function (v) {
                    v.visible = scrollTop_1 - padding <= v.bot && scrollBot_1 + padding >= v.top ? 1 : 0;
                    if (v.visible === 1) {
                        visibleLastBotRef.current = v.bot;
                        setFillHeight(Math.max(minHeight - v.bot, 0));
                        if (first_1) {
                            visibleFirstTopRef.current = v.top;
                            setPaddingTop(v.top - warpTop_1);
                            first_1 = !first_1;
                        }
                    }
                    return v;
                }); });
            }
        }
    };
    return {
        container: { scrollEvent: scrollEvent, containerElementRef: containerElementRef },
        wrap: { wrapElementRef: wrapElementRef, minHeight: minHeight, paddingTop: paddingTop },
        item: { list: list, itemOffset: itemOffset, itemElementRef: itemElementRef, fillHeight: fillHeight },
        more: { moreElementRef: moreElementRef }
    };
};
exports.uesScrollPaging = uesScrollPaging;
