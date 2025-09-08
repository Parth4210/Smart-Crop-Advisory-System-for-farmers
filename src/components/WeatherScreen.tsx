import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ArrowLeft, 
  Sun, 
  Cloud, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer,
  Eye,
  Compass,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WeatherScreenProps {
  onBack: () => void;
}

export function WeatherScreen({ onBack }: WeatherScreenProps) {
  const [activeTab, setActiveTab] = useState('today');

  const currentWeather = {
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    visibility: 8,
    uvIndex: 6,
    pressure: 1013,
    dewPoint: 18
  };

  const hourlyForecast = [
    { time: '12 PM', temp: 28, icon: Sun, rain: 10 },
    { time: '1 PM', temp: 30, icon: Sun, rain: 5 },
    { time: '2 PM', temp: 32, icon: Cloud, rain: 15 },
    { time: '3 PM', temp: 31, icon: Cloud, rain: 25 },
    { time: '4 PM', temp: 29, icon: CloudRain, rain: 65 },
    { time: '5 PM', temp: 26, icon: CloudRain, rain: 80 }
  ];

  const weeklyForecast = [
    { day: 'Today', high: 32, low: 24, icon: Sun, condition: 'Sunny', rain: 10 },
    { day: 'Tomorrow', high: 29, low: 22, icon: CloudRain, condition: 'Rain', rain: 85 },
    { day: 'Wed', high: 27, low: 20, icon: CloudRain, condition: 'Heavy Rain', rain: 95 },
    { day: 'Thu', high: 30, low: 23, icon: Cloud, condition: 'Cloudy', rain: 30 },
    { day: 'Fri', high: 33, low: 25, icon: Sun, condition: 'Sunny', rain: 5 },
    { day: 'Sat', high: 31, low: 24, icon: Cloud, condition: 'Partly Cloudy', rain: 20 },
    { day: 'Sun', high: 28, low: 22, icon: CloudRain, condition: 'Light Rain', rain: 60 }
  ];

  const farmingAdvice = [
    {
      title: 'Irrigation Planning',
      message: 'Heavy rain expected Wednesday-Thursday. Reduce watering schedule.',
      priority: 'high',
      icon: '💧'
    },
    {
      title: 'Harvest Window',
      message: 'Good conditions Friday-Saturday for harvesting mature crops.',
      priority: 'medium',
      icon: '🌾'
    },
    {
      title: 'Pest Alert',
      message: 'High humidity may increase fungal disease risk. Monitor closely.',
      priority: 'medium',
      icon: '🐛'
    }
  ];

  const alerts = [
    {
      type: 'Heavy Rain Warning',
      time: 'Tomorrow 3 PM - Thursday 6 AM',
      description: 'Expected rainfall: 45-60mm. Prepare drainage systems.',
      severity: 'high'
    }
  ];

  const getWeatherIcon = (IconComponent: any, size = 'w-8 h-8') => {
    return <IconComponent className={`${size} text-primary`} />;
  };

  const getRainChance = (chance: number) => {
    if (chance < 30) return { color: 'text-green-600', text: 'Low' };
    if (chance < 70) return { color: 'text-yellow-600', text: 'Medium' };
    return { color: 'text-blue-600', text: 'High' };
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
          <div>
            <h1 className="text-xl font-bold">Weather Insights</h1>
            <p className="text-sm opacity-90">Punjabi Village, Punjab</p>
          </div>
        </div>
      </div>

      {/* Hero Weather Image */}
      <div className="relative h-32 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1705077031869-51b60754302a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwZm9yZWNhc3QlMjBjbG91ZHMlMjByYWlufGVufDF8fHx8MTc1NzMyNzMyMXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Weather landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute top-4 left-4 text-white">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-3xl font-bold">{currentWeather.temperature}°C</p>
              <p className="text-sm opacity-90">{currentWeather.condition}</p>
            </div>
            {getWeatherIcon(Sun, 'w-12 h-12 text-white')}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Weather Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <Alert key={index} className="border-l-4 border-l-destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">{alert.type}</p>
                    <p className="text-xs">{alert.time}</p>
                    <p className="text-xs">{alert.description}</p>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Current Conditions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Current Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Humidity</p>
                    <p className="font-semibold">{currentWeather.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Wind Speed</p>
                    <p className="font-semibold">{currentWeather.windSpeed} km/h</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Visibility</p>
                    <p className="font-semibold">{currentWeather.visibility} km</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">UV Index</p>
                    <p className="font-semibold">{currentWeather.uvIndex} Moderate</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-2">
          <Button 
            variant={activeTab === 'today' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('today')}
            className="flex-1"
          >
            Today
          </Button>
          <Button 
            variant={activeTab === 'week' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('week')}
            className="flex-1"
          >
            7-Day Forecast
          </Button>
        </div>

        {/* Hourly Forecast */}
        {activeTab === 'today' && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Hourly Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hourlyForecast.map((hour, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getWeatherIcon(hour.icon, 'w-6 h-6')}
                      <span className="font-medium">{hour.time}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-semibold">{hour.temp}°C</span>
                      <div className="flex items-center gap-1">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span className={getRainChance(hour.rain).color}>
                          {hour.rain}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Weekly Forecast */}
        {activeTab === 'week' && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">7-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyForecast.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getWeatherIcon(day.icon, 'w-6 h-6')}
                      <div>
                        <p className="font-medium">{day.day}</p>
                        <p className="text-xs text-muted-foreground">{day.condition}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-semibold">{day.high}°/{day.low}°</span>
                      <div className="flex items-center gap-1">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span className={getRainChance(day.rain).color}>
                          {day.rain}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Farming Advice */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Farming Advice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {farmingAdvice.map((advice, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl">{advice.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{advice.title}</span>
                    <Badge 
                      variant={advice.priority === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {advice.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{advice.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Set Alerts
          </Button>
          <Button variant="outline" className="h-12">
            <Calendar className="w-4 h-4 mr-2" />
            Farm Calendar
          </Button>
        </div>
      </div>
    </div>
  );
}