'use client';
import { useState } from 'react';
import { AxiosError } from 'axios';
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
import { Club } from '@/types/club';

interface Props {
  clubs: Club[];
}

export default function ClubsPage({ clubs }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/clubs/${id}`);

      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: `Стался помилка при видаленні студ. об'єднання`,
          description: error.message,
        });
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredClubs = clubs.filter(
    club =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="content">
      <h1 className="text-h1 font-semibold mb-[54px]">
        Cтудентські об'єднання
      </h1>
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
          {filteredClubs.map(club => (
            <TableRow key={club.id}>
              <TableCell>{club.name}</TableCell>
              <TableCell>{club.description}</TableCell>
              <TableCell>
                <div className="flex space-x-4">
                  <Link href={`/admin/clubs/${club.id}`}>
                    <Button variant="default" className="w-[110px] h-[35px]">
                      Змінити
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-[110px] h-[35px]"
                    onClick={() => handleDelete(club.id)}
                  >
                    Видалити
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link href="/admin/clubs/create">
        <Button className="bg-white h-[58px] gap-3 hover:bg-white text-blue mt-[24px] mb-[20px]">
          <Plus color="#374FFA" size={26}></Plus>
          Додати студ. об'єднання
        </Button>
      </Link>
    </div>
  );
}
