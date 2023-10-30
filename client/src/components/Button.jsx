import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { handleShowAdd } from "../store/slices/modalsSlice";

export default function MyButton({ text, color }) {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        className="buttonCentered"
        variant={color}
        onClick={() => dispatch(handleShowAdd())}
      >
        {text}
      </Button>
    </>
  );
}
