import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Search,
  MapPin,
  Calendar,
  RefreshCw,
  Bell,
  Star,
  BarChart3
} from 'lucide-react';

interface PricingScreenProps {
  onBack: () => void;
}

export function PricingScreen({ onBack }: PricingScreenProps) {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedLocation, setSelectedLocation] = useState('punjab');
  const [searchQuery, setSearchQuery] = useState('');

  const locations = [
    { code: 'punjab', name: 'Punjab' },
    { code: 'haryana', name: 'Haryana' },
    { code: 'up', name: 'Uttar Pradesh' },
    { code: 'rajasthan', name: 'Rajasthan' },
    { code: 'gujarat', name: 'Gujarat' }
  ];

  const todayPrices = [
    {
      crop: 'Wheat',
      price: 2150,
      unit: 'quintal',
      change: 2.3,
      trend: 'up',
      market: 'Ludhiana Mandi',
      quality: 'Grade A',
      demand: 'High'
    },
    {
      crop: 'Rice (Basmati)',
      price: 3850,
      unit: 'quintal',
      change: -1.2,
      trend: 'down',
      market: 'Amritsar Mandi',
      quality: 'Premium',
      demand: 'Medium'
    },
    {
      crop: 'Cotton',
      price: 5680,
      unit: 'quintal',
      change: 4.7,
      trend: 'up',
      market: 'Bathinda Mandi',
      quality: 'Grade A',
      demand: 'High'
    },
    {
      crop: 'Sugarcane',
      price: 380,
      unit: 'quintal',
      change: 0.8,
      trend: 'up',
      market: 'Jalandhar Mandi',
      quality: 'Good',
      demand: 'Medium'
    },
    {
      crop: 'Maize',
      price: 1850,
      unit: 'quintal',
      change: -2.1,
      trend: 'down',
      market: 'Patiala Mandi',
      quality: 'Grade B',
      demand: 'Low'
    },
    {
      crop: 'Mustard',
      price: 5200,
      unit: 'quintal',
      change: 3.5,
      trend: 'up',
      market: 'Ludhiana Mandi',
      quality: 'Grade A',
      demand: 'High'
    }
  ];

  const priceHistory = [
    { period: '1 week ago', wheat: 2100, rice: 3900, cotton: 5420 },
    { period: '2 weeks ago', wheat: 2080, rice: 3950, cotton: 5380 },
    { period: '1 month ago', wheat: 2050, rice: 4000, cotton: 5200 },
    { period: '3 months ago', wheat: 1950, rice: 3800, cotton: 4950 }
  ];

  const marketInsights = [
    {
      title: 'Wheat Prices Rising',
      description: 'Strong export demand driving wheat prices up by 8% this month',
      impact: 'positive',
      timeframe: '2 weeks'
    },
    {
      title: 'Cotton Season Peak',
      description: 'Harvest season approaching, expect price volatility',
      impact: 'neutral',
      timeframe: '1 month'
    },
    {
      title: 'Rice Export Boost',
      description: 'Government policy changes favoring rice exports',
      impact: 'positive',
      timeframe: '3 months'
    }
  ];

  const watchlist = [
    { crop: 'Wheat', targetPrice: 2200, currentPrice: 2150 },
    { crop: 'Cotton', targetPrice: 6000, currentPrice: 5680 },
    { crop: 'Rice', targetPrice: 4000, currentPrice: 3850 }
  ];

  const filteredPrices = todayPrices.filter(item =>
    item.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTrendIcon = (trend: string, change: number) => {
    const color = trend === 'up' ? 'text-green-600' : 'text-red-600';
    const Icon = trend === 'up' ? TrendingUp : TrendingDown;
    return (
      <div className={`flex items-center gap-1 ${color}`}>
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{Math.abs(change)}%</span>
      </div>
    );
  };

  const getDemandColor = (demand: string) => {
    switch (demand.toLowerCase()) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Market Prices</h1>
            <p className="text-sm opacity-90">Live commodity rates</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>

        {/* Location & Search */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="h-8 bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.code} value={location.code}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary-foreground/60" />
            <Input
              placeholder="Search crops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60"
            />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Tab Navigation */}
        <div className="flex gap-2">
          <Button 
            variant={activeTab === 'today' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('today')}
            className="flex-1"
          >
            Today's Rates
          </Button>
          <Button 
            variant={activeTab === 'trends' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('trends')}
            className="flex-1"
          >
            Trends
          </Button>
          <Button 
            variant={activeTab === 'watchlist' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('watchlist')}
            className="flex-1"
          >
            Watchlist
          </Button>
        </div>

        {/* Today's Prices */}
        {activeTab === 'today' && (
          <div className="space-y-3">
            {filteredPrices.map((item, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{item.crop}</h3>
                        <Badge className={`text-xs ${getDemandColor(item.demand)}`}>
                          {item.demand} Demand
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.market} • {item.quality}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">₹{item.price.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">per {item.unit}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {getTrendIcon(item.trend, item.change)}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Chart
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bell className="w-4 h-4 mr-1" />
                        Alert
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Price Trends */}
        {activeTab === 'trends' && (
          <div className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Price History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {priceHistory.map((period, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">{period.period}</span>
                      <div className="flex gap-4 text-sm">
                        <span>Wheat: ₹{period.wheat}</span>
                        <span>Rice: ₹{period.rice}</span>
                        <span>Cotton: ₹{period.cotton}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Market Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {marketInsights.map((insight, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{insight.title}</h4>
                      <Badge 
                        variant={insight.impact === 'positive' ? 'default' : insight.impact === 'negative' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {insight.timeframe}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{insight.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Watchlist */}
        {activeTab === 'watchlist' && (
          <div className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Price Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {watchlist.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-sm">{item.crop}</h4>
                      <p className="text-xs text-muted-foreground">
                        Target: ₹{item.targetPrice} | Current: ₹{item.currentPrice}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={item.currentPrice >= item.targetPrice ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {item.currentPrice >= item.targetPrice ? 'Target Met' : 'Watching'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button className="w-full h-12 bg-primary hover:bg-primary/90">
              <Bell className="w-4 h-4 mr-2" />
              Add Price Alert
            </Button>

            <Card className="shadow-md">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Tips for Better Pricing</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Monitor prices across multiple mandis</li>
                  <li>• Set alerts for your target selling prices</li>
                  <li>• Consider seasonal trends before harvesting</li>
                  <li>• Factor in transportation costs to different markets</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}