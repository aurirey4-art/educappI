import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import WandSparklesIcon from '../icons/WandSparklesIcon';

// IMPORTANT: This component assumes process.env.API_KEY is available in the environment.

const AdminAIGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('Fracciones equivalentes del libro de texto de la SEP para 5º grado.');
    const [step, setStep] = useState(0); // 0: initial, 1: analyzed, 2: generated
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [generatedLesson, setGeneratedLesson] = useState(null);

    const handleAnalyze = async () => {
        setIsLoading(true);
        setError('');
        // Simulate API call for analysis
        setTimeout(() => {
            setAnalysisResult({
                source: "Libro de Matemáticas, 5º Grado, SEP",
                keyConcepts: ["Definición de fracción", "Numerador y denominador", "Amplificación", "Simplificación"],
                chapters: ["Capítulo 3: Fracciones y Decimales"],
            });
            setStep(1);
            setIsLoading(false);
        }, 1500);
    };

    const handleGenerate = async () => {
        if (!process.env.API_KEY) {
            setError('API Key no encontrada.');
            return;
        }
        setIsLoading(true);
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Genera una lección interactiva para niños de 5º grado sobre "Fracciones Equivalentes". Incluye una introducción, una explicación de amplificación y simplificación, 3 ejercicios prácticos y 2 preguntas de quiz. Formatea la respuesta en JSON.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            introduction: { type: Type.STRING },
                            amplification: { type: Type.STRING },
                            simplification: { type: Type.STRING },
                            exercises: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            },
                            quiz: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            }
                        }
                    }
                }
            });

            const lessonJson = JSON.parse(response.text);
            setGeneratedLesson(lessonJson);
            setStep(2);
        } catch (e) {
            console.error('Error generando contenido:', e);
            setError('Ocurrió un error al generar la lección.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const resetGenerator = () => {
        setStep(0);
        setAnalysisResult(null);
        setGeneratedLesson(null);
        setError('');
    }

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-extrabold text-brand-text mb-2">Generador de Lecciones Inteligente</h2>
            <p className="text-text-muted mb-8">Crea contenido educativo interactivo en minutos.</p>
            
            <div className="bg-brand-surface p-6 rounded-2xl shadow-sm border border-border-color">
                {/* Step 0: Prompt Input */}
                {step === 0 && (
                    <>
                        <label htmlFor="prompt" className="block text-sm font-semibold text-text-muted mb-1">
                            1. Describe el tema o recurso a analizar
                        </label>
                        <textarea
                            id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)}
                            className="w-full p-2 border border-border-color rounded-lg bg-brand-background"
                            rows={3}
                        />
                        <button onClick={handleAnalyze} disabled={isLoading || !prompt} className="mt-4 w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 disabled:bg-opacity-50">
                            {isLoading ? 'Analizando...' : 'Analizar Fuente'}
                        </button>
                    </>
                )}

                {/* Step 1: Analysis Result */}
                {step >= 1 && analysisResult && (
                    <div>
                        <h3 className="font-bold text-brand-text">2. Análisis de Contenido</h3>
                        <div className="bg-brand-background p-4 rounded-lg mt-2 text-sm">
                            <p><strong>Fuente:</strong> {analysisResult.source}</p>
                            <p><strong>Conceptos Clave:</strong> {analysisResult.keyConcepts.join(', ')}</p>
                        </div>
                         {step === 1 && (
                            <button onClick={handleGenerate} disabled={isLoading} className="mt-4 w-full flex items-center justify-center gap-2 bg-brand-accent text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 disabled:bg-opacity-50">
                                {isLoading ? 'Generando...' : <><WandSparklesIcon/> Generar Lección</>}
                            </button>
                         )}
                    </div>
                )}

                {/* Step 2: Generated Lesson */}
                {step === 2 && generatedLesson && (
                    <div className="mt-6 pt-6 border-t border-border-color">
                         <h3 className="font-bold text-brand-text">3. Vista Previa de la Lección</h3>
                         <div className="bg-brand-background p-4 rounded-lg mt-2 space-y-3 prose max-w-none text-brand-text">
                            <h4>{generatedLesson.title}</h4>
                            <p>{generatedLesson.introduction}</p>
                            <h5>Amplificación</h5>
                            <p>{generatedLesson.amplification}</p>
                            <h5>Simplificación</h5>
                            <p>{generatedLesson.simplification}</p>
                            <h5>Ejercicios</h5>
                            <ul>{generatedLesson.exercises.map((ex, i) => <li key={i}>{ex}</li>)}</ul>
                            <h5>Quiz Rápido</h5>
                            <ol>{generatedLesson.quiz.map((q, i) => <li key={i}>{q}</li>)}</ol>
                            <p className="text-sm text-brand-accent font-semibold">[Sugerencia IA: Incluir modelo 3D de un pastel para visualizar fracciones]</p>
                         </div>
                         <div className="flex gap-4 mt-4">
                            <button className="flex-1 bg-brand-primary text-white font-semibold py-2 rounded-lg">Aprobar y Publicar</button>
                            <button className="flex-1 bg-brand-surface border border-border-color text-brand-text font-semibold py-2 rounded-lg">Guardar Borrador</button>
                            <button onClick={resetGenerator} className="text-sm text-text-muted hover:underline">Empezar de nuevo</button>
                         </div>
                    </div>
                )}
                 {error && <p className="text-sm text-status-overdue mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default AdminAIGenerator;
