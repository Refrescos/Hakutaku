// ProgressBar.tsx
'use client';

import React from 'react';

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
    <div className="w-full bg-gray-200 rounded-full">
        <div
            className="bg-[#ED8936 text-xs font-medium text-center text-white rounded-full"
            style={{ width: `${value}%`, height: '30%' }}
        >
            {value}%
        </div>
    </div>
);

export default ProgressBar;
