import React, { Component } from 'react';
import moment from 'moment';
import '../EventsCalendar/EventsCalendar.css';
import '../News/News.css';
import 'moment/locale/nb';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import _ from 'lodash';
import EventModal from '../EventModal/EventModal';

export default class ExampleComponent extends React.Component {
	state = {
        events : [],
        isOpen:false,
        infoEvent: '',
        view:'month' 
    }
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
           this.getEventsArray (nextProps.array);
        };
    };
    componentDidMount(){
        this.getEventsArray (this.props.array);
        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) this.setState({
                isOpen: false
            });
        });    
    };
    getEventsArray = (obj) => {
        let array = [];
        if(obj){
            obj.forEach(function(item, index){
                let event = {};
                event.title = item.title;
                event.start = item.dateStart;
                event.color = '#459369';
                event.className = item._id;
                array.push(event);
            })
        };
        array ? this.setState({events : array}) : null;
    };
	render() {      
	  return (
	    <div className="Calendar" onClick = {this.click}>        
		  <FullCalendar
                id = "calendar"
                height = {700}
		        header = {{
                    left: 'prev,next  myCustomButton',
                    center: 'title',
                    right: 'month,listWeek'
                }}
                defaultView = {this.state.view === 'month' ? 'month':'listWeek'}
                views =  {{
                    month : { 
                        titleFormat: 'YYYY: M :MMMM'
                    },
                    week : {
                        titleFormat: 'YYYY M MMMM D'
                    }
                }}
                monthNames = {['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']}
                monthNamesShort = {['Янв.','Фев.','Март','Апр.','Май','Июнь','Июль','Авг.','Сент.','Окт.','Ноя.','Дек.']} 
                dayNames = {["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"]}
                dayNamesShort = {["Вск","Пнд","Втр","Срд","Чтв","Птн","Сбт"]} 
                buttonText = {{
                    today: "Сегодня",
                    month: "Месяц",
                    listWeek: "Неделя",
                }}
        
                defaultDate={Date.now()}
                listDayAltFormat = 'D MMMM YYYY'
                noEventsMessage = 'На этот день не запланировано событий'
                locale = 'ru'
                eventLimit= {3}
                events = {this.state.events}
                timeFormat = {'H(:mm)'}
                eventClick = {this.dayClick}
                viewRender = {this.renderHeader}
                eventRender = {this.renderTime}
	        />
            <div 
                className={this.state.isOpen ? 'overlay' : 'overlay hidden'} 
                onClick = {this.closeModalWindow}
            >
                <div className="modal-event-field">
                   {this.state.infoEvent ? 
                        <EventModal 
                            event = {this.state.infoEvent} 
                            closeModalWindow = {this.closeModalWindow}
                        />:
                        null }
                </div>
            </div>   
		</div>
	  );
    }
    renderTime = (event, element, view) => {
        if(this.state.view !== view.type){
            this.setState({
                view: view.type
            })
        }
        if(view.type === 'listWeek'){
            let time = element[0].childNodes[0];
            let timeEvent = time.innerText.split(':');
            time.innerHTML = `
            <div class = 'time-event-list-week'> 
                <span class = 'event-hour'>${timeEvent[0]} </span>
                <span class = 'event-minutes'>${timeEvent[1]} </span>
            </div>`
        }     
    }
    renderHeader = ( view, el) => {
        let time = document.querySelectorAll('.fc-list-item-time');
        let headerTitle = document.getElementsByClassName('fc-center');
        if(view.currentRangeUnit === 'month'){
            headerTitle[0].innerHTML = `
            <div class = "current-date-calendar">
                <p class = "monthName-calendar">${view.title.split(':')[2]}</p>
                <div>
                    <p class = "monthNumber-calendar"> ${view.title.split(':')[1]} месяц</p>
                    <p class = "current-year-calendar">${view.title.split(':')[0]} год</p>
                </div>
            </div>`
        }else{
            let date = view.title.split(' ')[1] + '-' + 
            view.title.split(' ')[3] + '-'+ 
            view.title.split(' ')[0];
            let monthName = view.title.split(' ')[2];
            let monthNewName;
            if(monthName.toLowerCase().includes('март') || monthName.toLowerCase().includes('август')){
                monthNewName = monthName + 'а';
            }else{
                monthNewName = monthName.substring(0,monthName.length-1)+ 'я';
            }             
            let weekNumber = this.weekOfMonth(moment(date));
            headerTitle[0].innerHTML = `
            <div class = "current-date-calendar">
                <p class = "monthName-calendar">${view.title.split(' ')[3]} - ${view.title.split(' ')[5]}</p>
                <div>
                    <p class = "monthNumber-calendar"> ${weekNumber} неделя</p>
                    <p class = "current-year-calendar">${monthNewName} ${view.title.split(' ')[0]} год</p>
                </div>
            </div>`           
        }      
    }
    weekOfMonth = (m) => {
        return m.week() - moment(m).startOf('month').week() + 1;
    }
    dayClick = (calEvent, jsEvent, view) => {
        let infoEvent = _.find(this.props.array,  (el) => {
                if(el._id === calEvent.className[0]){
                    return el
                }
        });
        this.setState({isOpen:true, infoEvent:infoEvent})
    }
    closeModalWindow = (e) => {
        if(e.target.className === 'overlay' 
        ||e.target.classList.contains('button-event-close' )
        ||e.target.classList.contains('button-close' )){
            e.stopPropagation();
            this.setState({isOpen:false});
        };        
    };
  }