"use client";

import { useEffect, useState } from "react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

class Company {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const _fetchedCompanies: Company[] = [new Company("Bully")];

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);

  const addCompany = () => {
    console.log("Adding company...");
  };

  const fetchCompanies = () => {
    return new Promise<Company[]>((resolve) => resolve(_fetchedCompanies));
  };

  useEffect(() => {
    console.log("Calling useEffect > []...");
    let ignore = false;

    if (!ignore) {
      console.log("Fetching companies...");
      fetchCompanies().then((companies) => setCompanies(companies));
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        Test
        <Combobox items={companies}>
          <ComboboxInput placeholder="Select an option..." />
          <ComboboxContent>
            <ComboboxEmpty onClick={addCompany}>
              -- Add company --
            </ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item.name} value={item.name}>
                  {item.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </main>
    </div>
  );
}
