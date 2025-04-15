import { createContext, useContext } from "react";
import { profileData } from "../assets/Data/data";

// create context
export const ArtisanContext = createContext()




//  custom hook to use the context
export const useArtisanContext = () => useContext(ArtisanContext)

// provider component
const ArtisanProvider = ({ children }) => {
    // To get all the category
    const categories = ["All", ...new Set(profileData.map((data) => (data.role))), "Other"]
    console.log(categories)

    // To get all the state

    const contextValue = { profileData, categories }
    return (
        <ArtisanContext.Provider value={contextValue}>
            {children}
        </ArtisanContext.Provider>
    )

}
export default ArtisanProvider