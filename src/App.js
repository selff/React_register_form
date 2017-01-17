import React from 'react';
import ReactDOM from 'react-dom';
import Autosuggest from 'react-autosuggest';
import ReactTelephoneInput from 'react-telephone-input';
import './css/App.css';
import './css/Phone.css';
import './css/Autocomplete.css';

const professions = [
  "Артист","Астролог","Балетмейстер","Брокер","Водопроводчик","Визажист","Грузчик","Гробовщик",
  "Дровосек","Дорвейщик","Епископ","Жестянщик","Заклинатель","Иллюзионист","Иллюстратор",
  "Кардиолог","Лесничий","Лингвист","Литейщик","Маркетолог","Мамолог","Могильщик",
  "Носильщик","Нейрохирург","Орнитолог","Оссенизатор","Остеопат","Психотерапевт","Полицейский",
  "Программист","Полеантолог","Педиатор","Радиоведущий","Реаниматолог","Стилист", 
  "Столяр", "Таксист","Токарь","Уборщица","Уролог","Фармацевт","Химик","Хирург","Церюльник","Чеботарь",
  "Шахтер","Шоколатье","Щипачь","Эндокринолог","Эквелибрист","Юрист","Ювелир","Ядерщик",
  "Artist","Atlet","Broker","Bankir","Coder","Cleaner","Doctor","Engineer","Electrician",
  "Farmer","Geographer","Historian","Insueance clerk","Jeweller","Keeper","Lecturer",
  "Manager","Mechanocal","Microbiologist","Musician","Newspaper editor","Operator",
  "Packer","Pharmacist","Philosopher","Photographer","Policeman","Postalman","Programmer",
  "Producer","Psychologist","Quality inspector","Radio dj","Railway guard",
  "Sales manager","Scaffolder","Tanner","Trainer","Tutor","Usher","Valuer","Waiter",
  "Weaver","Worker","Zookeeper"
]

var findChar;

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  
  findChar = escapedValue;

  let arr = professions.filter(profession => regex.test(profession));
  arr = arr.map(profession =>  profession.slice(escapedValue.length, profession.length) );
  return arr;
}

function FormTitle() {
  return (
    <div className="form-title">
      <b>Register please</b> and start to sell services through the Internet today
    </div>
  )
}

function InputFio() {
  return (
    <div>
      <div className="labels">
        <label>Firstname</label>
        <label>Lastname</label>
      </div>
      <div className="fio">
        <input type="text" name="FirstName" />
        <input type="text" name="LastName" />
      </div>
      <div className="labels">
        <label>Profession</label>    
      </div>      
    </div>
  )
}

function PhoneLabel() {
  return (
    <div className="labels">
      <label>Phone</label>   
    </div> 
  )
}


function getSuggestionValue(suggestion) {
  return findChar + suggestion
};

function renderSuggestion(suggestion) {
  return (
    <div>
      <span><b>{findChar}</b>{suggestion}</span>
    </div>
  );
}

class ButtonSubmit extends React.Component {
  render() {
    return (
      <div className="submit">
        <input type="submit" value="Registration" />
      </div>
    );
  }
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
  
  validateForm = (e) => {
    e.preventDefault();
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
      placeholder: "Start typing ...",
      value,
      onChange: this.onChange
    };

    return (
    <form className="my-app" onSubmit={this.validateForm}>
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
        preferredCountries={['gb', 'de', 'ru']}
        />
        <ButtonSubmit />
    </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));