  import { Button } from "./ui/button";
  import { v4 as uuidv4 } from 'uuid';
  import { Skeleton } from "@/components/ui/skeleton"
  
  function TodoList({newData, deleteItem, handleMoreList, haveData, loading}) {
    return (
      <div>
       {loading && <div className="flex flex-col space-y-3 mt-3 gap-3">
                {[...Array(10)].map((_, i) => (
                  <Skeleton key={i} className="h-[70px] rounded-xl" />
                ))}
              </div>}

        {newData.length > 0 ? (newData.map((item, index) => {
          
          return <div key={uuidv4()} className="flex justify-between items-center p-5 mt-4 rounded-lg bg-gray-100 dark:bg-gray-900">
              <p className='w-1/2 text-xl font-bold font-mono'>{`${index +1}. ${item.title}`}</p>
              <p>{item.priority}</p>                
              <p>{item.completed ? 'bajarilgan' : 'bajarilmagan' }</p> 
              <Button onClick={() => deleteItem(item.id)} variant="destructive">delete</Button>        
          </div>
        })) : <p className="text-center mt-10 font-bold text-4xl">{!loading && `Malumot yo'q`}</p>}
                 
        {haveData && newData.length > 0 && <div className="flex justify-center my-5"><Button onClick={handleMoreList} variant="ghost">More view</Button></div>}
      </div> 
    )
  }
  
  export default TodoList