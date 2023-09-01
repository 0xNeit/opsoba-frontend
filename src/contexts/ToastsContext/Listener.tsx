import { ToastContainer } from 'components/Toast'
import { useToast } from '@pancakeswap/uikit'

const ToastListener = () => {
  const { toasts, remove } = useToast()

  const handleRemove = (id: string) => remove(id)

  return <ToastContainer toasts={toasts} onRemove={handleRemove} />
}

export default ToastListener
