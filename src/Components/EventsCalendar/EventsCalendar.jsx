import React, { Component } from 'react';
import moment from 'moment';
import '../EventsCalendar/EventsCalendar.css';
import '../News/News.css';
import 'moment/locale/nb';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import _ from 'lodash';
import EventModal from '../EventModal/EventModal';
// import BigCalendar from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css'
// BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class ExampleComponent extends React.Component {

	  state = {
          events : [],
          isOpen:false,
          infoEvent: ''
      }
      componentWillReceiveProps(nextProps){
          if(this.props!= nextProps){
            this.getEventsArray (nextProps.array);
          }
      }
    componentDidMount(){
        // this.props.array ? this.setState({events: this.getEventsArray(this.props.array)	}, () => console.log(this.state.events)):null;
        this.getEventsArray (this.props.array);
        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) this.setState({
                isOpen: false
            });
        });
    }
    componentWillMount (){
        var a = document.getElementsByClassName("fc-more-cell")
    }
    getEventsArray = (obj) => {
        let array = [];
        if(obj){
            obj.forEach(function(item, index){
                let event = {};
                event.title= item.title;
                event.start = item.dateStart;
                event.color = '#459369';
                event.className = item._id;
                array.push(event);
            })
        }
        array ?this.setState({events : array}):null;
    }
	render() {
        console.log(this.props)
	  return (
		<div className="Calendar">
		  <FullCalendar
               id = "calendar"
               height = {800}
		      header = {{
			  left: 'prev,next  myCustomButton',
			  center: 'title',
			  right: 'month,listWeek'
		  }}
		  monthNames ={['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']}
		  monthNamesShort ={['Янв.','Фев.','Март','Апр.','Май','Июнь','Июль','Авг.','Сент.','Окт.','Ноя.','Дек.']} 
		  dayNames = {["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"]}
		  dayNamesShort = {["Вск","Пнд","Втр","Срд","Чтв","Птн","Сбт"]} 
		  buttonText = {{
			today: "Сегодня",
			month: "Месяц",
			listWeek: "Неделя",
		  }
			
		}
		   defaultDate={Date.now()}
		//   navLinks= {true} // can click day/week names to navigate views
          editable= {true}
          locale = 'ru'
		  eventLimit= {3} // allow "more" link when too many events
          events = {this.state.events}
          timeFormat = {'H(:mm)'}
          eventClick = {this.dayClick}
        //   select = {this.func}
        //   eventAfterAllRender = {this.govnoTest}
	        />
            <div 
                                className={this.state.isOpen ? 'overlay' : 'overlay hidden'} 
                                onClick = {this.closeModalWindow}
                            >
                                <div className="modal-event-field">
                                {this.state.infoEvent ? <EventModal 
                                        event = {this.state.infoEvent} 
                                        closeModalWindow = {this.closeModalWindow}
                                    />:null }
                                  
                                </div>
                            </div>   
		</div>
	  );
    }
    dayClick= (calEvent, jsEvent, view) => {
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