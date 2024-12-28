import React, { useState, useEffect } from 'react';
import SakshamImg from '../assets/Saksham.webp';
import SankalpaImg from '../assets/Sankalpa.webp';
import SaritaImg from '../assets/Sarita.webp'
import SamjhanaImg from '../assets/Samjhana.webp'
import SushankImg from '../assets/Sushank.webp'
const EducatorCard = ({ educator }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
      onClick={() => setShowDetails(!showDetails)}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className="flex flex-col items-center p-4">
        <div className="w-40 h-40 mb-4">
          <img
            src={educator.photo || "/api/placeholder/200/200"}
            alt={educator.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h3 className="font-bold text-lg text-center text-blue-900">{educator.name}</h3>
        
        <div 
          className={`w-full bg-gray-50 p-4 rounded-md mt-4 transition-all duration-300 ${
            showDetails ? 'opacity-100 max-h-48' : 'opacity-0 max-h-0 overflow-hidden'
          }`}
        >
          <ul className="space-y-1 text-gray-600">
            {educator.age && (
              <li className="flex justify-between">
                <span className="font-medium">Age:</span>
                <span>{educator.age}</span>
              </li>
            )}
            {educator.education && (
              <li className="flex justify-between">
                <span className="font-medium">Education:</span>
                <span>{educator.education}</span>
              </li>
            )}
            {educator.subject && (
              <li className="flex justify-between">
                <span className="font-medium">Subject:</span>
                <span>{educator.subject}</span>
              </li>
            )}
            {educator.College && (
              <li className="flex justify-between">
                <span className="font-medium">College:</span>
                <span>{educator.College}</span>
              </li>
            )}
            {educator.University && (
              <li className="flex justify-between">
                <span className="font-medium">University:</span>
                <span className="truncate">{educator.University}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const EducatorsHero = () => {
  const motivationalQuotes = [
    "शिक्षा सबैभन्दा बलियो हतियार हो, जसले संसारलाई परिवर्तन गर्न सक्छ।",
    "सिक्ने र पढ्ने कुनै उमेर हुँदैन।",
    "शिक्षा जीवनको तयारी होइन, यो स्वयं जीवन हो।",
    "ज्ञान भनेको उज्यालो हो, अज्ञानता भनेको अन्धकार।",
    "सीप सिकाउनु भनेको जीवनभर आत्मनिर्भर बनाउन सिकाउनु हो।",
    "सफलता खुशीको कुञ्जी होइन, खुशी सफलता को कुञ्जी हो।",
    "सच्चा शिक्षा व्यक्तिलाई आफ्नो शक्ति पहिचान गर्न सहयोग गर्छ।",
    "हरेक बच्चा एक विशेष प्रतिभा लिएर जन्मिन्छ।",
    "ज्ञान बाँड्दा कहिल्यै घट्दैन।",
    "शिक्षाको उद्देश्य खाली दिमागलाई खुला बनाउनु हो।",
    "तपाईंको दृढ संकल्प नै तपाईंको शक्ति हो।",
    "सपना देख्नु सुरु गर्नुहोस्, सफलता नजिक हुनेछ।",
    "हामीलाई पराजयले होइन, प्रयासको अभावले रोक्छ।",
    "आजको सिकाइ भोलिको सफलताको आधार हो।",
    "शिक्षा भनेको प्रकाश हो, जसले अज्ञानताको अन्धकारलाई हटाउँछ।",
    "सर्वश्रेष्ठ शिक्षकहरूले कहाँ हेर्नुपर्ने देखाउँछन्, तर के देख्नुपर्ने भन्ने बताउँदैनन्।",
    "ज्ञान प्राप्त गर्नु भनेको भविष्य निर्माण गर्नु हो।",
    "सिकाइ एक यात्रा हो, गन्तव्य होइन।",
    "पढाइ भनेको केवल परीक्षा पास गर्नु होइन, यो ज्ञानको खोजी हो।",
    "जो कहिल्यै प्रयास गर्दैन, उसले कहिल्यै गल्ती गर्दैन।",
    "शिक्षा भनेको आत्मा जागृत गर्ने प्रक्रिया हो।",
    "ज्ञान केवल शक्ति होइन, यो जिम्मेवारी पनि हो।",
    "सपना ठूलो देख्नुहोस्, र त्यसलाई पूरा गर्न योजना बनाउनुहोस्।",
    "सीप र मेहनतले सफलता सुनिश्चित गर्छ।",
    "बुझ्नको लागि सिक्ने प्रयास गर्नुहोस्, सम्झिनको लागि होइन।",
    "अध्ययन केवल पुस्तकमै सीमित हुँदैन, यो चारैतिर छ।",
    "आजको लगानी भोलिको लाभ हो।",
    "सिक्न छोड्नु भनेको बाँच्न छोड्नु हो।",
    "जसले सिक्न कहिल्यै रोक्दैन, उही मानिस सधैं अगाडि बढ्छ।",
    "प्रेरणा भनेको आगो हो, जसलाई हामी आफैंले जलाउनु पर्छ।",
    "ज्ञानको साँचो मूल्य यसको उपयोगमा छ।",
    "सपना देख्नुको अर्थ हो, सम्भावना देख्नु।",
    "ज्ञान जीवनभर तपाईंको साथ रहने मित्र हो।",
    "कठिनाइहरू नै तपाईलाई बलियो बनाउँछ।",
    "हर एक गल्ती भनेको सिक्नको लागि नयाँ अवसर हो।",
    "सफलता प्रयास गर्नेहरूको साथमा हुन्छ।",
    "कठिन परिश्रम र धैर्य नै सफलता पाउने सूत्र हो।",
    "शिक्षा भनेको सोच्न सिकाउने कलाको रूपमा लिनुहोस्।",
    "प्रत्येक दिन केही नयाँ सिक्नुहोस्।",
    "छोटो लक्ष्य होइन, ठूलो सपना देख्नुहोस्।",
    "ज्ञान कहिल्यै पुरानो हुँदैन।",
    "सिकाइ भनेको सधैं एक अवसर हो।",
    "आफ्नो सपना पूरा गर्न कहिल्यै रोकिएर नबस्नुहोस्।",
    "शिक्षाले व्यक्तिलाई आत्मनिर्भर बनाउँछ।",
    "पढाइ केवल पुस्तकमा सीमित छैन।",
    "सिकाइलाई आफ्नो जीवनको हिस्सा बनाउनुहोस्।",
    "शिक्षाले तपाईंको चरित्र निर्माण गर्छ।",
    "ज्ञान नै वास्तविक सम्पत्ति हो।",
    "तपाईं जहाँ हुनुहुन्छ, त्यहीँबाट सुरु गर्नुहोस्।",
    "आफ्नो लक्ष्य स्पष्ट राख्नुहोस्, सफलता आफैँ आउँछ।",
    // Add more quotes here...
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % motivationalQuotes.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const educators = [
    {
      name: "Saksham Rijal",
      education: "BE in Computer Engineering",
      College: "Pashchimanchal Campus (WRC)",
      University: "Tribhuvan University (TU)",
      photo: SakshamImg,
    },
    {
      name: "Sankalpa Poudal",
      education: "BSc Forestry",
      College: "Kathmandu Forestry College",
      University: "Tribhuvan University (TU)",
      photo: SankalpaImg,
    },
    {
      name: "Sarita budha chhetri",
      education: "---",
      College: "---",
      University: "---",
      photo: SaritaImg,
    },
    {
      name: "Samjhana Bohora",
      education: "---",
      College: "---",
      University: "---",
      photo: SamjhanaImg,
    },
    {
      name: "Sushank Lamichhane",
      education: "BSc IT",
      College: "Infomax College of IT and Mgt",
      University: "Asia Pacific University(APU)",
      photo: SushankImg,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg p-6 rounded-lg text-center mb-8 max-w-4xl mx-auto">
          <p className="text-2xl text-blue-900 font-semibold italic">
            {motivationalQuotes[quoteIndex]}
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-900 mb-4">
          Educators/Mentors
        </h1>
        
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
          We provide comprehensive free test preparation services for +2 science students under the NEB curriculum. 
          Our experienced educators are committed to helping students excel in their studies through personalized 
          guidance and quality education.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {educators.map((educator, index) => (
            <div key={index} className="flex justify-center">
              <EducatorCard educator={educator} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducatorsHero;
