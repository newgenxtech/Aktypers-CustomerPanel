import { ClassAttributes, InputHTMLAttributes, useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import useDebounce from "../hooks/useDebounce";
import searchIcon from "../assets/icons8-search-26.svg";
import exitIcon from "../assets/icons8-exit.png";

interface SearchComponentProps extends JSX.IntrinsicAttributes, ClassAttributes<HTMLInputElement>, InputHTMLAttributes<HTMLInputElement> {
    onHandleChange: (searchTerm: string) => void;
    postfix?: JSX.Element;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onHandleChange, ...props }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSearchTerm = useDebounce(searchTerm, 200);

    useEffect(() => {
        if (debouncedSearchTerm) {
            if (typeof debouncedSearchTerm === 'string') {
                onHandleChange(debouncedSearchTerm);
            }
        }
    }, [debouncedSearchTerm, onHandleChange]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                {...props}
            />
            {
                searchTerm ? (
                    <img src={exitIcon} alt="exit" style={{ width: '16px', height: '16px' }} onClick={() => setSearchTerm('')} />

                ) : (
                    <img src={searchIcon} alt="search" style={{ width: '16px', height: '16px' }} />
                )
            }
        </div>
    );
};

export default SearchComponent;