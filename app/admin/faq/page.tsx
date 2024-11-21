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
import { FAQType } from '@/types/faq';

export default function AdminFaq() {
  const [faqs, setFaqs] = useState<FAQType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { toast } = useToast();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await api.get<FAQType[]>('/faq');
        setFaqs(response.data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Не вдалося отримати питання',
        });
      }
    };

    fetchFaqs();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/faq/${id}`);

      toast({
        title: `Питання успішно видалено`,
      });

      const filtered = faqs.filter(faq => faq.id !== id);
      setFaqs(filtered);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: 'destructive',
          title: `Стался помилка при видаленні питання`,
          description: error.message,
        });
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="content">
      <h1 className="text-h1 font-semibold mb-[54px]">FAQ</h1>
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
            <TableHead>Категорія</TableHead>
            <TableHead>Питання</TableHead>
            <TableHead>Відповідь</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFaqs.map(faq => (
            <TableRow key={faq.id}>
              <TableCell className="w-fit">
                <Button className="md:h-[35px] md:px-[24px] md:w-full whitespace-normal">
                  {faq.category ? faq.category.name : 'No Category'}
                </Button>
              </TableCell>
              <TableCell>{faq.question}</TableCell>
              <TableCell>{faq.answer}</TableCell>
              <TableCell>
                <div className="flex space-x-4">
                  <Link href={`/admin/faq/${faq.id}`}>
                    <Button variant="default" className="w-[110px] h-[35px]">
                      Змінити
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-[110px] h-[35px]"
                    onClick={() => handleDelete(faq.id)}
                  >
                    Видалити
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link href="/admin/faq/create">
        <Button className="bg-white h-[58px] gap-3 hover:bg-white text-blue mt-[24px] mb-[20px]">
          <Plus color="#374FFA" size={26}></Plus>
          Додати питання
        </Button>
      </Link>
    </div>
  );
}
