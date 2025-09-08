import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  Scan,
  AlertTriangle,
  CheckCircle,
  Bug,
  Leaf,
  Shield,
  Clock
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PestDetectionScreenProps {
  onBack: () => void;
}

export function PestDetectionScreen({ onBack }: PestDetectionScreenProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const recentDetections = [
    {
      date: '2 hours ago',
      pest: 'Aphids',
      confidence: 94,
      severity: 'Medium',
      crop: 'Tomato',
      status: 'treated'
    },
    {
      date: 'Yesterday',
      pest: 'Leaf Rust',
      confidence: 87,
      severity: 'High',
      crop: 'Wheat',
      status: 'pending'
    },
    {
      date: '3 days ago',
      pest: 'Cutworm',
      confidence: 92,
      severity: 'Low',
      crop: 'Cabbage',
      status: 'treated'
    }
  ];

  const handleImageUpload = () => {
    // Simulate image upload and analysis
    setSelectedImage("https://images.unsplash.com/photo-1719677488885-ac49a796ab3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGRpc2Vhc2UlMjBwZXN0JTIwaW5zZWN0fGVufDF8fHx8MTc1NzMyNzI4NXww&ixlib=rb-4.1.0&q=80&w=1080");
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        pest: 'Aphids',
        confidence: 92,
        severity: 'Medium',
        treatment: 'Insecticidal Soap Spray',
        description: 'Small, soft-bodied insects that feed on plant sap',
        urgency: 'Treat within 2-3 days'
      });
    }, 3000);
  };

  const handleTakePhoto = () => {
    // Simulate camera capture
    handleImageUpload();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'treated' ? 
      <CheckCircle className="w-4 h-4 text-green-600" /> : 
      <Clock className="w-4 h-4 text-yellow-600" />;
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
            <h1 className="text-xl font-bold">Pest Detection</h1>
            <p className="text-sm opacity-90">AI-powered identification</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Upload Section */}
        {!selectedImage && (
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Bug className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Identify Pests & Diseases</h3>
                <p className="text-muted-foreground text-sm">
                  Take a clear photo of affected leaves or plants for accurate identification
                </p>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleTakePhoto}
                  className="w-full h-14 bg-primary hover:bg-primary/90"
                >
                  <Camera className="w-6 h-6 mr-2" />
                  Take Photo
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleImageUpload}
                  className="w-full h-14"
                >
                  <Upload className="w-6 h-6 mr-2" />
                  Upload from Gallery
                </Button>
              </div>

              <Alert className="text-left">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  For best results, take photos in good lighting with clear focus on affected areas
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Analysis Section */}
        {selectedImage && (
          <Card className="shadow-lg">
            <CardContent className="p-4 space-y-4">
              <div className="relative">
                <ImageWithFallback
                  src={selectedImage}
                  alt="Uploaded plant image"
                  className="w-full h-48 object-cover rounded-lg"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Scan className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                      <p className="text-sm">Analyzing image...</p>
                    </div>
                  </div>
                )}
              </div>

              {analysisResult && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{analysisResult.pest}</h3>
                    <Badge variant={getSeverityColor(analysisResult.severity)}>
                      {analysisResult.severity} Risk
                    </Badge>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Confidence Level</span>
                      <span className="text-lg font-bold text-primary">{analysisResult.confidence}%</span>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Description:</strong> {analysisResult.description}</p>
                      <p className="text-sm"><strong>Recommended Treatment:</strong> {analysisResult.treatment}</p>
                      <p className="text-sm"><strong>Urgency:</strong> {analysisResult.urgency}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline">
                      <Shield className="w-4 h-4 mr-2" />
                      Treatment Guide
                    </Button>
                    <Button>
                      <Leaf className="w-4 h-4 mr-2" />
                      Buy Treatment
                    </Button>
                  </div>
                </div>
              )}

              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedImage(null);
                  setAnalysisResult(null);
                  setIsAnalyzing(false);
                }}
                className="w-full"
              >
                Analyze Another Image
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Recent Detections */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Recent Detections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentDetections.map((detection, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{detection.pest}</span>
                    <Badge variant={getSeverityColor(detection.severity)} className="text-xs">
                      {detection.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {detection.crop} • {detection.date} • {detection.confidence}% confidence
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(detection.status)}
                  <span className="text-xs capitalize">{detection.status}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              Photography Tips
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Take photos in bright, natural light</li>
              <li>• Focus on affected areas with clear details</li>
              <li>• Include surrounding healthy areas for comparison</li>
              <li>• Take multiple angles if possible</li>
              <li>• Avoid blurry or distant shots</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}