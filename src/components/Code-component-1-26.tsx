import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Beaker, 
  Droplets, 
  Thermometer, 
  Zap,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SoilHealthScreenProps {
  onBack: () => void;
}

export function SoilHealthScreen({ onBack }: SoilHealthScreenProps) {
  const [activeTab, setActiveTab] = useState('analysis');

  const soilMetrics = [
    {
      name: 'pH Level',
      value: 6.8,
      ideal: '6.0-7.0',
      status: 'good',
      icon: Beaker,
      description: 'Slightly acidic - perfect for most crops'
    },
    {
      name: 'Moisture',
      value: 45,
      ideal: '40-60%',
      status: 'good',
      icon: Droplets,
      description: 'Optimal moisture level maintained'
    },
    {
      name: 'Temperature',
      value: 24,
      ideal: '20-30°C',
      status: 'good',
      icon: Thermometer,
      description: 'Ideal temperature for seed germination'
    },
    {
      name: 'Conductivity',
      value: 1.2,
      ideal: '0.8-2.0 dS/m',
      status: 'good',
      icon: Zap,
      description: 'Good nutrient availability'
    }
  ];

  const nutrients = [
    { name: 'Nitrogen (N)', level: 78, status: 'high', color: 'bg-green-500' },
    { name: 'Phosphorus (P)', level: 45, status: 'medium', color: 'bg-yellow-500' },
    { name: 'Potassium (K)', level: 32, status: 'low', color: 'bg-red-500' },
    { name: 'Organic Matter', level: 67, status: 'good', color: 'bg-green-500' }
  ];

  const recommendations = [
    {
      title: 'Add Potassium Fertilizer',
      priority: 'high',
      description: 'Apply 50kg/hectare of potassium sulfate before next planting',
      icon: '🧪'
    },
    {
      title: 'Maintain Moisture Levels',
      priority: 'medium',
      description: 'Current moisture is optimal, continue current irrigation schedule',
      icon: '💧'
    },
    {
      title: 'Monitor pH Regularly',
      priority: 'low',
      description: 'pH is good but check weekly during growing season',
      icon: '📊'
    }
  ];

  const fertilizers = [
    {
      name: 'NPK 19:19:19',
      dosage: '200 kg/hectare',
      timing: 'Pre-planting',
      cost: '₹1,250/bag'
    },
    {
      name: 'Potassium Sulfate',
      dosage: '50 kg/hectare',
      timing: 'Immediate',
      cost: '₹850/bag'
    },
    {
      name: 'Organic Compost',
      dosage: '2 tonnes/hectare',
      timing: 'Before tillage',
      cost: '₹300/tonne'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
      case 'high':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'low':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
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
          <div>
            <h1 className="text-xl font-bold">Soil Health Analysis</h1>
            <p className="text-sm opacity-90">Field #1 - Last updated 2 hours ago</p>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-32 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2lsJTIwYWdyaWN1bHR1cmUlMjBlYXJ0aHxlbnwxfHx8fDE3NTcyNTM5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Soil health"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute top-4 left-4 text-white">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-600 text-white">Healthy Soil</Badge>
            <Badge variant="outline" className="bg-white/20 text-white border-white/30">Score: 78/100</Badge>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="nutrients">Nutrients</TabsTrigger>
            <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-4">
            {/* Soil Metrics */}
            <div className="grid grid-cols-2 gap-3">
              {soilMetrics.map((metric, index) => (
                <Card key={index} className="shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <metric.icon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{metric.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold">{metric.value}</span>
                      {getStatusIcon(metric.status)}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Ideal: {metric.ideal}</p>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recommendations */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl">{rec.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{rec.title}</span>
                        <Badge 
                          variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{rec.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrients" className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Nutrient Levels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {nutrients.map((nutrient, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{nutrient.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{nutrient.level}%</span>
                        {getStatusIcon(nutrient.status)}
                      </div>
                    </div>
                    <Progress value={nutrient.level} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Status: <span className="capitalize">{nutrient.status}</span>
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="shadow-md">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Quick Tips</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Test soil every 3-4 months for best results</li>
                  <li>• Add organic matter to improve soil structure</li>
                  <li>• Rotate crops to maintain nutrient balance</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fertilizer" className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Recommended Fertilizers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {fertilizers.map((fertilizer, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{fertilizer.name}</h4>
                      <span className="text-sm font-medium text-primary">{fertilizer.cost}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Dosage</p>
                        <p className="font-medium">{fertilizer.dosage}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Timing</p>
                        <p className="font-medium">{fertilizer.timing}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Order Now
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button className="w-full h-12 bg-primary hover:bg-primary/90">
              Schedule Soil Test
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}