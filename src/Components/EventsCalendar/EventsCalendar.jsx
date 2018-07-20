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
          infoEvent: '',
          view:'month' 
      }

      componentWillReceiveProps(nextProps){
          if(this.props!= nextProps){
              console.log(this.props)
              console.log(nextProps)
            this.getEventsArray (nextProps.array);
            this.setState({view:nextProps.view})
          }
      }
    componentDidMount(){
        const { FullCalendar} = this
        console.log(this)
        // this.props.array ? this.setState({events: this.getEventsArray(this.props.array)	}, () => console.log(this.state.events)):null;
        this.getEventsArray (this.props.array);
        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) this.setState({
                isOpen: false
            });
        });
  
        
        // this.getDate();
    }
// componentWillReceiveProps(nextProps){
//     console.log(this.props)
//     console.log(nextProps)
// }
    getEventsArray = (obj) => {
        let array = [];
        if(obj){
            obj.forEach(function(item, index){
                let event = {};
                event.title= item.title;
                event.start = item.dateStart;
                event.color = '#459369';
                event.className = item._id;
                event.description = 'This is a cool event'
                array.push(event);
            })
        }
        array ?this.setState({events : array}):null;
    }
    
    // getDate = () => {
    //     let year = (new Date()).getFullYear();
    //     console.log((new Date()).getMonth())
    //     let monthNumber = (new Date()).getMonth();
    //     monthNumber++
    //     let  monthName = new Date().toLocaleString('ru', { month: "long" });
    //     this.setState({
    //         year : year,
    //         monthNumber : monthNumber,
    //         monthName : monthName
    //     })
    // }
	render() {
       console.log(this.state)
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
          defaultView = {!this.state.view ? 'listWeek': 'month'}
            views =  {{
                month: { 
                    titleFormat: 'YYYY: M :MMMM'
                },
                week: {
                    titleFormat: 'YYYY M MMMM D'
                }
            }
                
            }
            // customButtons = { {
            //     myCustomButton: {
            //       text: 'custom!',
            //       click: function() {
            //         alert('clicked the custom button!');
            //       }
            //     }}}
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
           lang = 'es'
		//   navLinks= {true} // can click day/week names to navigate views
          editable= {true}
          locale = 'ru'
         changeView ={this.swith}
		  eventLimit= {3} // allow "more" link when too many events
          events = {this.state.events}
          viewRender = {this.getView}
          timeFormat = {'H(:mm)'}
          eventClick = {this.dayClick}
          weekNumberTitleHtml = 'week'
          eventAfterAllRender = {this.afterRender}

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
    getView= (view) => {
        let a = document.getElementsByClassName('fc-center');
        // a[0].innerHTML = '<div className = "current-date-calendar">'+
        // '<p className = "monthName-calendar">'+ view.title.split(':')[2] +'</p>'+
        // '<div>'+
        // '<p className = "monthNumber-calendar">' `${this.state.monthNumber} месяц` + '</p>'+
        // '<p className = "current-year-calendar"> {`${this.state.year} год`}  </p>'+
        // '</div>'+
        // '</div>'
        if(view.currentRangeUnit === 'month'){
            a[0].innerHTML = `<div class = "current-date-calendar">
            <p class = "monthName-calendar">${view.title.split(':')[2]}</p>
            <div>
            <p class = "monthNumber-calendar"> ${view.title.split(':')[1]} месяц</p>
            <p class = "current-year-calendar">${view.title.split(':')[0]} год</p>
            </div>
            </div>
            `
        }else{
            let date = view.title.split(' ')[1] + '-' + 
            view.title.split(' ')[3] + '-'+ 
            view.title.split(' ')[0];
            let monthName = view.title.split(' ')[2];
            let monthNewName;
            if(monthName.toLowerCase().includes('март') ||monthName.toLowerCase().includes('август')){
                monthNewName = monthName + 'а';
            }else{
                 monthNewName = monthName.substring(0,monthName.length-1)+ 'я';
            }
            let weekNumber = this.weekOfMonth(moment(date));
            a[0].innerHTML = `<div class = "current-date-calendar">
            <p class = "monthName-calendar">${view.title.split(' ')[3]} - ${view.title.split(' ')[5]}</p>
            <div>
            <p class = "monthNumber-calendar"> ${weekNumber} неделя</p>
            <p class = "current-year-calendar">${monthNewName} ${view.title.split(' ')[0]} год</p>
            </div>
            </div>
            `
        }
       
    }
     weekOfMonth = (m) => {
        return m.week() - moment(m).startOf('month').week() + 1;
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
            this.setState({view: 'week'} , () => {
                console.log(this.state)
                this.props.getNewView();
            })
        };        
    };
  }