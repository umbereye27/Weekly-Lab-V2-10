import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const AddTaskForm = () => {
  return (
    <div className="w-full p-3 border bg-secondary border-secondary-l rounded-xl space-y-3">
      <form className="w-full flex gap-3 flex-col md:flex-row items-start md:items-end justify-start">
        <Input id="addTaskInput" placeholder="Add a specific task here" />
        <div className="flex-1/2">
          <Input type="date" id="skillDueDateInput" placeholder="" />
        </div>

        <Button className="inline-flex px-10" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
