import React from 'react';
import PropTypes from 'prop-types';
import ControlButton from '../ControlButton/ControlButton';
import { getLibraryItemsAmount } from '../../libraryCalls';
import SelectInput from '../SelectInput/SelectInput';
import './DeleteCategoryModal.css';

export default class DeleteCategoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCategoryItems: null,
      checkboxValue: false,
      categoryNames: [],
      moveToCategoryTitle: '',
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    const categoryTag = this.props.category.tag;
    getLibraryItemsAmount({ categoryTag }).then((amount) => {
      if (amount) {
        this.setState({
          hasCategoryItems: true,
        });
        return;
      }
      this.setState({ hasCategoryItems: false });
    });
    this.getCategoryNames();
  }

  onDeleteClick() {
    this.props.onConfirm(this.state.moveToCategoryTitle);
  }

  onSelectChange(value) {
    this.setState({ moveToCategoryTitle: value });
  }

  getCategoryNames() {
    const categoryNames = [];
    const { categories } = this.props;
    categories.forEach((category) => {
      if (category.title === this.props.category.title) {
        return;
      }
      categoryNames.push(category.title);
    });
    this.setState({
      categoryNames,
    });
  }

  handleCheckboxChange() {
    this.setState({ checkboxValue: !this.state.checkboxValue });
  }

  render() {
    return (
      <div className='delete-category-modal modal'>
        <div className='modal-window'>
          <p className='modal-window--question'>Вы уверены, что хотите удалить документ?</p>
          {this.state.hasCategoryItems && (
            <div className='delete-category-modal--input'>
              <input
                type='checkbox'
                id='question'
                name='question'
                value={this.state.hasCategoryItems}
                onChange={this.handleCheckboxChange}
              />
              <label htmlFor='question'>Переместить документы в другую категорию</label>
            </div>
          )}
          {this.state.checkboxValue && (
            <SelectInput
              id='category'
              value={this.state.moveToCategoryTitle}
              fieldName='Выберите категорию'
              data={this.state.categoryNames}
              onChange={this.onSelectChange}
            />
          )}
          {this.state.hasCategoryItems === null && <p>Загрузка...</p>}
          <div className='delete-category-modal--buttons'>
            <ControlButton
              text='Удалить'
              className='control-button control-button-warning'
              onButtonClick={this.onDeleteClick}
            />
            <ControlButton
              text='Отмена'
              className='control-button control-button-secondary'
              onButtonClick={this.props.toggle}
            />
          </div>
        </div>
      </div>
    );
  }
}

DeleteCategoryModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
