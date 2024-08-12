import { Todo } from "../../App";

type EditButtonProps = {
  editOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  saveOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  cancelOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  todo: Todo;
  editInputId: string | null;
};

function EditButton({
  editOnClick,
  saveOnClick,
  cancelOnClick,
  todo,
  editInputId,
}: EditButtonProps) {
  return (
    <div>
      <button
        className="text-white bg-gray-400"
        onClick={editOnClick}
        style={{
          display: todo.id === editInputId ? "none" : "block",
        }}
      >
        편집하기
      </button>
      {editInputId === todo.id && (
        <div className="flex gap-x-3">
          <button className="text-white bg-gray-400" onClick={cancelOnClick}>
            취소하기
          </button>
          <button className="text-white bg-gray-400" onClick={saveOnClick}>
            저장하기
          </button>
        </div>
      )}
    </div>
  );
}

export default EditButton;
