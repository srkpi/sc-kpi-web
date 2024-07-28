'use client';
import { useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { api } from '@/lib/api';
import { Department } from '@/types/departments';

export default function AdminDepartment() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get<Department[]>('/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/departments/${id}`);
      console.log(`Department with ID ${id} deleted successfully`);
      const response = await api.get<Department[]>('/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error(`Failed to delete department with ID ${id}:`, error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredDepartments = departments.filter(
    department =>
      department.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      department.shortDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="content">
      <h1 className="text-h1 font-semibold mb-[54px]">Департаменти</h1>
      <div className="relative w-[1272px]">
        <Input
          className="w-full text-p pl-16 h-[72px] mb-[78px]"
          placeholder="Пошук..."
          value={searchQuery}
          onChange={handleSearchChange}
          icon={<Search />}
          iconPosition="start"
        />
      </div>
      <Table className="w-[1273px]">
        <TableHeader>
          <TableRow>
            <TableHead>Назва</TableHead>
            <TableHead>Короткий опис</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDepartments.map(department => (
            <TableRow key={department.id}>
              <TableCell>{department.name}</TableCell>
              <TableCell>{department.shortDescription}</TableCell>
              <TableCell>
                <div className="flex space-x-4">
                  <Link href={`/admin/departments/${department.id}`}>
                    <Button variant="default" className="w-[110px] h-[35px]">
                      Змінити
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-[110px] h-[35px]"
                    onClick={() => handleDelete(department.id)}
                  >
                    Видалити
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link href={`/admin/departments/create`}>
        <Button className="bg-white h-[58px] gap-3 hover:bg-white text-blue mt-[24px] mb-[20px]">
          <Plus color="#374FFA" size={26}></Plus>
          Додати департамент
        </Button>
      </Link>
    </div>
  );
}
