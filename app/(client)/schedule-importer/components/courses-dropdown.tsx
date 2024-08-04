import { useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { COURSES } from '../constants/index';

const CoursesDropdown = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  useEffect(() => {
    const storedCourse = sessionStorage.getItem('course');
    if (storedCourse) {
      setSelectedCourse(storedCourse);
    }
  }, []);

  const handleChange = (value: string) => {
    setSelectedCourse(value);
    sessionStorage.setItem('course', value);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[140px] md:w-[180px]">
        <SelectValue placeholder={selectedCourse || 'Оберіть курс'} />
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
