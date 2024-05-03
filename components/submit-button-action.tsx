'use client'

import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'

interface Props {
  id: string
  text?: string
}

export function SubmitButtonAction({ text = 'Enviar', id }: Props) {
  const { pending } = useFormStatus()

  return (
    <Button
      form={id}
      disabled={pending}
      aria-disabled={pending}
      className="w-full flex items-center gap-2"
      type="submit"
    >
      {text}
      {pending && <Loader className="animate-spin w-4 h-4" />}
    </Button>
  )
}
