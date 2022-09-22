import PropTypes from "prop-types";
import { useProfessions } from "../../hooks/useProfessions";

const Profession = ({ id }) => {
    const { getProfession, isLoading } = useProfessions();
    const prof = getProfession(id);
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
