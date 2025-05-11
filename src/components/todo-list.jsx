  import { Button } from "./ui/button";
  import { v4 as uuidv4 } from 'uuid';
  import { Skeleton } from "@/components/ui/skeleton"
  import { Context } from "../context/index"
  import { useContext, useEffect } from "react";
  import { deleteList, getData } from "../requests";
import { toast } from "sonner";
  
  
  function TodoList() {
  const {state, dispatch} = useContext(Context)

   useEffect(() => {
      function newData() {
          dispatch({type:'loading'})
          getData(state.skip, 10).then(res => {
              dispatch({type:'SET_DATA', payload: res.data})
              if(!res.total) {
                dispatch({type: 'haveData'})
                toast.info('malumot tugadi')
              }
          }).catch((err)=> {
              toast.error(err.message)
          }).finally(() =>  dispatch({type:'loading'}))
      }
      newData()
  }, [state.skip])

    useEffect(() => {
      let filtered = [...state.data]
    
      if (state.priorityFilter !== 'all') {
        filtered = filtered.filter(item => item.priority === state.priorityFilter)
      }
    
      if (state.completedFilter !== 'all') {
        filtered = filtered.filter(item => item.completed === (state.completedFilter === 'Bajarilgan'))
      }
      
      dispatch({type:'SET_FILTER', payload: filtered})

    }, [state.priorityFilter, state.completedFilter, state.data])

   function deleteItem(id) {
      deleteList(id).then(res => {
      dispatch({type: 'SET_FILTER', payload: state.data.filter((el)=> el.id !== id)})
      if(id) {
        toast.success("Muvaffaqiyatli o'chirildi")
      }
    }).catch((err) => {
        toast.error(err.message)
    }).finally(() => {
      
    })
  }

  function handleMoreList() {
      if(state.haveData) {
        dispatch({type:'SKIP', payload: state.skip + 10})
      }
    }


    return (
      <div>
       {state.loading && <div className="flex flex-col space-y-3 mt-3 gap-3">
                {[...Array(10)].map((_, i) => (
                  <Skeleton key={i} className="h-[70px] rounded-xl" />
                ))}
              </div>}

        {state.filter.length ? (state.filter.map((item, index) => {
          
          return <div key={uuidv4()} className="flex justify-between items-center p-5 mt-4 rounded-lg bg-gray-100 dark:bg-gray-900">
              <p className='w-1/2 text-xl font-bold font-mono'>{`${index +1}. ${item.title}`}</p>
              <p>{item.priority}</p>                
              <p>{item.completed ? 'bajarilgan' : 'bajarilmagan' }</p> 
              <Button onClick={() => deleteItem(item.id)} variant="destructive">delete</Button>        
          </div>
        })) : <p className="text-center mt-10 font-bold text-4xl">{!state.loading && `Malumot yo'q`}</p>}
                 
        {state.haveData && state.filter.length && <div className="flex justify-center my-5"><Button onClick={handleMoreList} variant="ghost">More view</Button></div>}
      </div> 
    )
  }
  
  export default TodoList