import React from "react";

interface BaseBackgroundProps {
    children: React.ReactNode;
}

const BaseBackground: React.FC<BaseBackgroundProps> = ({ children }) => {

    return (
        <div className="dark:bg-gray-900">
            {children}
        </div>
    )
}

export default BaseBackground;