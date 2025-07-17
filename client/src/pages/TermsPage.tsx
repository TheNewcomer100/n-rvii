import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Users, Shield, AlertTriangle } from "lucide-react";

interface TermsPageProps {
  onBack: () => void;
}

const TermsPage = ({ onBack }: TermsPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="rounded-2xl text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Terms of Service Content */}
        <Card className="bg-white/90 backdrop-blur-lg border-0 rounded-3xl shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-100/60 to-blue-100/60 text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Terms of Service
            </CardTitle>
            <p className="text-gray-600 mt-2 text-lg">
              Building a supportive and safe community together
            </p>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            {/* Community Guidelines */}
            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-2xl flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Community Guidelines</h2>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <span>Be kind, supportive, and respectful to all community members</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span>Share your experiences to help others, but respect privacy</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span>No harassment, discrimination, or harmful content</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <span>Use content warnings for sensitive topics</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Service Usage */}
            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Using Nrvii</h2>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span>Nrvii is a supportive tool, not a replacement for professional care</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                    <span>You're responsible for your own content and interactions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span>Don't misuse the platform or attempt to harm others</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <span>We reserve the right to moderate content for safety</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Important Disclaimers */}
            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Important Disclaimers</h2>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <span>Nrvii is not a medical device or professional therapy service</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                    <span>Always seek professional help for serious mental health concerns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span>We provide tools for self-reflection, not medical advice</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span>In crisis situations, contact emergency services immediately</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Account Terms */}
            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-2xl flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Your Account</h2>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-100">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span>Keep your account secure and don't share login credentials</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <span>You can delete your account and data at any time</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span>We may suspend accounts that violate community guidelines</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <span>Notify us immediately if you suspect account compromise</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border border-blue-100">
              <p className="text-gray-600 leading-relaxed">
                Questions about our terms? We're committed to transparency and building 
                a safe, supportive community for everyone.
              </p>
              <p className="text-blue-600 font-medium mt-2">support@nrvii.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsPage;