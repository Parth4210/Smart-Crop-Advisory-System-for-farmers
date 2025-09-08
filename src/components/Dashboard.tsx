import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Sprout, 
  CloudRain, 
  TrendingUp, 
  Bug, 
  Thermometer, 
  Droplets,
  Sun,
  AlertTriangle,
  Camera,
  Menu,
  User,
  Settings
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [currentTemp] = useState(28);
  const [humidity] = useState(65);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const quickActions = [
    {
      icon: Camera,
      title: 'Detect Pest',
      subtitle: 'Take photo to identify',
      color: 'bg-destructive',
      action: () => onNavigate('pest-detection')
    },
    {
      icon: Sprout,
      title: 'Soil Health',
      subtitle: 'Check soil condition',
      color: 'bg-primary',
      action: () => onNavigate('soil-health')
    },
    {
      icon: CloudRain,
      title: 'Weather',
      subtitle: '7-day forecast',
      color: 'bg-chart-2',
      action: () => onNavigate('weather')
    },
    {
      icon: TrendingUp,
      title: 'Market Prices',
      subtitle: 'Today\'s rates',
      color: 'bg-secondary',
      action: () => onNavigate('pricing')
    }
  ];

  const cropRecommendations = [
    {
      crop: 'Tomato',
      status: 'Optimal',
      confidence: 95,
      reason: 'Perfect soil pH and weather conditions'
    },
    {
      crop: 'Wheat',
      status: 'Good',
      confidence: 78,
      reason: 'Consider irrigation timing'
    },
    {
      crop: 'Rice',
      status: 'Moderate',
      confidence: 65,
      reason: 'Monitor water levels closely'
    }
  ];

  const alerts = [
    {
      type: 'weather',
      message: 'Heavy rain expected in 2 days',
      priority: 'high'
    },
    {
      type: 'pest',
      message: 'Aphid activity reported in nearby farms',
      priority: 'medium'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Menu className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Good Morning</h1>
              <p className="text-sm opacity-90">Farmer Kumar</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Weather Summary */}
        <div className="mt-4 flex items-center justify-between bg-primary-foreground/10 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <Sun className="w-8 h-8" />
            <div>
              <p className="text-lg font-bold">{currentTemp}°C</p>
              <p className="text-sm opacity-90">Partly Cloudy</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Droplets className="w-4 h-4" />
              <span>{humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Thermometer className="w-4 h-4" />
              <span>32°/24°</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <Alert key={index} className={`border-l-4 ${
                alert.priority === 'high' ? 'border-l-destructive' : 'border-l-secondary'
              }`}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  {alert.message}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={action.action}>
              <CardContent className="p-4">
                <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mb-3`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm">{action.title}</h3>
                <p className="text-xs text-muted-foreground">{action.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Crop Recommendations */}
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-primary" />
              AI Crop Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cropRecommendations.map((crop, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{crop.crop}</span>
                    <Badge 
                      variant={crop.status === 'Optimal' ? 'default' : crop.status === 'Good' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {crop.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{crop.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{crop.confidence}%</p>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Market Prices Summary */}
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" />
              Today's Market Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Wheat</p>
                <p className="text-lg font-bold">₹2,150/quintal</p>
                <p className="text-xs text-green-600">+2.3% ↗</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Rice</p>
                <p className="text-lg font-bold">₹1,850/quintal</p>
                <p className="text-xs text-red-600">-1.2% ↘</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-3" 
              onClick={() => onNavigate('pricing')}
            >
              View All Prices
            </Button>
          </CardContent>
        </Card>

        {/* Navigation Options */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-12"
            onClick={() => onNavigate('feedback')}
          >
            Help & Feedback
          </Button>
          <Button 
            variant="outline" 
            className="h-12"
            onClick={() => onNavigate('soil-health')}
          >
            Soil Guide
          </Button>
        </div>
      </div>
    </div>
  );
}