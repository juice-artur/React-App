import { FaPlus } from "react-icons/fa";

interface HeaderProps {
    classNames?: string[];
    title: string
}


const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">{props.title}</div>
                <div className="flex items-center cursor-pointer" onClick={()=>{}}>
                    <FaPlus className="mx-2" />
                    <h1>Create new list</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;