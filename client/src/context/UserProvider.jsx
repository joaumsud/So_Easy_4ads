import React from "react";

const UserContext = React.createContext(null);

const useUser = () => {
    const [user, setUser] = React.useContext(UserContext);

    const handleUser = (value) => {
        setUser(value);
        localStorage.setItem("user", JSON.stringify(value));
    };

    return { value: user, onChange: handleUser };
};

const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState(
        JSON.parse(localStorage.getItem("user"))
    );

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, useUser };
