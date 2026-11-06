'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { deleteArea } from '@/app/actions/area.actions';
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
import { fullName } from '@/lib/full-name';
import { Area } from '@/types/area';

interface Props {
  areas: Area[];
}

const getHeadName = (area: Area) =>
  fullName(area.headLastName, area.headFirstName);

export default function AreasPage({ areas }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async (area: Area) => {
    if (!window.confirm(`Видалити напрям «${area.name}»?`)) return;

    try {
      await deleteArea(area.id);
      toast({ title: 'Напрям успішно видалено' });
      router.refresh();
    } catch {
      toast({ variant: 'destructive', title: 'Не вдалося видалити напрям' });
    }
  };

  const query = searchQuery.toLowerCase();
  const filteredAreas = areas.filter(
    area =>
      area.name.toLowerCase().includes(query) ||
      getHeadName(area).toLowerCase().includes(query),
  );

  return (
    <>
      <h1 className="text-h1 font-semibold mb-[54px]">Напрями роботи</h1>
      <Input
        className="w-full text-p pl-16 h-[72px] mb-[78px]"
        placeholder="Пошук..."
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
        icon={<Search />}
        iconPosition="start"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Назва</TableHead>
            <TableHead>Відповідальний</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAreas.map(area => (
            <TableRow key={area.id}>
              <TableCell>{area.name}</TableCell>
              <TableCell>{getHeadName(area)}</TableCell>
              <TableCell>
                <div className="flex space-x-4">
                  <Link href={`/admin/areas/${area.id}`}>
                    <Button variant="default" className="w-[110px] h-[35px]">
                      Змінити
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-[110px] h-[35px]"
                    onClick={() => handleDelete(area)}
                  >
                    Видалити
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link href="/admin/areas/create">
        <Button className="bg-white h-[58px] gap-3 hover:bg-white text-blue mt-[24px] mb-[20px]">
          <Plus color="#374FFA" size={26}></Plus>
          Додати напрям
        </Button>
      </Link>
    </>
  );
}
