'use client';

import { useEffect, useState } from 'react';

import ClubCard from '@/components/clubs/club-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast/use-toast';
import { api } from '@/lib/api';
import { Department } from '@/types/departments';

const ClubsPage = () => {
  const [clubs, setClubs] = useState<Department[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Department[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = [
    'наукові',
    'танцювальні',
    'соціогуманітарні',
    'мистецькі',
    'спортивні',
    'волонтерські',
    'інші',
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

      if (selectedCategory) {
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

  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="_container py-8">
        <h1 className="font-h1 mb-6">Гуртки</h1>

        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map(category => (
            <Button
              variant={selectedCategory === category ? 'outline' : 'default'}
              key={category}
              className="w-[150px] h-[20px] px-4"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
          <Button
            variant={selectedCategory === null ? 'outline' : 'default'}
            className="w-[150px] h-[20px] px-4"
            onClick={() => setSelectedCategory(null)}
          >
            Всі
          </Button>
        </div>

        <div className="mb-8">
          <Input
            type="text"
            placeholder="Шукати гурток"
            className="w-[380px] h-[40px]"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map(club => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button className="font-button bg-blue text-white px-6 py-3 rounded-lg hover:bg-accent transition">
            Показати ще
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubsPage;
