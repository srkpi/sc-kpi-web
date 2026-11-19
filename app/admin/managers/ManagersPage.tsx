'use client';

import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { deleteManager } from '@/app/actions/manager.actions';
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
import { Manager } from '@/types/manager';

interface Props {
  managers: Manager[];
}

const getName = (manager: Manager) =>
  fullName(manager.lastName, manager.firstName, manager.middleName);

export default function ManagersPage({ managers }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async (manager: Manager) => {
    if (!window.confirm(`Видалити «${getName(manager)}»?`)) return;

    try {
      await deleteManager(manager.id);
      toast({ title: 'Менеджера успішно видалено' });
      router.refresh();
    } catch {
      toast({ variant: 'destructive', title: 'Не вдалося видалити менеджера' });
    }
  };

  const query = searchQuery.toLowerCase();
  const filteredManagers = managers.filter(
    manager =>
      getName(manager).toLowerCase().includes(query) ||
      manager.position.toLowerCase().includes(query),
  );

  return (
    <>
      <h1 className="text-h1 font-semibold mb-[54px]">Керівництво</h1>
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
            <TableHead>ПІБ</TableHead>
            <TableHead>Посада</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredManagers.map(manager => (
            <TableRow key={manager.id}>
              <TableCell>{getName(manager)}</TableCell>
              <TableCell>{manager.position}</TableCell>
              <TableCell>
                <div className="flex space-x-4">
                  <Link href={`/admin/managers/${manager.id}`}>
                    <Button variant="default" className="w-[110px] h-[35px]">
                      Змінити
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-[110px] h-[35px]"
                    onClick={() => handleDelete(manager)}
                  >
                    Видалити
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link href="/admin/managers/create">
        <Button className="bg-white h-[58px] gap-3 hover:bg-white text-blue mt-[24px] mb-[20px]">
          <Plus color="#374FFA" size={26}></Plus>
          Додати менеджера
        </Button>
      </Link>
    </>
  );
}
