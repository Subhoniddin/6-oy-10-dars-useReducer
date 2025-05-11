import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { postData } from "../requests";
import { Context } from "../context/index"
import { useContext } from "react";

export function DialogDemo() {
  const [open, setOpen] = useState(false);
  const {state, dispatch} = useContext(Context)
  
  function newPostData(data) {
    postData(data).then(res => {
        dispatch({type: 'SET_DATA', payload: [res]})
        toast.success('Malumot qoshildi')
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      priority: formData.get("priority"),
      completed: formData.get("completed") === "on",
    };
    if(data.title.length < 4) { toast.info("Title 4 belgidan kam bo'lmasin!"); e.target.title.focus(); return;}
    newPostData(data)
    e.target.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Qo'shish</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title*
              </Label>
              <Input id="title" name="title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select name="priority" defaultValue="low">
                <SelectTrigger className="max-w-[277px]">
                  <SelectValue placeholder="priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">low</SelectItem>
                  <SelectItem value="medium">medium</SelectItem>
                  <SelectItem value="high">high</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="completed" className="text-right">
                Completed
              </Label>
              <Checkbox id="completed" name="completed" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}