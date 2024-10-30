'use client';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
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
import { useToast } from '@/components/ui/toast/use-toast';
import { api } from '@/lib/api';
import { Service } from '@/types/service';

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { toast } = useToast();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get<Service[]>('/services');
        setServices(response.data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Не вдалося отримати служби',
        });
      }
    };

    fetchService();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/services/${id}`);

      toast({
        title: `Службу успішно видалено`,
      });

      const response = await api.get<Service[]>('/services');
      setServices(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: `Стался помилка при видаленні служби`,
          description: error.message,
        });
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredService = services.filter(
    service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="content">
      <h1 className="text-h1 font-semibold mb-[54px]">Служби</h1>
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
            <TableHead>Опис</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredService.map(service => (
            <TableRow key={service.id}>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>
                <div className="flex space-x-4">
                  <Link href={`/admin/services/${service.id}`}>
                    <Button variant="default" className="w-[110px] h-[35px]">
                      Змінити
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-[110px] h-[35px]"
                    onClick={() => handleDelete(service.id)}
                  >
                    Видалити
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link href="/admin/services/create">
        <Button className="bg-white h-[58px] gap-3 hover:bg-white text-blue mt-[24px] mb-[20px]">
          <Plus color="#374FFA" size={26}></Plus>
          Додати службу
        </Button>
      </Link>
    </div>
  );
}
