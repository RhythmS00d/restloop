import { Header } from "@/components/header";
import { SearchBar } from "@/components/search-bar";
import { RestPointsList } from "@/components/rest-points-list";
import { CategorySelector } from "@/components/category-selector";
import { ThemeProvider } from "@/components/theme-provider";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <CategorySelector />
          <SearchBar />
          <RestPointsList />
        </main>
      </div>
    </ThemeProvider>
  );
}