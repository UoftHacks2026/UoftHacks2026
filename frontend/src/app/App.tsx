import { useState } from "react";
import { HomePage } from "../app/components/HomePage";
import { RecordStory } from "../app/components/RecordStory";
import { TranscriptView } from "../app/components/TranscriptView";
import { ChatInterface } from "../app/components/ChatInterface";
import { StoryLibrary } from "../app/components/StoryLibrary";
import { Toaster } from "../app/components/ui/sonner";

type Screen = 'home' | 'record' | 'transcript' | 'chat' | 'library';

interface Story {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  language: string;
  duration: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [currentData, setCurrentData] = useState<any>(null);
  const [savedStories, setSavedStories] = useState<Story[]>([]);

  const handleNavigate = (screen: string, data?: any) => {
    setCurrentScreen(screen as Screen);
    if (data) {
      setCurrentData(data);
    }
  };

  const handleStoryRecorded = (transcript: string, title: string) => {
    // Add the new story to saved stories
    const newStory: Story = {
      id: Date.now().toString(),
      title: title,
      excerpt: transcript.substring(0, 150) + '...',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      language: 'English',
      duration: '5:23', // Mock duration
    };
    setSavedStories(prev => [newStory, ...prev]);
  };

  return (
    <>
      {currentScreen === 'home' && (
        <HomePage onNavigate={handleNavigate} />
      )}
      {currentScreen === 'record' && (
        <RecordStory 
          onNavigate={handleNavigate}
          onStoryRecorded={handleStoryRecorded}
        />
      )}
      {currentScreen === 'transcript' && currentData && (
        <TranscriptView
          transcript={currentData.transcript}
          title={currentData.title}
          onNavigate={handleNavigate}
        />
      )}
      {currentScreen === 'chat' && currentData && (
        <ChatInterface
          transcript={currentData.transcript}
          title={currentData.title}
          onNavigate={handleNavigate}
        />
      )}
      {currentScreen === 'library' && (
        <StoryLibrary 
          onNavigate={handleNavigate}
          stories={savedStories}
        />
      )}
      <Toaster />
    </>
  );
}