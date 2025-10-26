import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import AdminContentLessons from './content/AdminContentLessons';
import AdminContentStudyPlans from './content/AdminContentStudyPlans';
import AdminContentMedia from './content/AdminContentMedia';

type ActiveTab = 'lessons' | 'plans' | 'media';

const AdminContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('lessons');
    const { data } = useData();

    const renderTabContent = () => {
        switch (activeTab) {
            case 'lessons': return <AdminContentLessons lessons={data.lessons} users={data.users} />;
            case 'plans': return <AdminContentStudyPlans plans={data.studyPlans} />;
            case 'media': return <AdminContentMedia media={data.mediaResources} />;
            default: return null;
        }
    };

    const TabButton: React.FC<{ tabName: ActiveTab; label: string }> = ({ tabName, label }) => (
        <button 
            onClick={() => setActiveTab(tabName)}
            className={`px-4 py-2 font-semibold transition-colors duration-200 ${activeTab === tabName ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-text-muted hover:text-brand-primary'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-extrabold text-brand-text mb-6">Gestión de Contenido</h2>
            
            <div className="flex border-b border-border-color mb-6">
                <TabButton tabName="lessons" label={`Lecciones (${data.lessons.length})`} />
                <TabButton tabName="plans" label={`Planes de Estudio (${data.studyPlans.length})`} />
                <TabButton tabName="media" label={`Biblioteca Multimedia (${data.mediaResources.length})`} />
            </div>

            <div>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default AdminContent;