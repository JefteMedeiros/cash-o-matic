'use client'

import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'

interface Props {
  text?: string
}

export function SubmitButton({ text = 'Enviar' }: Props) {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending}
      aria-disabled={pending}
      className="w-full"
      type="submit"
    >
      {text}
      {pending && <Loader className="animate-spin w-4 h-4 ml-2" />}
    </Button>
  )
}
