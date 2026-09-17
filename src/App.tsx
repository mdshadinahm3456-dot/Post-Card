import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Postcards } from './pages/Postcards';
import { Generator } from './pages/Generator';
import { Quotes } from './pages/Quotes';
import { VintageGallery } from './pages/VintageGallery';
import { Categories } from './pages/Categories';
import { Favorites } from './pages/Favorites';
import { MyCreations } from './pages/MyCreations';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Contact } from './pages/Contact';

import { PostcardTemplate, Quote, GalleryItem, SavedCreation, CardCustomizationState } from './types';
import { postcards } from './data/postcards';
import { quotes } from './data/quotes';
import { cardMatchesCategory } from './data/categories';
import { parseShareParams } from './utils/shareCard';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedCardForGenerator, setSelectedCardForGenerator] = useState<PostcardTemplate>(
    postcards[0]
  );
  const [selectedQuoteForGenerator, setSelectedQuoteForGenerator] = useState<Quote>(quotes[0]);
  const [selectedOccasionForGenerator, setSelectedOccasionForGenerator] = useState<string>('all');
  const [selectedCustomizationForGenerator, setSelectedCustomizationForGenerator] = useState<
    Partial<CardCustomizationState> | undefined
  >(undefined);
  const [selectedCreationIdForGenerator, setSelectedCreationIdForGenerator] = useState<
    string | undefined
  >(undefined);

  // Parse URL search params on mount for direct page or shared card loading
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page');
      const shareData = parseShareParams();

      if (shareData && shareData.cardId) {
        const matched = postcards.find((c) => c.id === shareData.cardId);
        if (matched) {
          setSelectedCardForGenerator(matched);
          if (shareData.quoteId) {
            const matchedQuote = quotes.find((q) => q.id === shareData.quoteId);
            if (matchedQuote) setSelectedQuoteForGenerator(matchedQuote);
          }
          if (shareData.customization) {
            setSelectedCustomizationForGenerator(shareData.customization);
          }
          setActivePage('generator');
          return;
        }
      }

      if (
        pageParam &&
        [
          'home',
          'postcards',
          'generator',
          'quotes',
          'gallery',
          'categories',
          'favorites',
          'my-creations',
          'privacy',
          'terms',
          'contact'
        ].includes(pageParam)
      ) {
        setActivePage(pageParam);
      }
    } catch (err) {
      console.warn('Error reading URL parameters:', err);
    }
  }, []);

  // Scroll to top when switching pages
  const handleNavigate = (page: string) => {
    if (page === 'generator') {
      setSelectedCustomizationForGenerator(undefined);
      setSelectedCreationIdForGenerator(undefined);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When an occasion is chosen from Home or Categories to create in Generator
  const handleSelectOccasionToCreate = (occasionId: string) => {
    setSelectedOccasionForGenerator(occasionId);
    setSelectedCustomizationForGenerator(undefined);
    setSelectedCreationIdForGenerator(undefined);
    // Find first matching card for this occasion if possible
    if (occasionId && occasionId !== 'all') {
      const matched = postcards.find((c) => cardMatchesCategory(c, occasionId));
      if (matched) {
        setSelectedCardForGenerator(matched);
      }
    }
    setActivePage('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When a postcard is chosen to customize in Generator
  const handleSelectCardToCreate = (card: PostcardTemplate) => {
    setSelectedCardForGenerator(card);
    setSelectedCustomizationForGenerator(undefined);
    setSelectedCreationIdForGenerator(undefined);
    setActivePage('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When a quote is selected to create a card
  const handleSelectQuoteToCreate = (quote: Quote) => {
    setSelectedQuoteForGenerator(quote);
    setSelectedCustomizationForGenerator(undefined);
    setSelectedCreationIdForGenerator(undefined);
    setActivePage('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When a gallery artwork is customized
  const handleSelectGalleryToCreate = (galleryItem: GalleryItem) => {
    const matchedCard =
      postcards.find((c) => c.category.toLowerCase() === galleryItem.category.toLowerCase()) ||
      postcards[0];

    setSelectedCardForGenerator(matchedCard);
    setSelectedQuoteForGenerator({
      id: `q-gal-${galleryItem.id}`,
      text: galleryItem.quoteBengali || galleryItem.quote || galleryItem.quoteEnglish || galleryItem.title,
      author: galleryItem.author || 'Vintage Love',
      category: galleryItem.category,
      mood: 'romantic'
    });
    setSelectedCustomizationForGenerator(undefined);
    setSelectedCreationIdForGenerator(undefined);
    setActivePage('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When user clicks Edit on a saved card in MyCreations
  const handleEditCreation = (creation: SavedCreation) => {
    const matchedCard =
      postcards.find((c) => c.id === creation.cardId) || postcards[0];

    setSelectedCardForGenerator(matchedCard);
    setSelectedCustomizationForGenerator(creation.customization);
    setSelectedCreationIdForGenerator(creation.id);

    if (creation.quoteId) {
      const matchedQuote = quotes.find((q) => q.id === creation.quoteId);
      if (matchedQuote) setSelectedQuoteForGenerator(matchedQuote);
    }

    setActivePage('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#100c0a] text-[#f7f0df] font-bengali-body selection:bg-[#7a1f26] selection:text-[#ffd166]">
      {/* Top Navbar */}
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {activePage === 'home' && (
          <Home
            onSelectCardToCreate={handleSelectCardToCreate}
            onNavigate={handleNavigate}
            onSelectQuoteToCreate={handleSelectQuoteToCreate}
            onSelectOccasionToCreate={handleSelectOccasionToCreate}
            onEditCreation={handleEditCreation}
          />
        )}

        {activePage === 'postcards' && (
          <Postcards
            onSelectCard={handleSelectCardToCreate}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'generator' && (
          <Generator
            key={`${selectedCardForGenerator.id}-${selectedQuoteForGenerator.id}-${selectedOccasionForGenerator}-${selectedCreationIdForGenerator || 'new'}`}
            initialCard={selectedCardForGenerator}
            initialQuote={selectedQuoteForGenerator}
            initialOccasion={selectedOccasionForGenerator}
            initialCustomization={selectedCustomizationForGenerator}
            creationId={selectedCreationIdForGenerator}
          />
        )}

        {activePage === 'quotes' && (
          <Quotes onUseQuote={handleSelectQuoteToCreate} />
        )}

        {activePage === 'gallery' && (
          <VintageGallery onCustomizeItem={handleSelectGalleryToCreate} />
        )}

        {activePage === 'categories' && (
          <Categories
            onSelectCard={handleSelectCardToCreate}
            onSelectCategoryFilter={(catName) => {
              handleSelectOccasionToCreate(catName);
            }}
          />
        )}

        {activePage === 'favorites' && (
          <Favorites
            onSelectCard={handleSelectCardToCreate}
            onSelectQuote={handleSelectQuoteToCreate}
            onSelectGallery={handleSelectGalleryToCreate}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'my-creations' && (
          <MyCreations
            onEditCreation={handleEditCreation}
            onNavigateToGenerator={() => handleNavigate('generator')}
            onSelectRecentlyUsedCard={handleSelectCardToCreate}
          />
        )}

        {activePage === 'privacy' && <Privacy />}
        {activePage === 'terms' && <Terms />}
        {activePage === 'contact' && <Contact />}
      </main>

      {/* Persistent Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
