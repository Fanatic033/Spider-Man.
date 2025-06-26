"use client";

import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { Hero } from "@/features/Character/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebouncedValue } from "@/shared/hooks/use-debounce";

async function fetchSuperheroes(query: string): Promise<Hero[]> {
  const { data } = await axios.get(`/api/superhero?query=${encodeURIComponent(query)}`);
  if (data.results) return data.results;
  throw new Error("Персонажи не найдены");
}

export default function CharacterCard() {
  const [search, setSearch] = useState("");
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const debouncedSearch = useDebouncedValue(search, 400);

  const {
    data: results = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["superhero", debouncedSearch],
    queryFn: () => fetchSuperheroes(debouncedSearch),
    enabled: !!debouncedSearch,
  });

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex gap-4">
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedHero(null);
          }}
          placeholder="Введите имя героя (например, Spider-Man)"
          className="flex-1"
        />
        <button
          disabled={!search.trim() || isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Поиск..." : "Найти"}
        </button>
      </div>

      {error && <div className="text-red-500 text-center">Ошибка при поиске персонажа</div>}

      {results.length > 0 && !selectedHero && (
        <div className="bg-white rounded-md shadow divide-y divide-gray-200">
          {results.map((hero) => (
            <div
              key={hero.id}
              className="p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedHero(hero)}
            >
              {hero.name}
            </div>
          ))}
        </div>
      )}

      {selectedHero && (
        <Card className="bg-slate-800 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-6 mb-4">
              <img
                src={selectedHero.image?.url}
                alt={selectedHero.name}
                className="w-32 h-32 rounded-lg object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-hero.png";
                }}
              />
              <div>
                <h2 className="text-2xl font-bold">{selectedHero.name}</h2>
                <p className="text-gray-300">
                  {selectedHero.biography?.["full-name"]}
                </p>
              </div>
            </div>

            <Tabs defaultValue="powerstats" className="w-full">
              <TabsList className="mb-4 bg-slate-700">
                <TabsTrigger value="powerstats">Силы</TabsTrigger>
                <TabsTrigger value="biography">Биография</TabsTrigger>
                <TabsTrigger value="appearance">Внешность</TabsTrigger>
              </TabsList>

              <TabsContent value="powerstats">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedHero.powerstats || {}).map(
                    ([key, value]) => (
                      <div key={key} className="bg-slate-700 p-3 rounded-md">
                        <div className="text-gray-300 text-sm capitalize">
                          {key}
                        </div>
                        <div className="text-xl font-bold">
                          {value || "N/A"}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </TabsContent>

              <TabsContent value="biography">
                <div className="space-y-3">
                  {Object.entries(selectedHero.biography || {}).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="border-b border-slate-600 pb-2"
                      >
                        <span className="text-gray-300 capitalize font-medium">
                          {key.replace(/-/g, " ")}:
                        </span>
                        <span className="ml-2">
                          {Array.isArray(value)
                            ? value.join(", ")
                            : value || "N/A"}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </TabsContent>

              <TabsContent value="appearance">
                <div className="space-y-3">
                  {Object.entries(selectedHero.appearance || {}).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="border-b border-slate-600 pb-2"
                      >
                        <span className="text-gray-300 capitalize font-medium">
                          {key.replace(/-/g, " ")}:
                        </span>
                        <span className="ml-2">
                          {Array.isArray(value)
                            ? value.join(", ")
                            : value || "N/A"}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
