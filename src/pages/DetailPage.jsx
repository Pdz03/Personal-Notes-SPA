import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Detail from "../components/Detail";
import { getNote, deleteNote } from "../utils/local-data";
import Swal from 'sweetalert2';
import autoBind from 'auto-bind';
// import NoteDetailEmpty from "../components/DetailNote/NoteDetailEmpty";

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <DetailPage id={id} navigate={navigate} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      initializing: true,
    };
    autoBind(this);
  }

  async componentDidMount() {
    const data  = await getNote(this.props.id);
    this.setState(() => {
      return {
        note: data,
        initializing: false,
      };
    });
  }

  async onDeleteHandler(id) {
    await Swal.fire({
      title: 'Apakah anda yakin?',
      text: "Anda akan menghapus catatan ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Batal',
      confirmButtonText: 'Ya, hapus!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Catatan telah terhapus.',
          'success'
        )
        deleteNote(id);
        this.props.navigate("/");
      }
    })
  }

  async onArchiveHandler(id) {
    await Swal.fire({
      title: 'Apakah anda yakin?',
      text: "Anda akan mengarsipkan catatan ini!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Batal',
      confirmButtonText: 'Ya, arsipkan!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Catatan anda telah diarsipkan',
          'success'
        )
        ArchiveNote(id);
        this.props.navigate("/");
      }
    })
  }

  render() {
    if (this.state.initializing) {
      return null;
    }
    // if (!this.state.note) {
    //   return <NoteDetailEmpty />;
    // }
    
    return (
      <section>
        <Detail {...this.state.note} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} />
      </section>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DetailPageWrapper;