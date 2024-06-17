import React from "react";

interface ButtonProps {
    handleDeleteClick: () => void;
}

const ResetButton: React.FC<ButtonProps> = ({handleDeleteClick}) => {
    const classNameForButton = "relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-600 to-orange-500 group-hover:from-red-600 group-hover:to-orange-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800";

    const classNameForSpan = "relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0";

    return (
        <button
            type="submit"
            onClick={handleDeleteClick}
            className={classNameForButton}
        >
            <span className={classNameForSpan}>
                All Reset
            </span>
        </button>
    )
        ;
}

export default ResetButton;