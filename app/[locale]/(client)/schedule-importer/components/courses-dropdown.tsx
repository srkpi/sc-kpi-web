import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useScheduleStore } from '@/store/schedule-store';

import { COURSES } from '../constants/index';

const CoursesDropdown = () => {
  const { course, setCourse } = useScheduleStore();

  const handleChange = (value: string) => {
    setCourse(value);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[140px] md:w-[180px]">
        <SelectValue placeholder={course || 'Оберіть курс'} />
      </SelectTrigger>
      <SelectContent>
        {COURSES.map(course => (
          <SelectItem key={course} value={course}>
            {course}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CoursesDropdown;
