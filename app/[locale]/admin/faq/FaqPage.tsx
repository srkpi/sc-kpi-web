'use client';
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { deleteFAQ } from '@/app/[locale]/actions/faq.actions';
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
import { FAQ } from '@/types/faq';

interface Props {
  faqs: FAQ[];
}

export default function FaqPage({ faqs }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteFAQ(id);
      toast({
        title: `Питання успішно видалено`,
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `Помилка при видаленні питання`,
      });
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
    <>
      <h1 className="text-h1 font-semibold mb-[54px]">FAQ</h1>
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
    </>
  );
}
