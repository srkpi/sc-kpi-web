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
import CLUB_CATEGORIES from '@/constants/club-categories';
import { api } from '@/lib/api';
import { Department } from '@/types/departments';

const ClubsPage = () => {
  const [clubs, setClubs] = useState<Department[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Department[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const { data: fetchedClubs } = await api.get<Department[]>(`/clubs`);
        // const resultArray = fetchedClubs.flatMap(item => Array(5).fill(item));
        setClubs(fetchedClubs);
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
    <div className="_container py-8">
      <h1 className="font-h1 mb-[25px] md:mb-[50px] text-m-h1 md:text-h1">
        Гуртки
      </h1>
      <div className="w-full justify-between gap-3 flex lg:hidden">
        <Select onValueChange={value => setSelectedCategory(value)}>
          <SelectTrigger className="w-[130px] h-[30px] md:h-[48px] lg:hidden">
            <SelectValue placeholder="Категорії" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="md:hidden bg-white">
              Всі категорії
            </SelectItem>
            {CLUB_CATEGORIES.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Шукати гурток"
          className="w-[130px] md:min-h-[48px] md:rounded-[6px] md:w-[406px] min-h-[30px]"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="w-full justify-between gap-3 flex-wrap hidden lg:flex">
        <div className="flex gap-3">
          {CLUB_CATEGORIES.map(category => (
            <Button
              key={category}
              className={`h-[50px] hidden lg:flex md:px-4 items-center md:rounded-[6px] md:opacity-${selectedCategory === category ? '100' : '70'} `}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? 'all' : category,
                )
              }
            >
              {category}
            </Button>
          ))}
        </div>
        <Input
          type="text"
          placeholder="Шукати гурток"
          className="w-[130px] md:min-h-[48px] md:rounded-[6px] md:w-[406px] h-[30px]"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-7">
        {filteredClubs.slice(0, visibleCount).map(club => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>

      {visibleCount < filteredClubs.length && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="font-button bg-blue text-white px-6 py-3 rounded-lg hover:bg-accent transition"
            onClick={handleShowMore}
          >
            Показати ще
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClubsPage;
