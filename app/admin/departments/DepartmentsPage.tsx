'use client';
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
import { useToast } from '@/components/ui/toast/use-toast';
import { api } from '@/lib/api';
import { Department } from '@/types/departments';

interface Props {
  departments: Department[];
}

export default function DepartmentsPage({ departments }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/departments/${id}`);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `Стался помилка при видаленні департаменту`,
      });
    }
    router.refresh();
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
    <>
      <h1 className="text-h1 font-semibold mb-[54px]">Департаменти</h1>
      <Input
        className="w-full text-p pl-16 h-[72px] mb-[78px]"
        placeholder="Пошук..."
        value={searchQuery}
        onChange={handleSearchChange}
        icon={<Search />}
        iconPosition="start"
      />
      <Table>
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
    </>
  );
}
