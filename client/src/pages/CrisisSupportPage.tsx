import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Phone, MessageCircle, Clock, Globe } from "lucide-react";

const CrisisSupportPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => window.history.back()}
            variant="ghost"
            size="sm"
            className="rounded-2xl text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Crisis Support Content */}
        <Card className="bg-white/90 backdrop-blur-lg border-0 rounded-3xl shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-pink-100/60 to-purple-100/60 text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Crisis Support
            </CardTitle>
            <p className="text-gray-600 mt-2 text-lg">
              You're not alone. Help is available 24/7.
            </p>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            {/* Emergency Notice */}
            <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl p-6 border-2 border-red-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-red-800">Immediate Emergency</h2>
              </div>
              <p className="text-red-700 text-lg font-medium mb-3">
                If you're in immediate danger or having thoughts of suicide:
              </p>
              <div className="space-y-2">
                <p className="text-red-800 font-bold text-xl">🚨 Call 911 or go to your nearest emergency room</p>
                <p className="text-red-700">🏥 Text "HELLO" to 741741 for Crisis Text Line</p>
                <p className="text-red-700">📞 Call 988 for Suicide & Crisis Lifeline (US)</p>
              </div>
            </div>

            {/* Crisis Hotlines */}
            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">24/7 Crisis Support Lines</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
                  <h3 className="font-bold text-purple-800 mb-3 flex items-center space-x-2">
                    <Phone className="w-5 h-5" />
                    <span>United States</span>
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>988</strong> - Suicide & Crisis Lifeline</li>
                    <li><strong>1-866-488-7386</strong> - Trevor Project (LGBTQ+)</li>
                    <li><strong>1-800-273-8255</strong> - Veterans Crisis Line</li>
                    <li><strong>1-800-366-8288</strong> - Self-Injury Outreach</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
                  <h3 className="font-bold text-green-800 mb-3 flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>International</span>
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>UK:</strong> 116 123 (Samaritans)</li>
                    <li><strong>Canada:</strong> 1-833-456-4566</li>
                    <li><strong>Australia:</strong> 13 11 14 (Lifeline)</li>
                    <li><strong>Global:</strong> befrienders.org</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Text & Chat Support */}
            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Text & Chat Support</h2>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 border border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-blue-800 mb-3">Crisis Text Line</h3>
                    <p className="text-gray-700 mb-2">Text <strong>HELLO</strong> to <strong>741741</strong></p>
                    <p className="text-sm text-gray-600">Free, confidential, 24/7 crisis support</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-green-800 mb-3">Online Chat</h3>
                    <p className="text-gray-700 mb-2">suicidepreventionlifeline.org</p>
                    <p className="text-sm text-gray-600">Live chat with trained counselors</p>
                  </div>
                </div>
              </div>
            </section>

            {/* What to Expect */}
            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">What to Expect</h2>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border border-orange-100">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <span>Trained counselors who understand crisis situations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                    <span>Confidential, non-judgmental support</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span>Help developing a safety plan</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span>Connection to local resources and ongoing support</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Support Someone Else */}
            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-2xl flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Supporting Others</h2>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
                <p className="text-gray-700 mb-4">
                  If someone you know is in crisis:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <span>Listen without judgment and take their feelings seriously</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span>Encourage them to call a crisis line or seek professional help</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span>Stay with them or ensure they're not alone</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <span>Remove any means of self-harm if safely possible</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Reminder */}
            <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
              <Heart className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <p className="text-gray-700 leading-relaxed text-lg">
                Your life has value. You matter. There are people who want to help you through this difficult time.
              </p>
              <p className="text-purple-600 font-medium mt-3">
                Crisis support is free, confidential, and available 24/7.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrisisSupportPage;