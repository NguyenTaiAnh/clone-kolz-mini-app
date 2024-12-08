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
            className='bg-white  rounded-lg p-4 leading-3 flex justify-between items-center space-x-4 px-4 mb-5'
          >
            <div className='flex items-center gap-2'>
              <Skeleton className='w-10 h-[42px]' />
              <div className='flex flex-col justify-center gap-2'>
                <Skeleton className='w-[110px] h-5 rounded-full' />
                <Skeleton className='w-3 h-3 rounded-full' />
              </div>
            </div>
            <Skeleton className='w-14 h-8 rounded-3xl' />
          </div>
        )
      })}
    </>
  )
}

export default TaskSkeleton
