import { useState } from "react"


const useSnackBar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')

  const onClose = () => {
    setOpen(false);
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setOpen(true)
  }

  return {
    open,
    message,
    onClose,
    showMessage
  }
}

export default useSnackBar;