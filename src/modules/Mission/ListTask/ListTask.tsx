import React from 'react'

import { TaskItem } from '@interfaces/task.interface'
import { TaskItemList } from '../TaskItemList'
import { TaskSkeleton } from '../TaskSkeleton'
import useGetTask from '@hooks/queries/useGetTask'

interface ListTaskProps {
}

const ListTask: React.FC<ListTaskProps> = () => {
  const {data, isLoading} = useGetTask()
  // <div>
  //     <h3 className="text-lg font-semibold mb-4 text-[#1E56F6]">Your Tasks</h3>
  //     <div className="space-y-4">
  //       {tasks.map((task) => (
  //         <TaskItem key={task.id} {...task} refetchData={fetchTasks} />
  //       ))}
  //     </div>
  //   </div>
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-[#1E56F6]">Your Tasks</h3>
      {isLoading && <TaskSkeleton keyName='list-task' size={3} />}
      {!isLoading && data && data?.data.length > 0 && data?.data.map((task: TaskItem) => <TaskItemList task={task} key={task.id} />)}
    </div>
  )
}

export default ListTask