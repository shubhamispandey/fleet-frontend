import { toast } from "react-toastify";

type ToastType = "info" | "success" | "warning" | "error";

type NotifyProps = {
  message: string;
  type: ToastType;
};

const UseDrawers = () => {
  const notify = ({ message, type }: NotifyProps) => {
    (toast as any)[type](message);
  };

  return { notify };
};

export default UseDrawers;
