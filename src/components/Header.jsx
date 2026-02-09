
import React from 'react';
import { FileJson } from 'lucide-react';

export default function Header() {
    return (
        <header className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FileJson className="w-6 h-6" />
                    <h1 className="text-xl font-bold">Data Generator</h1>
                </div>
            </div>
        </header>
    );
}
