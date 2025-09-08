import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Mic, 
  Send, 
  MessageCircle, 
  Phone, 
  Mail,
  Star,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  MicIcon,
  HelpCircle,
  BookOpen,
  Video
} from 'lucide-react';

interface FeedbackScreenProps {
  onBack: () => void;
}

export function FeedbackScreen({ onBack }: FeedbackScreenProps) {
  const [activeTab, setActiveTab] = useState('feedback');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const faqs = [
    {
      question: 'How accurate is the crop recommendation?',
      answer: 'Our AI model has 90%+ accuracy based on soil conditions, weather data, and local farming practices.',
      category: 'AI Features'
    },
    {
      question: 'Can I use the app without internet?',
      answer: 'Some features work offline, but real-time weather and price updates require internet connection.',
      category: 'Technical'
    },
    {
      question: 'How do I add my own field data?',
      answer: 'Go to Profile > My Fields and add field details including size, crop history, and soil type.',
      category: 'App Usage'
    },
    {
      question: 'Is pest detection available for all crops?',
      answer: 'Currently supports 50+ major crops. We\'re constantly adding more based on user requests.',
      category: 'AI Features'
    },
    {
      question: 'How often are market prices updated?',
      answer: 'Prices are updated multiple times daily from major mandis across India.',
      category: 'Market Data'
    }
  ];

  const helpResources = [
    {
      title: 'Getting Started Guide',
      description: 'Complete walkthrough of all app features',
      type: 'guide',
      icon: BookOpen,
      duration: '10 min read'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video instructions',
      type: 'video',
      icon: Video,
      duration: '15 videos'
    },
    {
      title: 'Voice Commands List',
      description: 'All supported voice commands',
      type: 'reference',
      icon: Volume2,
      duration: '5 min read'
    }
  ];

  const supportChannels = [
    {
      type: 'WhatsApp',
      contact: '+91-9876543210',
      hours: '24/7 Available',
      icon: MessageCircle,
      color: 'bg-green-500'
    },
    {
      type: 'Phone Support',
      contact: '1800-FARMER (1800-327637)',
      hours: '6 AM - 10 PM',
      icon: Phone,
      color: 'bg-blue-500'
    },
    {
      type: 'Email Support',
      contact: 'help@crophelper.com',
      hours: '24-48 hour response',
      icon: Mail,
      color: 'bg-purple-500'
    }
  ];

  const handleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording logic here
      setTimeout(() => {
        setIsRecording(false);
        setFeedback(feedback + " Voice feedback recorded successfully.");
      }, 3000);
    }
  };

  const handleSubmitFeedback = () => {
    if (feedback.trim() || rating > 0) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFeedback('');
        setRating(0);
      }, 2000);
    }
  };

  const renderStars = (interactive = false) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-8 h-8 cursor-pointer transition-colors ${
              star <= rating 
                ? 'text-yellow-500 fill-yellow-500' 
                : 'text-gray-300 hover:text-yellow-400'
            }`}
            onClick={interactive ? () => setRating(star) : undefined}
          />
        ))}
      </div>
    );
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
            <h1 className="text-xl font-bold">Help & Feedback</h1>
            <p className="text-sm opacity-90">We're here to help you</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Tab Navigation */}
        <div className="flex gap-2">
          <Button 
            variant={activeTab === 'feedback' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('feedback')}
            className="flex-1"
          >
            Feedback
          </Button>
          <Button 
            variant={activeTab === 'help' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('help')}
            className="flex-1"
          >
            Help
          </Button>
          <Button 
            variant={activeTab === 'contact' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('contact')}
            className="flex-1"
          >
            Contact
          </Button>
        </div>

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <div className="space-y-6">
            {showSuccess && (
              <Card className="shadow-lg border-2 border-green-500">
                <CardContent className="p-4 text-center">
                  <ThumbsUp className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-700">Thank You!</h3>
                  <p className="text-sm text-green-600">Your feedback has been submitted successfully.</p>
                </CardContent>
              </Card>
            )}

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Rate Your Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  {renderStars(true)}
                  <p className="text-sm text-muted-foreground mt-2">
                    {rating === 0 && "Tap stars to rate"}
                    {rating === 1 && "Poor - Needs improvement"}
                    {rating === 2 && "Fair - Could be better"}
                    {rating === 3 && "Good - Satisfactory"}
                    {rating === 4 && "Very Good - Almost perfect"}
                    {rating === 5 && "Excellent - Loved it!"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Share Your Thoughts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Textarea
                    placeholder="Tell us about your experience, suggestions for improvement, or report any issues..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[120px] text-base"
                  />
                  
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={handleRecording}
                      className={`flex-1 h-12 ${isRecording ? 'bg-red-100 border-red-300' : ''}`}
                    >
                      <Mic className={`w-5 h-5 mr-2 ${isRecording ? 'animate-pulse text-red-500' : ''}`} />
                      {isRecording ? 'Recording...' : 'Voice Feedback'}
                    </Button>
                    
                    <Button 
                      onClick={handleSubmitFeedback}
                      disabled={!feedback.trim() && rating === 0}
                      className="flex-1 h-12 bg-primary hover:bg-primary/90"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Submit
                    </Button>
                  </div>
                </div>

                <div className="bg-accent/20 rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Voice Support Available
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    You can provide feedback using voice commands. Say "Record feedback" to start.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Feedback Options */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Quick Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12 flex flex-col gap-1">
                    <ThumbsUp className="w-5 h-5" />
                    <span className="text-xs">App is Great</span>
                  </Button>
                  <Button variant="outline" className="h-12 flex flex-col gap-1">
                    <ThumbsDown className="w-5 h-5" />
                    <span className="text-xs">Report Issue</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Help Tab */}
        {activeTab === 'help' && (
          <div className="space-y-6">
            {/* Help Resources */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Help Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {helpResources.map((resource, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <resource.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{resource.title}</h4>
                      <p className="text-xs text-muted-foreground">{resource.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {resource.duration}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {faqs.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted">
                      <span className="font-medium text-sm">{faq.question}</span>
                      <Badge variant="outline" className="text-xs">
                        {faq.category}
                      </Badge>
                    </summary>
                    <div className="p-3 text-sm text-muted-foreground">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Get Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportChannels.map((channel, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 border border-border rounded-lg">
                    <div className={`w-12 h-12 ${channel.color} rounded-full flex items-center justify-center`}>
                      <channel.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{channel.type}</h4>
                      <p className="text-sm text-muted-foreground">{channel.contact}</p>
                      <p className="text-xs text-muted-foreground">{channel.hours}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Support */}
            <Card className="shadow-md border-2 border-destructive/20">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-destructive mb-2">Emergency Support</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For urgent farming emergencies or critical app issues
                </p>
                <Button variant="destructive" className="w-full h-12">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency Helpline
                </Button>
              </CardContent>
            </Card>

            {/* Feedback Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Your Name" />
                <Input placeholder="Phone Number" type="tel" />
                <Input placeholder="Subject" />
                <Textarea placeholder="Describe your issue or question..." />
                <Button className="w-full h-12 bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}