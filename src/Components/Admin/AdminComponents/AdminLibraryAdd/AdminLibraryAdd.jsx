import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import { withAlert } from 'react-alert';
import { server } from "../../../../api";
import TextField from "../../../TextField/TextField";
import Button from "../../../Button/Button";
import AdminSelectSearch from "../AdminSelectSearch/AdminSelectSearch";
const CATEGORIES = [
  { title: "видео", id: "видео" },
  { title: "статьи", id: "статьи" },
  { title: "литература", id: "литература" },
  { title: "учебный материал", id: "учебный материал" },
  { title: "другое", id: "другое" }
];
const FILE_SIZE = 5242880;


class AdminLibraryAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      source: "",
      description: "",
      filter: "",
      category: "",
      author: "",
      file: "",
      fileId: "",
      isTitleCorrect: true,
      isDescriptionCorrect: true,
    };
  }

  componentDidMount() {
    this.getFiltersListByType("library");

    if (this.props.location.state) {

      const { material } = this.props.location.state;

      this.setState({
        title: material.title,
        description: material.description,
        filter: material.filter,
        source: material.source,
        fileId: material.fileId,
        author: material.author,
        category: material.category || "другое"
      });
    }
  }

  changeTitle = str => {
    this.setState({ title: str });
  };

  changeSource = e => {
    this.setState({ source: e.target.value });
  };

  changeFile = e => {
    const file = e.target.files.item(0) || "";
    this.setState({ file });
  };

  changeAuthor = str => {
    this.setState({ author: str });
  };

  changeDescription = e => {
    this.setState({ description: e.target.value });
  };

  getFilter = str => {
    if (str.length) this.setState({ filter: str });
  };

  getCategory = str => {
    if (str.length) this.setState({ category: str });
  };

  onCancel = () => {
    this.props.history.push({
      pathname: "/admin-panel/library"
    });
  };

  validate() {
    const { source, file, title, description, fileId } = this.state;
    const isFileValid = file ? file.size < FILE_SIZE : true;
    if (!title || (!fileId && !source && !file) || !description) {
      this.props.alert.error('Заполните все необходимые поля');
      return false;
    }
    if (!isFileValid) {
      this.props.alert.error('Файл слишком большой');
      return false
    }
    return true;
  }

  sendMaterials = async () => {
    if (!this.validate()) return;
    const { title, source, filter, author, category, description, file, fileId } = this.state;
    const formData = new FormData();
    const sendedBody = { title, filter, author, category, description, fileId };

    Object.keys(sendedBody).forEach(key =>
      formData.append(key, this.state[key]));

    if (file) {
      formData.append("file", file, file.fileName);
    }
    if (source) {
      formData.append("source", source);
    }

    let id = "";
    if (this.props.location.state) {
      id = this.props.location.state.material._id;
    };

    axios({
      method: id ? "put" : "post",
      url: id ? `${server}/api/materials/${id}` : `${server}/api/materials`,
      data: formData,
      config: {
        headers: { "enctype": "multipart/form-data" }
      }
    })
      .then(response => {
        this.props.history.push({
          pathname: "/admin-panel/library"
        });
      })
      .catch(error => {
        this.props.alert.error("Ошибка базы данных");
      });
  };

  getFiltersListByType = type => {
    axios({
      method: "get",
      url: `${server}/api/filters?type=${type}`
    }).then(res => {
      this.setState({
        filters: res.data.filterList
      });
    });
  };

  showChosenFileName() {
    const { file } = this.state;
    if (file) return this.fileName();
  }

  fileName() {
    return this.file.files[0].name.replace(/.*\\/g, "");
  }

  showSourceInput() {
    if (this.state.file) return <span className="library-label">{this.showChosenFileName()}</span>
    return (<React.Fragment>
      <span className="library-label">или введите ссылку: </span>
      <input
        id="title-news"
        type="text"
        name="title-news"
        value={this.state.source || ''}
        onChange={this.changeSource}
        disabled={this.state.file}
      /></React.Fragment>
    )
  }

  showUrl() {
    const { file, source, fileId } = this.state;
    if (fileId && (!file || !source)) {
      return <a href={`https://drive.google.com/uc?id=${fileId}&export=download`} className="library-url">Загруженный файл</a>
    }
  }

  render() {
    return (
      <div className="create-news">
        <div className="admin-title-news">
          <TextField
            label="Название*"
            id="title-news"
            type="text"
            name="title-news"
            value={this.state.title}
            onChangeValue={this.changeTitle}
          />
        </div>
        <hr />
        <div className="admin-title-news">
          <div className="container-for-input">
            <label htmlFor="source-news">Источник (до 5 МБ)*
            {this.showUrl()}
            </label>
            <div className={this.state.source ? "admin-button admin-button_file admin-button_disabled" : "admin-button admin-button_file"} >
              <div className="choose-file">Выберите файл</div>
              <input
                ref={ref => (this.file = ref)}
                className={"file-news"}
                id={"file-news"}
                type="file"
                name={"file-news"}
                onChange={this.changeFile}
                disabled={this.state.source}
              />
            </div>
            {this.showSourceInput()}
          </div>
        </div>
        <hr />
        <div className="admin-title-news">
          <TextField
            label="Автор"
            id="title-news"
            className="title-news"
            type="text"
            name="title-news"
            value={this.state.author}
            onChangeValue={this.changeAuthor}
          />
        </div>
        <hr />
        <div className="text-news">
          <div>Описание (не более 300 символов)*</div>
          <div className="admin-textarea">
            <textarea
              rows="5"
              value={this.state.description}
              onChange={e => this.changeDescription(e)}
              maxLength="300"
            />
          </div>
        </div>
        <hr />
        <div className="text-news">
          {this.state.filters ? (
            <AdminSelectSearch
              value={this.state.filter}
              filtersList={this.state.filters}
              getFilter={this.getFilter}
              label={"Методика"}
            />
          ) : null}
        </div>
        <hr />
        <div className="text-news">
          <AdminSelectSearch
            value={this.state.category}
            filtersList={CATEGORIES}
            getFilter={this.getCategory}
            label={"Категория"}
          />
        </div>
        <div className="admin-buttons admin-buttons_library">
          <Route
            render={({ history }) => (
              <Button
                label="Сохранить"
                name="button-admin"
                clickHandler={this.sendMaterials}
              />
            )}
          />
          <Route
            render={({ history }) => (
              <Button
                label="Отмена"
                name="button-admin"
                clickHandler={this.onCancel}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(withAlert(AdminLibraryAdd));
