import React, { Component } from 'react';
import moment from 'moment';
import '../EventsCalendar/EventsCalendar.css'
import 'moment/locale/nb';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
// import BigCalendar from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css'
// BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export default class ExampleComponent extends React.Component {

	  state = {
	  	events : []
	  }
    componentDidMount(){
        console.log(this.props.array)
        // this.props.array ? this.setState({events: this.getEventsArray(this.props.array)	}, () => console.log(this.state.events)):null;
        this.getEventsArray (this.props.array);
        var a = document.getElementsByClassName("fc-more-cell")
        console.log(a.length)
    }
    componentWillMount (){
        var a = document.getElementsByClassName("fc-more-cell")
        console.log(a.length)
    }
    click = (e) => {
        console.log(e.target)
    }
    getEventsArray = (obj) => {
        let array = [];
        if(obj){
            obj.forEach(function(item, index){
                let event = {};
                event.title= item.title;
                event.start = item.dateStart;
                event.color = '#459369'
                array.push(event);
                console.log(event)
            })
        }
        console.log(array)
        array ?this.setState({events : array} , () => {
            console.log(this.state.events)
        }):null;
        // return array
    }
	render() {
	  return (
		<div className="Calendar" onClick = {this.click}>
        {/* <BigCalendar 
            events = {this.state.events}
            header = {{
                left: 'prev,next  myCustomButton',
                center: '',
                right: 'month,listWeek'
            }}	
        /> */}
		  <FullCalendar
			   id = "calendar"
		      header = {{
			  left: 'prev,next  myCustomButton',
			  center: 'title',
			  right: 'month,listWeek'
		  }}
		  monthNames ={['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']}
		  monthNamesShort ={['Янв.','Фев.','Март','Апр.','Май','Июнь','Июль','Авг.','Сент.','Окт.','Ноя.','Дек.']} 
		  dayNames = {["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"]}
		  dayNamesShort = {["ВС","ПН","ВТ","СР","ЧТ","ПТ","СБ"]} 
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
		  eventLimit= {4} // allow "more" link when too many events
          events = {this.state.events}
          timeFormat = 'H(:mm)'
          eventRender = {this.govno}
        //   select = {this.func}
        //   eventAfterAllRender = {this.govnoTest}
	        />
		</div>
	  );
    }
    govno = (e) => {
        var a = document.querySelectorAll('tbody')
        console.log(a)
        for(var i;i<a.length;i++){
            
            console.log(a[i].childNodes)
        }
        
    }
    // func = (start, end) => {
    //     console.log(start)
    // }
    // govnoTest = () => {
    //     var a = document.getElementById('calendar')
    //     console.log(a);
    // }
  }