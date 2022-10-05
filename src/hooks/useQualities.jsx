import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const QualityContext = React.createContext();

export const useQualities = () => {
    return useContext(QualityContext);
};

const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getQualitiesList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    const getQualitiesList = async () => {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };
    const errorCatcher = (error) => {
        const { message } = error.response.data;
        setError(message);
    };
    const getQuality = (id) => {
        return qualities.find((qual) => qual._id === id);
    };
    return (<QualityContext.Provider value={{ qualities, isLoading, getQuality }}>
        {children}
    </QualityContext.Provider>
    );
};
QualityProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default QualityProvider;
