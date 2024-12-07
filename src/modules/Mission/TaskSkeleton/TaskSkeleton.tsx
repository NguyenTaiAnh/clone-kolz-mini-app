import { Skeleton } from '@components/ui/skeleton'

interface TaskSkeletonProps {
  size: number
  keyName: string
}
const TaskSkeleton: React.FC<TaskSkeletonProps> = ({ size, keyName }) => {
  return (
    <>
      {Array.from({ length: size }).map((_, index) => {
        return (
          <div
            key={`${keyName}-${index}`}
            className='bg-[#272a2fcb] rounded-2xl p-5 leading-7 flex items-center space-x-4 px-4 my-4'
          >
            <Skeleton className='w-10 h-10' />
            <div className='space-y-2'>
              <Skeleton className='w-[120px] h-4' />
              <div className='flex items-center gap-2'>
                <Skeleton className='w-2 h-2 rounded-full' />
                <Skeleton className='w-5 h-5 rounded-full' />
                <Skeleton className='w-[110px] h-3 rounded-full' />
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TaskSkeleton
