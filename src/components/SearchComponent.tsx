import { ClassAttributes, InputHTMLAttributes, useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import useDebounce from "../hooks/useDebounce";

interface SearchComponentProps extends JSX.IntrinsicAttributes, ClassAttributes<HTMLInputElement>, InputHTMLAttributes<HTMLInputElement> {
    onHandleChange: (searchTerm: string) => void;
    postfix?: JSX.Element;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onHandleChange, ...props }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSearchTerm = useDebounce(searchTerm, 200);

    useEffect(() => {
        // if (debouncedSearchTerm) {
        if (typeof debouncedSearchTerm === 'string') {
            onHandleChange(debouncedSearchTerm);
        }
        // }
    }, [debouncedSearchTerm, onHandleChange]);

    return (
        // <div>
        <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            {...props}
        />
        // </div>
    );
};

export default SearchComponent;