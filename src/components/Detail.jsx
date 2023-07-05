import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import { BiSolidArchiveIn } from "react-icons/bi"
import { showFormattedDate } from "../utils/index";

function Detail({ id, title, body, createdAt, archived, onDelete, onArchive }) {
  const formattedDate = showFormattedDate(createdAt);

  return (
    <div className="section">
      <div className="content">
        <h2 className="detail-page__title">{title}</h2>
        <p className="detail-page__createAt">{formattedDate}</p>
        <p className="detail-page__body">{body}</p>
        <p>{archived}</p>
        <div className="detail-page__action">
          <button className="action" type="button" onClick={() => onArchive(id)}>
            <BiSolidArchiveIn />
          </button>
          <button className="action" type="button" onClick={() => onDelete(id)}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

Detail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Detail;