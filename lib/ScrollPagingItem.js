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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollPagingItem = void 0;
var react_1 = require("react");
var ScrollPagingItem = function (_a) {
    var _b = _a.list, list = _b === void 0 ? [] : _b, itemOffset = _a.itemOffset, _c = _a.as, as = _c === void 0 ? 'div' : _c, children = _a.children, itemElementRef = _a.itemElementRef, fillHeight = _a.fillHeight, other = __rest(_a, ["list", "itemOffset", "as", "children", "itemElementRef", "fillHeight"]);
    var Tag = as;
    return (react_1.default.createElement(react_1.default.Fragment, null, list.map(function (v, i) {
        var _a;
        var itemOffsetType = itemOffset[i];
        return (!itemOffsetType || itemOffsetType.visible > 0) &&
            react_1.default.createElement(react_1.Fragment, { key: i },
                react_1.default.createElement(Tag, __assign({}, other, { ref: function (r) {
                        itemElementRef.current[i] = r;
                        (other === null || other === void 0 ? void 0 : other.ref) && other.ref(r);
                    }, index: i }), children(v, i)),
                ((itemOffsetType === null || itemOffsetType === void 0 ? void 0 : itemOffsetType.visible) === 1) && !((_a = itemOffset === null || itemOffset === void 0 ? void 0 : itemOffset[i + 1]) === null || _a === void 0 ? void 0 : _a.visible) && react_1.default.createElement("div", { style: { height: fillHeight } }));
    })));
};
exports.ScrollPagingItem = ScrollPagingItem;
