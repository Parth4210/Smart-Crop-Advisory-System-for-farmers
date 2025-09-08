import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Languages, Volume2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* Hero Image */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1622385161916-27f0c8746f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBhZ3JpY3VsdHVyZSUyMGZpZWxkfGVufDF8fHx8MTc1NzMyNzE5Mnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Farmer in field"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-2xl font-bold">AI Crop Helper</h1>
            <p className="text-sm opacity-90">Smart farming guidance</p>
          </div>
        </div>

        {/* Welcome Card */}
        <Card className="shadow-lg border-2 border-primary/20">
          <CardContent className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Languages className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-card-foreground">Welcome Farmer!</h2>
              <p className="text-muted-foreground">Choose your preferred language to get started</p>
            </div>

            {/* Language Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-card-foreground">Select Language / भाषा चुनें</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="h-14 text-lg border-2 border-primary/20">
                  <SelectValue placeholder="Choose your language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code} className="text-lg py-3">
                      <div className="flex items-center gap-3">
                        <span>{lang.native}</span>
                        <span className="text-muted-foreground">({lang.name})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Voice Support Info */}
            <div className="bg-accent/10 rounded-lg p-4 flex items-center gap-3">
              <Volume2 className="w-6 h-6 text-accent" />
              <div>
                <p className="text-sm font-medium">Voice Support Available</p>
                <p className="text-xs text-muted-foreground">Navigate using voice commands</p>
              </div>
            </div>

            {/* Continue Button */}
            <Button 
              onClick={onComplete}
              disabled={!selectedLanguage}
              className="w-full h-14 text-lg bg-primary hover:bg-primary/90"
            >
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-card/50 rounded-lg p-3 border border-primary/20">
            <div className="text-2xl mb-1">🌱</div>
            <p className="text-xs text-muted-foreground">Crop Advice</p>
          </div>
          <div className="bg-card/50 rounded-lg p-3 border border-primary/20">
            <div className="text-2xl mb-1">🌤️</div>
            <p className="text-xs text-muted-foreground">Weather Alerts</p>
          </div>
          <div className="bg-card/50 rounded-lg p-3 border border-primary/20">
            <div className="text-2xl mb-1">🐛</div>
            <p className="text-xs text-muted-foreground">Pest Detection</p>
          </div>
          <div className="bg-card/50 rounded-lg p-3 border border-primary/20">
            <div className="text-2xl mb-1">💰</div>
            <p className="text-xs text-muted-foreground">Market Prices</p>
          </div>
        </div>
      </div>
    </div>
  );
}