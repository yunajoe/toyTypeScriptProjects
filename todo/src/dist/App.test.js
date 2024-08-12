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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// AddTodo
require("@testing-library/jest-dom");
var react_1 = require("@testing-library/react");
var user_event_1 = require("@testing-library/user-event");
var App_1 = require("./App");
function setup(jsx) {
    return __assign({ user: user_event_1["default"].setup() }, react_1.render(jsx));
}
describe("<App>", function () {
    // 추가 버튼 비활성화 확인
    it("inactivate addButton", function () {
        react_1.render(React.createElement(App_1["default"], null));
        // addTodo 버튼을 선택
        var addTodoButton = react_1.screen.getByRole("button", {
            name: /AddTodo/i
        });
        expect(addTodoButton).toBeInTheDocument();
        expect(addTodoButton).toBeDisabled();
    });
    // 추가 버튼 활성화 확인
    it("active addButton", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, addInput, addTodoButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = setup(React.createElement(App_1["default"], null)).user;
                    addInput = react_1.screen.getByRole("textbox", {
                        name: /add todo input/i
                    });
                    expect(addInput).toBeInTheDocument();
                    return [4 /*yield*/, user.type(addInput, "누워있기")];
                case 1:
                    _a.sent();
                    expect(addInput).toHaveValue("누워있기");
                    addTodoButton = react_1.screen.getByRole("button", {
                        name: /AddTodo/i
                    });
                    expect(addTodoButton).toBeInTheDocument();
                    expect(addTodoButton).toBeEnabled();
                    return [2 /*return*/];
            }
        });
    }); });
    // 추가 버튼 클릭후, 인풋에 있는 value, incompleted, 삭제하기 편집하기 버튼이 화면에 나타나는지 확인
    it("added two inputs value, and check the length", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, addInput, addTodoButton, items;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = setup(React.createElement(App_1["default"], null)).user;
                    addInput = react_1.screen.getByRole("textbox", {
                        name: /add todo input/i
                    });
                    addTodoButton = react_1.screen.getByRole("button", {
                        name: /AddTodo/i
                    });
                    // 첫번째 인풋
                    return [4 /*yield*/, user.type(addInput, "apple")];
                case 1:
                    // 첫번째 인풋
                    _a.sent();
                    expect(addInput.value).toBe("apple");
                    return [4 /*yield*/, user.click(addTodoButton)];
                case 2:
                    _a.sent();
                    expect(addInput.value).toBe("");
                    // 두번째 인풋
                    return [4 /*yield*/, user.type(addInput, "banana")];
                case 3:
                    // 두번째 인풋
                    _a.sent();
                    expect(addInput.value).toBe("banana");
                    return [4 /*yield*/, user.click(addTodoButton)];
                case 4:
                    _a.sent();
                    expect(addInput.value).toBe("");
                    items = react_1.screen.getAllByTestId("list-item");
                    expect(items.length).toEqual(2);
                    return [2 /*return*/];
            }
        });
    }); });
    // 삭제하기 버튼
    it("deleteButton activates ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, addInput, addTodoButton, deleteButtons, itemNames, appleItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = setup(React.createElement(App_1["default"], null)).user;
                    addInput = react_1.screen.getByRole("textbox", {
                        name: /add todo input/i
                    });
                    addTodoButton = react_1.screen.getByRole("button", {
                        name: /AddTodo/i
                    });
                    return [4 /*yield*/, user.type(addInput, "apple")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, user.click(addTodoButton)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, user.type(addInput, "banana")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, user.click(addTodoButton)];
                case 4:
                    _a.sent();
                    deleteButtons = react_1.screen.getAllByRole("button", {
                        name: /삭제하기/i
                    });
                    return [4 /*yield*/, user.click(deleteButtons[1])];
                case 5:
                    _a.sent(); //  바나나의 삭제 버튼 누르기
                    itemNames = react_1.screen.getAllByTestId("item-name");
                    appleItem = itemNames.find(function (item) { return item.textContent === "apple"; });
                    expect(appleItem).toBeInTheDocument(); // Ensure it exists in the document
                    expect(appleItem === null || appleItem === void 0 ? void 0 : appleItem.textContent).toBe("apple"); // Check the text content
                    return [2 /*return*/];
            }
        });
    }); });
    // 편집하기 버튼
    it("editButton and values.. ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, addInput, addTodoButton, editButtons, editInput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = setup(React.createElement(App_1["default"], null)).user;
                    addInput = react_1.screen.getByRole("textbox", {
                        name: /add todo input/i
                    });
                    addTodoButton = react_1.screen.getByRole("button", {
                        name: /AddTodo/i
                    });
                    return [4 /*yield*/, user.type(addInput, "apple")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, user.click(addTodoButton)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, user.type(addInput, "banana")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, user.click(addTodoButton)];
                case 4:
                    _a.sent();
                    editButtons = react_1.screen.getAllByRole("button", {
                        name: /편집하기/i
                    });
                    // // apple의 편집하기 버튼을 클릭
                    return [4 /*yield*/, user.click(editButtons[0])];
                case 5:
                    // // apple의 편집하기 버튼을 클릭
                    _a.sent();
                    editInput = react_1.screen.getByRole("textbox", {
                        name: /edit todo input/i
                    });
                    return [4 /*yield*/, user.type(editInput, "tomato")];
                case 6:
                    _a.sent();
                    expect(editInput).toHaveValue("tomato");
                    return [4 /*yield*/, user.click(editButtons[1])];
                case 7:
                    _a.sent();
                    editInput = react_1.screen.getByRole("textbox", {
                        name: /edit todo input/i
                    });
                    expect(editInput).toHaveValue("");
                    return [2 /*return*/];
            }
        });
    }); });
    it("editButton and cancleButton ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, addInput, addTodoButton, editButtons, editInput, cancelButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = setup(React.createElement(App_1["default"], null)).user;
                    addInput = react_1.screen.getByRole("textbox", {
                        name: /add todo input/i
                    });
                    addTodoButton = react_1.screen.getByRole("button", {
                        name: /AddTodo/i
                    });
                    return [4 /*yield*/, user.type(addInput, "apple")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, user.click(addTodoButton)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, user.type(addInput, "banana")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, user.click(addTodoButton)];
                case 4:
                    _a.sent();
                    editButtons = react_1.screen.getAllByRole("button", {
                        name: /편집하기/i
                    });
                    // apple의 편집하기 버튼을 클릭
                    return [4 /*yield*/, user.click(editButtons[0])];
                case 5:
                    // apple의 편집하기 버튼을 클릭
                    _a.sent();
                    editInput = react_1.screen.getByRole("textbox", {
                        name: /edit todo input/i
                    });
                    expect(editInput).toHaveAttribute("placeholder", "apple");
                    cancelButton = react_1.screen.getByRole("button", {
                        name: /취소하기/i
                    });
                    return [4 /*yield*/, user.click(cancelButton)];
                case 6:
                    _a.sent();
                    expect(editInput).not.toBeInTheDocument(); // Check that the input field is not present
                    return [2 /*return*/];
            }
        });
    }); });
    it("editButton and saveButton ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, addInput, addTodoButton, editButtons, editInput, saveButton, items;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = setup(React.createElement(App_1["default"], null)).user;
                    addInput = react_1.screen.getByRole("textbox", {
                        name: /add todo input/i
                    });
                    addTodoButton = react_1.screen.getByRole("button", {
                        name: /AddTodo/i
                    });
                    return [4 /*yield*/, user.type(addInput, "apple")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, user.click(addTodoButton)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, user.type(addInput, "banana")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, user.click(addTodoButton)];
                case 4:
                    _a.sent();
                    editButtons = react_1.screen.getAllByRole("button", {
                        name: /편집하기/i
                    });
                    // apple의 편집하기 버튼을 클릭
                    return [4 /*yield*/, user.click(editButtons[0])];
                case 5:
                    // apple의 편집하기 버튼을 클릭
                    _a.sent();
                    editInput = react_1.screen.getByRole("textbox", {
                        name: /edit todo input/i
                    });
                    return [4 /*yield*/, user.type(editInput, "tomato")];
                case 6:
                    _a.sent();
                    expect(editInput).toHaveValue("tomato");
                    saveButton = react_1.screen.getByRole("button", {
                        name: /저장하기/i
                    });
                    return [4 /*yield*/, user.click(saveButton)];
                case 7:
                    _a.sent();
                    items = react_1.screen.getAllByTestId("list-item");
                    expect(items[0]).toHaveTextContent("tomato");
                    return [2 /*return*/];
            }
        });
    }); });
    it("incomplete button ", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, addInput, addTodoButton, inCompletedButtons, itemNames;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = setup(React.createElement(App_1["default"], null)).user;
                    addInput = react_1.screen.getByRole("textbox", {
                        name: /add todo input/i
                    });
                    addTodoButton = react_1.screen.getByRole("button", {
                        name: /AddTodo/i
                    });
                    return [4 /*yield*/, user.type(addInput, "apple")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, user.click(addTodoButton)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, user.type(addInput, "banana")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, user.click(addTodoButton)];
                case 4:
                    _a.sent();
                    inCompletedButtons = react_1.screen.getAllByRole("button", {
                        name: /incompleted/i
                    });
                    return [4 /*yield*/, user.click(inCompletedButtons[0])];
                case 5:
                    _a.sent();
                    itemNames = react_1.screen.getAllByTestId("item-name");
                    expect(itemNames[0]).toHaveStyle("textDecoration:line-through");
                    expect(itemNames[1]).not.toHaveStyle("textDecoration:line-through");
                    return [2 /*return*/];
            }
        });
    }); });
});
