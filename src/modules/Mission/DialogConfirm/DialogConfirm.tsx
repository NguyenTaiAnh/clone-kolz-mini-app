import React from 'react'

import { Dialog, DialogContent, DialogDescription } from '@components/ui/dialog'
import { TaskItem } from '@interfaces/task.interface'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from '@components/ui/button'

interface DialogConfirmProps {
  task: TaskItem
  isShow: boolean
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>
  onClickAction: (id: string) => void
  urlSocialMapping: Record<number, string>
  isLoading: boolean
}

const DialogConfirm: React.FC<DialogConfirmProps> = ({
  task,
  isShow,
  setIsShow,
  onClickAction,
  urlSocialMapping,
  isLoading
}) => {
  return (
    <Dialog
      open={isShow}
      onOpenChange={(open: boolean) => {
        console.log('check is show: ', isShow)
        if (!isLoading) setIsShow(open)
      }}
    >
      <DialogContent
        aria-describedby=''
        className='rounded-xl bg-[#272a2f] w-[90vw] text-white border-none'
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <div className='flex flex-col gap-3'>
          <DialogTitle className='text-center font-semibold'>Open Link</DialogTitle>
          {task?.link ? (
            <DialogDescription className='text-center text-gray-200'>
              Do you want to open "{task.link}"?
            </DialogDescription>
          ) : (
            <DialogDescription className='text-center text-gray-200'>
              Do you want to open <b>{urlSocialMapping[task.social_type_id] + task.social_info || ''}</b>?
            </DialogDescription>
          )}
          <div className='w-full flex items-center justify-center gap-10 pt-2'>
            <Button
              className='text-[#7dc5db] h-auto'
              variant={'link'}
              size='sm'
              disabled={isLoading}
              onClick={() => setIsShow(false)}
            >
              Cancel
            </Button>
            <Button
              className='text-[#7dc5db] h-auto font-bold'
              variant={'link'}
              size='sm'
              onClick={() => onClickAction(task.id)}
              // loading={isLoading}
              disabled={isLoading}
            >
              Open
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogConfirm
