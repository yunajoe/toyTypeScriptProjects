type DeleteButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <button className="text-white bg-blue-500" onClick={onClick}>
      삭제하기
    </button>
  );
}

export default DeleteButton;
