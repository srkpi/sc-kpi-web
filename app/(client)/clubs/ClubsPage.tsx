'use client';

import { useEffect, useState } from 'react';

import { getCategoriesList } from '@/app/actions/categories.actions';
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
import { Category } from '@/types/category';
import { Club } from '@/types/club';

interface Props {
  clubs: Club[];
}

const ClubsPage = ({ clubs }: Props) => {
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(await getCategoriesList());
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const filterByCategoryAndSearch = () => {
      let filtered = clubs;

      if (selectedCategory) {
        filtered = filtered.filter(club =>
          club.categories.some(category => category.name === selectedCategory),
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
    <>
      <div className="w-full gap-5 h-[30px] md:h-[48px] flex">
        <Input
          placeholder="Пошук"
          className="w-[400px] h-[30px] md:h-[48px] max-w-full rounded-[6px] md:max-w-[406px]"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <Select
          value={selectedCategory?.toString()}
          onValueChange={value => setSelectedCategory(value)}
        >
          <SelectTrigger className="max-w-[200px] md:max-w-[250px]">
            <SelectValue placeholder="Категорія" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="md:hidden bg-white">
              Всі категорії
            </SelectItem>
            {categories.map(category => (
              <SelectItem key={category.name} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedCategory && (
          <Button
            variant="outline"
            size="sm"
            onClick={e => {
              e.stopPropagation();
              setSelectedCategory('');
            }}
          >
            X
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-7 mt-[30px] md:mt-[60px]">
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
    </>
  );
};

export default ClubsPage;
