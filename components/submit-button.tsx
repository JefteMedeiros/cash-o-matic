'use client'

import { Button } from './ui/button'
import { Loader } from 'lucide-react'

interface Props {
  isPending: boolean
  text?: string
}

export function SubmitButton({ text = 'Enviar', isPending }: Props) {
  return (
    <Button
      disabled={isPending}
      aria-disabled={isPending}
      className="w-full flex items-center gap-2"
      type="submit"
    >
      {text}
      {isPending && <Loader className="animate-spin w-4 h-4" />}
    </Button>
  )
}
