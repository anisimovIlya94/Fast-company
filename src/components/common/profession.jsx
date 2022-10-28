import React, {useEffect} from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionById, getProfessionsStatus, loadProfessionsList } from "../../store/professions";

const Profession = ({ id }) => {
    const prof = useSelector(getProfessionById(id))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadProfessionsList());
    },[])
    const isLoading = useSelector(getProfessionsStatus())
    if (!isLoading) {
        return prof.name;
    } else {
        return "Loading...";
    }
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
