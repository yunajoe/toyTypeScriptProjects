// AddTodo
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

function setup(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe("<App>", () => {
  // 추가 버튼 비활성화 확인
  it("inactivate addButton", () => {
    render(<App />);
    // addTodo 버튼을 선택
    const addTodoButton = screen.getByRole("button", {
      name: /AddTodo/i,
    });
    expect(addTodoButton).toBeInTheDocument();
    expect(addTodoButton).toBeDisabled();
  });

  // 추가 버튼 활성화 확인
  it("active addButton", async () => {
    // const user = userEvent.setup();
    const { user } = setup(<App />);
    const addInput = screen.getByRole("textbox", {
      name: /add todo input/i,
    });
    expect(addInput).toBeInTheDocument();
    await user.type(addInput, "누워있기");
    expect(addInput).toHaveValue("누워있기");

    const addTodoButton = screen.getByRole("button", {
      name: /AddTodo/i,
    });
    expect(addTodoButton).toBeInTheDocument();
    expect(addTodoButton).toBeEnabled();
  });

  // 추가 버튼 클릭후, 인풋에 있는 value, incompleted, 삭제하기 편집하기 버튼이 화면에 나타나는지 확인
  it("added two inputs value, and check the length", async () => {
    const { user } = setup(<App />);
    const addInput = screen.getByRole("textbox", {
      name: /add todo input/i,
    }) as HTMLInputElement;
    const addTodoButton = screen.getByRole("button", {
      name: /AddTodo/i,
    });

    // 첫번째 인풋
    await user.type(addInput, "apple");
    expect(addInput.value).toBe("apple");
    await user.click(addTodoButton);
    expect(addInput.value).toBe("");

    // 두번째 인풋
    await user.type(addInput, "banana");
    expect(addInput.value).toBe("banana");
    await user.click(addTodoButton);
    expect(addInput.value).toBe("");

    // list 길이 확인하기
    const items = screen.getAllByTestId("list-item");
    expect(items.length).toEqual(2);
  });

  // 삭제하기 버튼
  it("deleteButton activates ", async () => {
    const { user } = setup(<App />);

    // addTodo 버튼을 선택
    const addInput = screen.getByRole("textbox", {
      name: /add todo input/i,
    }) as HTMLInputElement;
    const addTodoButton = screen.getByRole("button", {
      name: /AddTodo/i,
    });

    await user.type(addInput, "apple");
    await user.click(addTodoButton);

    await user.type(addInput, "banana");
    await user.click(addTodoButton);

    const deleteButtons = screen.getAllByRole("button", {
      name: /삭제하기/i,
    });

    await user.click(deleteButtons[1]); //  바나나의 삭제 버튼 누르기

    const itemNames = screen.getAllByTestId("item-name");
    const appleItem = itemNames.find((item) => item.textContent === "apple");
    expect(appleItem).toBeInTheDocument(); // Ensure it exists in the document
    expect(appleItem?.textContent).toBe("apple"); // Check the text content
  });

  // 편집하기 버튼
  it("editButton and values.. ", async () => {
    const { user } = setup(<App />);

    // addTodo 버튼을 선택
    const addInput = screen.getByRole("textbox", {
      name: /add todo input/i,
    }) as HTMLInputElement;
    const addTodoButton = screen.getByRole("button", {
      name: /AddTodo/i,
    });

    await user.type(addInput, "apple");
    await user.click(addTodoButton);

    await user.type(addInput, "banana");
    await user.click(addTodoButton);

    const editButtons = screen.getAllByRole("button", {
      name: /편집하기/i,
    });

    // // apple의 편집하기 버튼을 클릭
    await user.click(editButtons[0]);

    let editInput = screen.getByRole("textbox", {
      name: /edit todo input/i,
    });
    await user.type(editInput, "tomato");
    expect(editInput).toHaveValue("tomato");

    await user.click(editButtons[1]);
    editInput = screen.getByRole("textbox", {
      name: /edit todo input/i,
    });
  });

  it("editButton and cancleButton ", async () => {
    const { user } = setup(<App />);

    // addTodo 버튼을 선택
    const addInput = screen.getByRole("textbox", {
      name: /add todo input/i,
    }) as HTMLInputElement;
    const addTodoButton = screen.getByRole("button", {
      name: /AddTodo/i,
    });

    await user.type(addInput, "apple");
    await user.click(addTodoButton);

    await user.type(addInput, "banana");
    await user.click(addTodoButton);

    const editButtons = screen.getAllByRole("button", {
      name: /편집하기/i,
    });

    // apple의 편집하기 버튼을 클릭
    await user.click(editButtons[0]);

    const editInput = screen.getByRole("textbox", {
      name: /edit todo input/i,
    });
    expect(editInput).toHaveAttribute("placeholder", "apple");

    const cancelButton = screen.getByRole("button", {
      name: /취소하기/i,
    });

    await user.click(cancelButton);
    expect(editInput).not.toBeInTheDocument(); // Check that the input field is not present
  });
  it("editButton and saveButton ", async () => {
    const { user } = setup(<App />);

    // addTodo 버튼을 선택
    const addInput = screen.getByRole("textbox", {
      name: /add todo input/i,
    }) as HTMLInputElement;
    const addTodoButton = screen.getByRole("button", {
      name: /AddTodo/i,
    });

    await user.type(addInput, "apple");
    await user.click(addTodoButton);

    await user.type(addInput, "banana");
    await user.click(addTodoButton);

    const editButtons = screen.getAllByRole("button", {
      name: /편집하기/i,
    });

    // apple의 편집하기 버튼을 클릭
    await user.click(editButtons[0]);

    const editInput = screen.getByRole("textbox", {
      name: /edit todo input/i,
    });
    await user.type(editInput, "tomato");
    expect(editInput).toHaveValue("tomato");

    const saveButton = screen.getByRole("button", {
      name: /저장하기/i,
    });

    await user.click(saveButton);
    const items = screen.getAllByTestId("list-item");
    expect(items[0]).toHaveTextContent("tomato");
  });

  it("incomplete button ", async () => {
    const { user } = setup(<App />);

    // addTodo 버튼을 선택
    const addInput = screen.getByRole("textbox", {
      name: /add todo input/i,
    }) as HTMLInputElement;
    const addTodoButton = screen.getByRole("button", {
      name: /AddTodo/i,
    });

    await user.type(addInput, "apple");
    await user.click(addTodoButton);

    await user.type(addInput, "banana");
    await user.click(addTodoButton);

    const inCompletedButtons = screen.getAllByRole("button", {
      name: /incompleted/i,
    });

    await user.click(inCompletedButtons[0]);
    const itemNames = screen.getAllByTestId("item-name");
    expect(itemNames[0]).toHaveStyle("textDecoration:line-through");
    expect(itemNames[1]).not.toHaveStyle("textDecoration:line-through");
  });
});
