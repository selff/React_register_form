import React from 'react';
import ReactDOM from 'react-dom';
import Autosuggest from 'react-autosuggest';
import ReactTelephoneInput from 'react-telephone-input';
import './css/App.css';
import './css/Phone.css';
import './css/Profession.css';

//import {ReactTelephoneInput} from './PhoneInput.js';

const professions = [
  "Артист","Астролог","Балетмейстер","Брокер","Водопроводчик","Визажист","Грузчик","Гробовщик",
  "Дровосек","Дорвейщик","Епископ","Жестянщик","Заклинатель","Иллюзионист","Иллюстратор",
  "Кардиолог","Лесничий","Лингвист","Литейщик","Маркетолог","Мамолог","Могильщик",
  "Носильщик","Нейрохирург","Орнитолог","Оссенизатор","Остеопат","Психотерапевт","Полицейский",
  "Программист","Полеантолог","Педиатор","Радиоведущий","Реаниматолог","Стилист", 
  "Столяр", "Таксист","Токарь","Уборщица","Уролог","Фармацевт","Химик","Хирург","Церюльник","Чеботарь",
  "Шахтер","Шоколатье","Щипачь","Эндокринолог","Эквелибрист","Юрист","Ювелир","Ядерщик"
]
  

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  
  let arr = professions.filter(profession => regex.test(profession));
  //arr = arr.map(profession =>  profession.replace(regex, function(str) {return '<b>'+str+'</b>'}));
  return arr;
}

function getSuggestionValue(suggestion) {
  return suggestion;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion}</span>
  );
}

function FormTitle() {
  return (
    <div className="form-title">
      <b>Зарегистрируйтесь</b> и начните продавать услуги через интернет сегодня
    </div>
  )
}

function InputFio() {
  return (
    <div>
      <div className="labels">
        <label>Имя</label>
        <label>Фамилия</label>
      </div>
      <div className="fio">
        <input type="text" name="FirstName" />
        <input type="text" name="LastName" />
      </div>
      <div className="labels">
        <label>Профессия</label>    
      </div>      
    </div>
  )
}

function PhoneLabel() {
  return (
    <div className="labels">
      <label>Телефон</label>   
    </div> 
  )
}

function ButtonSubmit() {
  return (
    <div className="submit">
      <input type="submit" value="Зарегистрироваться" />
    </div>
  )
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      chars: '',
      suggestions: []
    };    
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      chars: value,
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Начните вводить название",
      value,
      onChange: this.onChange
    };

    return (
    <form className="my-app">
      <FormTitle />
      <InputFio />
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
      <PhoneLabel />    
      <ReactTelephoneInput
        defaultCountry='ru'
        flagsImagePath='/img/flags.png'
        preferredCountries={['ru', 'by', 'ua', 'kz']}
        />
        <ButtonSubmit />
    </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));