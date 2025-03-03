"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColaToolbar = void 0;
var lit_1 = require("lit");
var decorators_js_1 = require("lit/decorators.js");
var ColaToolbar = function () {
    var _classDecorators = [(0, decorators_js_1.customElement)('cola-toolbar')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = lit_1.LitElement;
    var _canInsertRow_decorators;
    var _canInsertRow_initializers = [];
    var _canInsertRow_extraInitializers = [];
    var _canHideColumns_decorators;
    var _canHideColumns_initializers = [];
    var _canHideColumns_extraInitializers = [];
    var _canFilter_decorators;
    var _canFilter_initializers = [];
    var _canFilter_extraInitializers = [];
    var _canGroup_decorators;
    var _canGroup_initializers = [];
    var _canGroup_extraInitializers = [];
    var _canSort_decorators;
    var _canSort_initializers = [];
    var _canSort_extraInitializers = [];
    var _canAdjustRowHeight_decorators;
    var _canAdjustRowHeight_initializers = [];
    var _canAdjustRowHeight_extraInitializers = [];
    var _canShare_decorators;
    var _canShare_initializers = [];
    var _canShare_extraInitializers = [];
    var ColaToolbar = _classThis = /** @class */ (function (_super) {
        __extends(ColaToolbar_1, _super);
        function ColaToolbar_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.canInsertRow = __runInitializers(_this, _canInsertRow_initializers, true);
            _this.canHideColumns = (__runInitializers(_this, _canInsertRow_extraInitializers), __runInitializers(_this, _canHideColumns_initializers, true));
            _this.canFilter = (__runInitializers(_this, _canHideColumns_extraInitializers), __runInitializers(_this, _canFilter_initializers, true));
            _this.canGroup = (__runInitializers(_this, _canFilter_extraInitializers), __runInitializers(_this, _canGroup_initializers, true));
            _this.canSort = (__runInitializers(_this, _canGroup_extraInitializers), __runInitializers(_this, _canSort_initializers, true));
            _this.canAdjustRowHeight = (__runInitializers(_this, _canSort_extraInitializers), __runInitializers(_this, _canAdjustRowHeight_initializers, true));
            _this.canShare = (__runInitializers(_this, _canAdjustRowHeight_extraInitializers), __runInitializers(_this, _canShare_initializers, true));
            __runInitializers(_this, _canShare_extraInitializers);
            return _this;
        }
        ColaToolbar_1.prototype.handleInsertRow = function () {
            this.dispatchEvent(new CustomEvent('insert-row'));
        };
        ColaToolbar_1.prototype.handleHideColumn = function () {
            this.dispatchEvent(new CustomEvent('hide-column'));
        };
        ColaToolbar_1.prototype.handleFilter = function () {
            this.dispatchEvent(new CustomEvent('filter'));
        };
        ColaToolbar_1.prototype.handleGroup = function () {
            this.dispatchEvent(new CustomEvent('group'));
        };
        ColaToolbar_1.prototype.handleSort = function () {
            this.dispatchEvent(new CustomEvent('sort'));
        };
        ColaToolbar_1.prototype.handleRowHeight = function () {
            this.dispatchEvent(new CustomEvent('adjust-row-height'));
        };
        ColaToolbar_1.prototype.handleShare = function () {
            this.dispatchEvent(new CustomEvent('share'));
        };
        ColaToolbar_1.prototype.render = function () {
            return (0, lit_1.html)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n      <div class=\"toolbar-group\">\n        ", "\n        ", "\n      </div>\n\n      <div class=\"divider\"></div>\n\n      <div class=\"toolbar-group\">\n        ", "\n        ", "\n        ", "\n      </div>\n\n      <div class=\"divider\"></div>\n\n      <div class=\"toolbar-group\">\n        ", "\n        ", "\n      </div>\n    "], ["\n      <div class=\"toolbar-group\">\n        ", "\n        ", "\n      </div>\n\n      <div class=\"divider\"></div>\n\n      <div class=\"toolbar-group\">\n        ", "\n        ", "\n        ", "\n      </div>\n\n      <div class=\"divider\"></div>\n\n      <div class=\"toolbar-group\">\n        ", "\n        ", "\n      </div>\n    "])), this.canInsertRow ? (0, lit_1.html)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          <button class=\"toolbar-button\" @click=", ">\n            \u63D2\u5165\u884C\n          </button>\n        "], ["\n          <button class=\"toolbar-button\" @click=", ">\n            \u63D2\u5165\u884C\n          </button>\n        "])), this.handleInsertRow) : '', this.canHideColumns ? (0, lit_1.html)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n          <button class=\"toolbar-button\" @click=", ">\n            \u9690\u85CF\u5217\n          </button>\n        "], ["\n          <button class=\"toolbar-button\" @click=", ">\n            \u9690\u85CF\u5217\n          </button>\n        "])), this.handleHideColumn) : '', this.canFilter ? (0, lit_1.html)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n          <button class=\"toolbar-button\" @click=", ">\n            \u7B5B\u9009\n          </button>\n        "], ["\n          <button class=\"toolbar-button\" @click=", ">\n            \u7B5B\u9009\n          </button>\n        "])), this.handleFilter) : '', this.canGroup ? (0, lit_1.html)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n          <button class=\"toolbar-button\" @click=", ">\n            \u5206\u7EC4\n          </button>\n        "], ["\n          <button class=\"toolbar-button\" @click=", ">\n            \u5206\u7EC4\n          </button>\n        "])), this.handleGroup) : '', this.canSort ? (0, lit_1.html)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n          <button class=\"toolbar-button\" @click=", ">\n            \u6392\u5E8F\n          </button>\n        "], ["\n          <button class=\"toolbar-button\" @click=", ">\n            \u6392\u5E8F\n          </button>\n        "])), this.handleSort) : '', this.canAdjustRowHeight ? (0, lit_1.html)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n          <button class=\"toolbar-button\" @click=", ">\n            \u8C03\u6574\u884C\u9AD8\n          </button>\n        "], ["\n          <button class=\"toolbar-button\" @click=", ">\n            \u8C03\u6574\u884C\u9AD8\n          </button>\n        "])), this.handleRowHeight) : '', this.canShare ? (0, lit_1.html)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n          <button class=\"toolbar-button\" @click=", ">\n            \u5206\u4EAB\n          </button>\n        "], ["\n          <button class=\"toolbar-button\" @click=", ">\n            \u5206\u4EAB\n          </button>\n        "])), this.handleShare) : '');
        };
        return ColaToolbar_1;
    }(_classSuper));
    __setFunctionName(_classThis, "ColaToolbar");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _canInsertRow_decorators = [(0, decorators_js_1.property)({ type: Boolean })];
        _canHideColumns_decorators = [(0, decorators_js_1.property)({ type: Boolean })];
        _canFilter_decorators = [(0, decorators_js_1.property)({ type: Boolean })];
        _canGroup_decorators = [(0, decorators_js_1.property)({ type: Boolean })];
        _canSort_decorators = [(0, decorators_js_1.property)({ type: Boolean })];
        _canAdjustRowHeight_decorators = [(0, decorators_js_1.property)({ type: Boolean })];
        _canShare_decorators = [(0, decorators_js_1.property)({ type: Boolean })];
        __esDecorate(null, null, _canInsertRow_decorators, { kind: "field", name: "canInsertRow", static: false, private: false, access: { has: function (obj) { return "canInsertRow" in obj; }, get: function (obj) { return obj.canInsertRow; }, set: function (obj, value) { obj.canInsertRow = value; } }, metadata: _metadata }, _canInsertRow_initializers, _canInsertRow_extraInitializers);
        __esDecorate(null, null, _canHideColumns_decorators, { kind: "field", name: "canHideColumns", static: false, private: false, access: { has: function (obj) { return "canHideColumns" in obj; }, get: function (obj) { return obj.canHideColumns; }, set: function (obj, value) { obj.canHideColumns = value; } }, metadata: _metadata }, _canHideColumns_initializers, _canHideColumns_extraInitializers);
        __esDecorate(null, null, _canFilter_decorators, { kind: "field", name: "canFilter", static: false, private: false, access: { has: function (obj) { return "canFilter" in obj; }, get: function (obj) { return obj.canFilter; }, set: function (obj, value) { obj.canFilter = value; } }, metadata: _metadata }, _canFilter_initializers, _canFilter_extraInitializers);
        __esDecorate(null, null, _canGroup_decorators, { kind: "field", name: "canGroup", static: false, private: false, access: { has: function (obj) { return "canGroup" in obj; }, get: function (obj) { return obj.canGroup; }, set: function (obj, value) { obj.canGroup = value; } }, metadata: _metadata }, _canGroup_initializers, _canGroup_extraInitializers);
        __esDecorate(null, null, _canSort_decorators, { kind: "field", name: "canSort", static: false, private: false, access: { has: function (obj) { return "canSort" in obj; }, get: function (obj) { return obj.canSort; }, set: function (obj, value) { obj.canSort = value; } }, metadata: _metadata }, _canSort_initializers, _canSort_extraInitializers);
        __esDecorate(null, null, _canAdjustRowHeight_decorators, { kind: "field", name: "canAdjustRowHeight", static: false, private: false, access: { has: function (obj) { return "canAdjustRowHeight" in obj; }, get: function (obj) { return obj.canAdjustRowHeight; }, set: function (obj, value) { obj.canAdjustRowHeight = value; } }, metadata: _metadata }, _canAdjustRowHeight_initializers, _canAdjustRowHeight_extraInitializers);
        __esDecorate(null, null, _canShare_decorators, { kind: "field", name: "canShare", static: false, private: false, access: { has: function (obj) { return "canShare" in obj; }, get: function (obj) { return obj.canShare; }, set: function (obj, value) { obj.canShare = value; } }, metadata: _metadata }, _canShare_initializers, _canShare_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ColaToolbar = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.styles = (0, lit_1.css)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    :host {\n      display: flex;\n      align-items: center;\n      padding: 8px;\n      background: #ffffff;\n      border-bottom: 1px solid #e8e8e8;\n      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;\n    }\n\n    .toolbar-group {\n      display: flex;\n      align-items: center;\n      margin-right: 16px;\n    }\n\n    .toolbar-button {\n      padding: 4px 8px;\n      margin: 0 4px;\n      border: 1px solid #d9d9d9;\n      border-radius: 2px;\n      background: transparent;\n      cursor: pointer;\n      font-size: 14px;\n      color: #595959;\n      display: flex;\n      align-items: center;\n      transition: all 0.3s;\n    }\n\n    .toolbar-button:hover {\n      color: #1890ff;\n      border-color: #1890ff;\n    }\n\n    .divider {\n      width: 1px;\n      height: 24px;\n      background: #e8e8e8;\n      margin: 0 8px;\n    }\n  "], ["\n    :host {\n      display: flex;\n      align-items: center;\n      padding: 8px;\n      background: #ffffff;\n      border-bottom: 1px solid #e8e8e8;\n      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;\n    }\n\n    .toolbar-group {\n      display: flex;\n      align-items: center;\n      margin-right: 16px;\n    }\n\n    .toolbar-button {\n      padding: 4px 8px;\n      margin: 0 4px;\n      border: 1px solid #d9d9d9;\n      border-radius: 2px;\n      background: transparent;\n      cursor: pointer;\n      font-size: 14px;\n      color: #595959;\n      display: flex;\n      align-items: center;\n      transition: all 0.3s;\n    }\n\n    .toolbar-button:hover {\n      color: #1890ff;\n      border-color: #1890ff;\n    }\n\n    .divider {\n      width: 1px;\n      height: 24px;\n      background: #e8e8e8;\n      margin: 0 8px;\n    }\n  "])));
    (function () {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ColaToolbar = _classThis;
}();
exports.ColaToolbar = ColaToolbar;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
