import React, { useState } from 'react';

const FAQ = [
    {
        question: "What is included in the free test series?",
        answer: "Our free test series includes mock exams, chapter-wise tests, and full-length model papers aligned with the latest NEB Class 12 Science syllabus."
    },
    {
        question: "Why should I join this program?",
        answer: "We offer high-quality resources for free, including expert-designed test series, personalized feedback, and guidance to help you excel in your studies."
    },
    {
        question: "How can I access the free test series?",
        answer: "You can register on our platform and access the test series through your dashboard. It's simple, quick, and completely free."
    },
    {
        question: "What is the NEB board?",
        answer: "The Nepal Education Board (NEB) is responsible for overseeing secondary education in Nepal, including curriculum development, examination conduction, and certification."
    },
    {
        question: "What subjects are offered in Class 12 Science?",
        answer: "Class 12 Science under NEB includes subjects like Physics, Chemistry, Biology, Mathematics, and Computer Science."
    },
    {
        question: "How is the NEB Class 12 examination structured?",
        answer: "The NEB Class 12 exams are divided into theory and practical components, focusing on assessing both conceptual understanding and applied skills."
    }
];

const AboutSection = () => {
    const [openFAQIndex, setOpenFAQIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenFAQIndex(openFAQIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-blue-50 py-12 px-6 flex flex-col justify-center items-center">
            <div className="max-w-6xl w-full text-left">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-blue-900 mb-4">About Us</h1>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        Our mission is to empower NEB Class 12 Science students with free, high-quality educational resources tailored to their academic success. Through our platform, we strive to bridge educational gaps and provide equal opportunities for all students. Here's what we offer:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 text-lg mb-8">
                        <li>Comprehensive and up-to-date test series aligned with the latest syllabus.</li>
                        <li>Chapter-wise and full-length mock tests for targeted preparation.</li>
                        <li>Personalized feedback to help identify strengths and areas for improvement.</li>
                        <li>Access to expert guidance and support throughout your journey.</li>
                    </ul>
                </div>
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">Why Join Us?</h2>
                    <p className="text-gray-700 text-lg mb-6">
                        Choosing our platform provides you with the tools and resources to excel in your NEB Class 12 Science examinations. Here's why we stand out:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 text-lg">
                        <li>Free access to all materials, including test series and mock exams.</li>
                        <li>Designed and reviewed by subject matter experts.</li>
                        <li>User-friendly online platform accessible anytime, anywhere.</li>
                        <li>Focused on both conceptual clarity and practical application.</li>
                    </ul>
                </div>
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">About NEB and Class 12 Science</h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        The Nepal Education Board (NEB) plays a crucial role in managing secondary and higher secondary education in Nepal. Class 12 Science offers a curriculum designed to prepare students for careers in Medicine, Engineering, IT, and more. With a balance of theoretical and practical knowledge, it ensures readiness for higher education and professional success.
                    </p>
                </div>
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-4">FAQs</h2>
                    <div className="space-y-4">
                        {FAQ.map((item, index) => (
                            <div key={index} className="border-b border-gray-300 pb-4">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left text-lg text-blue-700 font-medium focus:outline-none"
                                >
                                    {item.question}
                                </button>
                                {openFAQIndex === index && (
                                    <p className="mt-2 text-gray-600">{item.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;