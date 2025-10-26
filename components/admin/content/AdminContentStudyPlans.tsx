import React from 'react';
import { StudyPlan } from '../../../types';
import PlusCircleIcon from '../../icons/PlusCircleIcon';

const AdminContentStudyPlans: React.FC<{ plans: StudyPlan[] }> = ({ plans }) => {
    return (
        <div>
            <div className="flex justify-end items-center mb-4">
                 <button className="flex items-center gap-2 bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90">
                    <PlusCircleIcon />
                    <span>Nuevo Plan de Estudio</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map(plan => (
                    <div key={plan.id} className="bg-brand-surface p-5 rounded-xl shadow-sm border border-border-color">
                        <h4 className="text-lg font-bold text-brand-text">{plan.name}</h4>
                        <p className="text-sm text-text-muted">{plan.subject} - {plan.grade}º Grado</p>
                        <div className="mt-4 pt-4 border-t border-border-color">
                            <p className="font-semibold text-brand-text">{plan.lessonIds.length} Lecciones Vinculadas</p>
                            <button className="text-sm font-semibold text-brand-secondary hover:underline mt-2">Administrar Lecciones &rarr;</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminContentStudyPlans;
