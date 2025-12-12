'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

import { Project } from '@/types/project';

import ProjectCarouselCard from './project-carousel-card';

interface ProjectsCarouselProps {
  projects: Project[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 5000;
  const SLIDE_PROGRESS_STEP = 50;

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % projects.length);
    setProgress(0);
  }, [projects.length]);

  const goToPrev = () => {
    setCurrentIndex(prev => (prev - 1 + projects.length) % projects.length);
    setProgress(0);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + 100 / (SLIDE_DURATION / SLIDE_PROGRESS_STEP);
      });
    }, SLIDE_PROGRESS_STEP);

    return () => clearInterval(interval);
  }, [isPlaying, goToNext]);

  return (
    <>
      <div className="relative w-full max-w-[1400px] mx-auto px-4">
        <button
          onClick={goToPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-3 transition-all"
          aria-label="Previous project"
        >
          <ChevronLeft size={32} className="text-white" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-3 transition-all"
          aria-label="Next project"
        >
          <ChevronRight size={32} className="text-white" />
        </button>

        <div className="relative overflow-hidden rounded-[10px] mx-12 md:mx-16">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projects.map(project => (
              <div
                key={project.id}
                className="min-w-full"
                style={{ minHeight: '400px' }}
              >
                <ProjectCarouselCard project={project} />
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700/50">
            <div
              className="h-full bg-gradient-to-r from-[#FF6B9D] to-[#2634DA] transition-all duration-50 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={togglePlayPause}
          className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause size={24} className="text-white" fill="white" />
          ) : (
            <Play size={24} className="text-white" fill="white" />
          )}
        </button>

        <div className="flex items-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all ${
                index === currentIndex
                  ? 'w-3 h-3 bg-[#EDECF8]'
                  : 'w-2.5 h-2.5 bg-[#5C626C]'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
