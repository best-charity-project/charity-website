import React, {Component} from 'react';

import AdminForumTopic from '../AdminForumTopic/AdminForumTopic';
import './AdminForumTopicsList.css';

class AdminForumTopicsList extends Component {
    state = {
        filteredTopics: []
    }

    componentDidMount() {
        this.props.getTopics()
        console.log(this.props.filteredTopics)
        this.props.filteredTopics.length ?       
            this.setState({
                filteredTopics: this.state.filteredTopics,
            }) :
        null
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.filteredTopics, nextProps.isFiltered)
        nextProps.filteredTopics /* || nextProps.groups */ ?        
            this.setState({
                filteredTopics: nextProps.filteredTopics,
                // groups: nextProps.groups
            }) 
            :
        null
    }

    render() {
        return(
            <div className = 'forum-group-list'>
                {this.state.filteredTopics.map(item => {
                    if(item.group_id._id === this.props.id) {
                        return (
                            <AdminForumTopic 
                                title = {item.topicTitle} 
                                id = {item._id}
                                key = {item._id}  
                                deleteHandler = {() => this.props.deleteTopic(item)} 
                                checkId = {this.props.checkId}
                                groups = {this.props.groups}
                                getTopics = {this.props.getTopics}
                            />
                        )
                    }
                })}
            </div>
        )
    }
}
export default AdminForumTopicsList;