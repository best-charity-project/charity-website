import React from 'react';
import './EducationRoute.css';

export default () => (
  <div className='EducationRoute indent'>
    <h1 className='education-route--heading'>образовательный маршрут</h1>
    <div className='education-route--form'>
      <h2 className='form--education-route--title'>
        Анкета образовательного маршрута
      </h2>
      <p className='form--education-route--description'>
        Уважаемые законные представители детей с особыми образовательными потребностями!
      </p>
      <p className='form--education-route--description'>
        Предлагаем Вам заполнить анкету по определения образовательного маршрута.
      </p>
      <p className='form--education-route--description'>
        Данная информация Вам поможет найти родителей в Республике Беларусь и объединиться.
      </p>

      <form name='addName' onSubmit=''>
        <div className='field-wrapper'>
          <p className='form--education-route--comment'>
            <label htmlFor='name'>Ваше имя</label>
          </p>
          <input
            id='name'
            type='text'
            maxLength='40'
            placeholder='Имя по которому к Вам можно обратиться'
            className='form--education-route--field'
            pattern='^[А-Яа-яЁё\s]+$'
            title='Имя должно содержать только буквы русского алфавита'
            required
          />
          <span className='validity' />
        </div>
        <div className='field-wrapper'>
          <p className='form--education-route--comment'>
            <label htmlFor='phone'>Ваш номер телефона</label>
          </p>
          <input
            id='phone'
            pattern='[^А-Яа-яЁёA-Za-z]+$'
            type='tel'
            title='Введите корректный контактный телефон'
            placeholder='+375-ХХ-ХХХ-ХХ-ХХ'
            className='form--education-route--field'
            maxLength='20'
            required
          />
          <span className='validity' />
        </div>
        <div className='field-wrapper'>
          <p className='form--education-route--comment'>
            <label htmlFor='email'>Ваш адрес электронной почты</label>
          </p>
          <input
            maxLength='35'
            id='email'
            type='email'
            title='адрес электронной почты должен иметь формат: имя_почты@email.com'
            placeholder='имя_почты@email.com'
            className='form--education-route--field'
            pattern='.+@+*'
            required
          />
          <span className='validity' />
        </div>
        <div className='field-wrapper'>
          <p className='form--education-route--comment'>
            <label htmlFor='region'>Ваша область</label>
          </p>
          <select
            id='region'
            title='Вы должны выбрать свой регион'
            className='form--education-route--field'
            required
          >
            <option value='' disabled selected>
              ---
            </option>
            <option value=''>Минск</option>
            <option value=''>Витебск</option>
            <option value=''>Гродно</option>
          </select>
          <span className='validity' />
        </div>
        <div className='field-wrapper'>
          <p className='form--education-route--comment'>
            <label htmlFor='regionDistrict'>Ваш областной район</label>
          </p>
          <select
            id='regionDistrict'
            title='Вы должны выбрать областной район'
            className='form--education-route--field'
            required
          >
            <option value='' disabled selected>
              ---
            </option>
            <option value=''>Минск</option>
            <option value=''>Витебск</option>
            <option value=''>Гродно</option>
          </select>
          <span className='validity' />
        </div>
        <div className='field-wrapper'>
          <p className='form--education-route--comment'>
            <label htmlFor='city'>Ваш город</label>
          </p>
          <input
            id='city'
            type='text'
            maxLength='15'
            title='Название города должно содержать только буквы русского алфавита'
            placeholder='Ваш город'
            className='form--education-route--field'
            pattern='^[А-Яа-яЁё\s]+$'
            required
          />
          <span className='validity' />
        </div>
        <div className='field-wrapper'>
          <p className='form--education-route--comment'>
            <label htmlFor='cityDistrict'>Район города (только для Минска)</label>
          </p>
          <select
            id='regionDistrict'
            title='Вы должны выбрать район города'
            className='form--education-route--field'
          >
            <option value='' disabled selected>
              ---
            </option>
            <option value=''>Минск</option>
            <option value=''>Витебск</option>
            <option value=''>Гродно</option>
          </select>
        </div>
        <div className='field-wrapper'>
          <p className='form--education-route--comment'>
            <label htmlFor='cityDistrict'>Выберите учреждение образования</label>
          </p>
          <select
            id='regionDistrict'
            title='Вы должны выбрать район города'
            className='form--education-route--field'
            required
          >
            <option value='' disabled selected>
              ---
            </option>
            <option value=''>Средняя школа</option>
            <option value=''>Дошкольное детское учреждение</option>
          </select>
          <span className='validity' />
        </div>
        <div className='field-wrapper'>
          <p className='form--education-route--comment'>
            <label htmlFor='year'>В каком году учащийся пойдет в учреждение образования</label>
          </p>
          <input
            id='year'
            type='number'
            title='дата должна содержать только год и начинаться с 20..'
            placeholder='20__'
            className='form--education-route--field'
            min='2018'
            max='2100'
            required
          />
          <span className='validity' />
        </div>
        <div className='field-wrapper'>
          <p className='form--education-route--comment'>
            <label htmlFor='name'>Рекомендованная программа образования</label>
          </p>
          <input
            id='name'
            type='text'
            maxLength='40'
            placeholder='Программа обучения рекомендованная ЦКРОиР'
            className='form--education-route--field'
            pattern='^[А-Яа-яЁё\s]+$'
          />
        </div>
        <div className='field-wrapper'>
          <p><span>*</span> - поля, обязательные для заполнения</p>
        </div>
        <input
          type='submit'
          className='control-button control-button--blue'
          value='Отправить'
        />
      </form>
    </div>
  </div>
);
