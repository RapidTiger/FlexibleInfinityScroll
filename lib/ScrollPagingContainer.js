"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollPagingContainer = void 0;
var react_1 = __importDefault(require("react"));
var ScrollPagingContainer = function (_a) {
    var _b = _a.as, as = _b === void 0 ? 'div' : _b, children = _a.children, scrollEvent = _a.scrollEvent, containerElementRef = _a.containerElementRef, other = __rest(_a, ["as", "children", "scrollEvent", "containerElementRef"]);
    var Tag = as;
    return (react_1.default.createElement(Tag, __assign({}, other, { onScroll: function (e) {
            scrollEvent();
            other.onScroll && other.onScroll(e);
        }, ref: function (r) {
            containerElementRef.current = r;
            (other === null || other === void 0 ? void 0 : other.ref) && other.ref(r);
        } }), children));
};
exports.ScrollPagingContainer = ScrollPagingContainer;
