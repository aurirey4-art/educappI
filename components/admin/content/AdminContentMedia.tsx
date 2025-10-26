import React from 'react';
import { MediaResource } from '../../../types';
import PlusCircleIcon from '../../icons/PlusCircleIcon';
import FilmIcon from '../../icons/FilmIcon';
import PhotoIcon from '../../icons/PhotoIcon';
import CubeIcon from '../../icons/CubeIcon';

const typeIcons = {
    image: <PhotoIcon />,
    video: <FilmIcon />,
    '3d_model': <CubeIcon />,
}

const AdminContentMedia: React.FC<{ media: MediaResource[] }> = ({ media }) => {
    return (
        <div>
             <div className="flex justify-between items-center mb-4">
                 <select className="border border-border-color rounded-lg py-2 px-3 text-sm focus:outline-none bg-brand-surface">
                    <option>Filtrar por tipo</option>
                    <option>Imagen</option>
                    <option>Video</option>
                    <option>Modelo 3D</option>
                </select>
                 <button className="flex items-center gap-2 bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90">
                    <PlusCircleIcon />
                    <span>Subir Archivo</span>
                </button>
            </div>
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {media.map(item => (
                    <div key={item.id} className="bg-brand-surface p-3 rounded-lg shadow-sm border border-border-color text-center group relative">
                        <div className="bg-brand-background h-24 flex items-center justify-center rounded-md text-brand-primary">
                            {typeIcons[item.type]}
                        </div>
                        <p className="text-xs font-semibold text-brand-text truncate mt-2">{item.name}</p>
                        <p className="text-xs text-text-muted">{item.size}</p>
                         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-white text-xs font-semibold hover:underline">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminContentMedia;
