import { ModeToggle } from "./ModeToggle"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import TodoList from "./todo-list"
import { useContext } from 'react'
import { DialogDemo } from "./modal"
import { Toaster } from 'sonner';
import { Context } from "../context/index"



function App() {
  const {state, dispatch} = useContext(Context)

  return (
    <div className="max-w-5xl mx-auto">
     <div className="flex items-end">
      <div className="grow flex justify-between items-center p-5 mt-4 rounded-lg bg-gray-100 dark:bg-gray-900">
          <div className="text-3xl font-bold font-sans">Todo app</div>
          <Select onValueChange={(val)=>dispatch({type: 'priority_Filter', payload: val})}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="priority"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">all</SelectItem>
              <SelectItem value="low">low</SelectItem>
              <SelectItem value="medium">medium</SelectItem>
              <SelectItem value="high">high</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(val)=>dispatch({type: 'completed_Filter', payload: val})}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="completed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">all</SelectItem>
              <SelectItem value='Bajarilgan'>Bajarilgan</SelectItem>
              <SelectItem value='bajarilmagan'>bajarilmagan</SelectItem>
            </SelectContent>
          </Select>
          
          <DialogDemo/>

      </div>
      <div className="ml-6" ><ModeToggle/></div>
     </div>

      <div className="max-w-3xl mx-auto">
        <TodoList/>
      </div>
       <Toaster position="top-center"/>
    </div>
  )
}

export default App