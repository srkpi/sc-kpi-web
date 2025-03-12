'use client';
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

import { deleteClub } from '@/app/actions/club.actions';
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
import { Club } from '@/types/club';

interface Props {
  clubs: Club[];
}

export default function ClubsPage({ clubs }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteClub(id);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `Стался помилка при видаленні студ. об'єднання`,
      });
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
    <>
      <h1 className="text-h1 font-semibold mb-[54px]">
        Cтудентські об'єднання
      </h1>
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
          {filteredClubs.map(club => (
            <TableRow key={club.id}>
              <TableCell>{club.name}</TableCell>
              <TableCell>{club.shortDescription}</TableCell>
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
    </>
  );
}
