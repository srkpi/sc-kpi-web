// app/(client)/clubs/page.tsx

'use client';

import { useEffect, useState } from 'react';

import ClubCard from '@/components/clubs/club-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/toast/use-toast';
import { api } from '@/lib/api';
import { Department } from '@/types/departments';

const ClubsPage = () => {
  const [clubs, setClubs] = useState<Department[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Department[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = [
    'Наукові',
    'Танцювальні',
    'Соціогуманітарні',
    'Мистецькі',
    'Спортивні',
    'Волонтерські',
    'Інші',
  ];

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const { data: fetchedClubs } = await api.get<Department[]>(`/clubs`);
        setClubs(fetchedClubs);
        setFilteredClubs(fetchedClubs);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Не вдалося отримати гуртки',
        });
      }
    };

    fetchClubs();
  }, []);

  useEffect(() => {
    const filterByCategoryAndSearch = () => {
      let filtered = clubs;

      if (selectedCategory && selectedCategory !== 'all') {
        filtered = filtered.filter(club =>
          club.category.includes(selectedCategory),
        );
      }

      if (searchTerm) {
        filtered = filtered.filter(club =>
          club.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }

      setFilteredClubs(filtered);
    };

    filterByCategoryAndSearch();
  }, [selectedCategory, searchTerm, clubs]);

  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 8);
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="_container py-8">
        <h1 className="font-h1 mb-[25px] md:mb-[50px] text-m-h1 md:text-h1">
          Гуртки
        </h1>
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex flex-wrap gap-4 w-full md:w-auto md:flex-nowrap">
            <Select onValueChange={value => setSelectedCategory(value)}>
              <SelectTrigger className="w-[130px] h-[30px] md:hidden">
                <SelectValue placeholder="Категорії" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="md:hidden bg-white">
                  Всі категорії
                </SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {categories.map(category => (
              <Button
                variant={selectedCategory === category ? 'outline' : 'default'}
                key={category}
                className="h-[48px] hidden md:flex items-center px-0"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
            <Input
              type="text"
              placeholder="Шукати гурток"
              className="w-[130px] md:w-[406px] md:h-[48px] h-[30px] ml-0 order-last md:order-none mr-[35px] md:mr-[95px] md:ml-[370px]"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.slice(0, visibleCount).map(club => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>

        {visibleCount < filteredClubs.length && (
          <div className="flex justify-center mt-8">
            <button
              className="font-button bg-blue text-white px-6 py-3 rounded-lg hover:bg-accent transition"
              onClick={handleShowMore}
            >
              Показати ще
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubsPage;
