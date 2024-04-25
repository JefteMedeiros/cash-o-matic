import { Trash } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { useEffect, useState } from 'react'
import { PopoverClose } from '@radix-ui/react-popover'
import { Button } from './ui/button'
import { useExpenseStore } from '@/store/expense-store'

interface Props {
  id: string
}

export function DeleteExpense({ id }: Props) {
  const { handleDeleteExpense, totalExpenses } = useExpenseStore()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [totalExpenses])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Trash className="text-purple-400" size={16} />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-fit p-1 bg-gray-900 border-purple-400 text-white"
      >
        <span className="px-2 py-1.5 text-sm font-semibold">Tem certeza?</span>
        <div className="-mx-1 my-1 h-px bg-gray-700" />
        <div className="flex items-center gap-2 px-2 py-1.5">
          <PopoverClose
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            asChild
          >
            <Button
              className="h-[28px] border-purple-400 border hover:text-white"
              variant="outline"
            >
              Não
            </Button>
          </PopoverClose>
          <Button className="h-[28px]" onClick={() => handleDeleteExpense(id)}>
            Sim
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
