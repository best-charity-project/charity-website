import React, { Component } from 'react';
import Button from '../../../Button/Button';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Checkbox from '../../../Checkbox/Checkbox';
class AdminLibraryItem extends Component {
  state = {
    id: ''
  }
  componentDidMount() {
    this.setState({
      id: this.props.material._id,
      fileId: this.props.material.fileId,
      source: this.props.material.source,
      title: this.props.material.title,
      author: this.props.material.author,
      category: this.props.material.category || "другое",
      filter: this.props.material.filter
    })
  }

  checkId = () => {
    this.props.checkId(this.state.id)
  }

  submit = () => {
    confirmAlert({
      title: 'Подтвердите удаление материала',
      message: 'Вы точно хотите удалить материал?',
      buttons: [
        {
          label: 'Да',
          onClick: (item) => this.props.deleteHandler(item)
        },
        {
          label: 'Нет',
          onClick: () => { }
        }
      ]
    })
  }

  showSource() {
    const { fileId, source } = this.state;
    return fileId ? <a href={`https://drive.google.com/uc?id=${fileId}&export=download`} target="_blank">Загруженный файл</a> :
      <a href={source} target="_blank">Ссылка</a>
  }

  render() {

    return (
      <div className="news-admin" id={this.state.id}>
        <div className="news-admin-checkbox">
          <Checkbox
            name="checkbox-id"
            onChange={this.checkId}
          />
          <div onClick={this.props.showMaterial} className="news-admin-title">{this.state.title}</div>
        </div>
        <div readOnly>{this.showSource()}</div>
        <div readOnly>{this.state.category}</div>
        <div>{this.state.filter}</div>
        <div>
          <Button
            name="button-admin admin-cancel"
            label={<span aria-hidden="true">&times;</span>}
            clickHandler={this.submit}
          />
        </div>

      </div>
    )
  }
}

export default AdminLibraryItem;
