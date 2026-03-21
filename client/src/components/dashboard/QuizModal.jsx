import { useState } from 'react';
import { X, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

export default function QuizModal({ isOpen, onClose, topic, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0); // 0: Start, 1: Questions, 2: Result
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  // Mock questions based on topic
  const generateQuestions = (topicName) => {
    return [
      {
        id: 1,
        question: `What is the primary goal of ${topicName}?`,
        options: ['Efficiency', 'Complexity', 'Security', 'Performance'],
        correct: 0
      },
      {
        id: 2,
        question: `Which of these is a key component of ${topicName}?`,
        options: ['Modularity', 'Static Binding', 'Hardcoding', 'Manual Scaling'],
        correct: 0
      },
      {
        id: 3,
        question: `Identify the main advantage of using ${topicName} in production.`,
        options: ['Reduced Upfront Cost', 'Increased Maintenance', 'High Availability', 'Slower Recovery'],
        correct: 2
      }
    ];
  };

  const startQuiz = () => {
    setQuestions(generateQuestions(topic));
    setAnswers([]);
    setCurrentQuestionIdx(0);
    setCurrentStep(1);
  };

  const handleAnswer = (optionIdx) => {
    const newAnswers = [...answers, optionIdx];
    setAnswers(newAnswers);

    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      questions.forEach((q, idx) => {
        if (q.correct === newAnswers[idx]) correctCount++;
      });
      const finalScore = Math.round((correctCount / questions.length) * 100);
      setScore(finalScore);
      setCurrentStep(2);
      onComplete(finalScore);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden relative border border-white/20">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-ink-muted" />
        </button>

        <div className="p-8">
          {currentStep === 0 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-primary-600" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-ink mb-2">Module Quiz: {topic}</h2>
              <p className="text-ink-secondary text-sm mb-8 leading-relaxed">
                Test your knowledge on this module. Scoring above 70% will update your Skill Gap Report.
              </p>
              <button 
                onClick={startQuiz}
                className="btn-primary w-full !rounded-2xl !py-3.5"
              >
                Start Quiz
              </button>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">Question {currentQuestionIdx + 1} of {questions.length}</span>
                <div className="h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-ink mb-6">
                {questions[currentQuestionIdx].question}
              </h3>

              <div className="space-y-3">
                {questions[currentQuestionIdx].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-primary-200 hover:shadow-md transition-all duration-200 group flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-xs font-bold text-ink-muted group-hover:text-primary-600 transition-colors">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-sm font-medium text-ink-secondary group-hover:text-ink">{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-accent-green-light flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-accent-green" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-ink mb-2">Quiz Completed!</h2>
              <div className="text-4xl font-bold text-primary-600 mb-2">{score}%</div>
              <p className="text-ink-secondary text-sm mb-8">
                {score >= 70 
                  ? "Great job! Your skill gap report has been updated." 
                  : "Good effort. Review the module and try again to improve your score."}
              </p>
              <button 
                onClick={onClose}
                className="btn-primary w-full !rounded-2xl !py-3.5"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
