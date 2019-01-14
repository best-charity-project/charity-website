import React, { Component } from 'react';

import AdminForumTopic from '../AdminForumTopic/AdminForumTopic';
import './AdminForumTopicsList.css';

class AdminForumTopicsList extends Component {
    state = {
        filteredTopics: []
    }

    componentDidMount() {
        const { filteredTopics } = this.props;
        if (filteredTopics.length) {
            this.setState({ filteredTopics });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { filteredTopics } = nextProps;
        if (filteredTopics.length) {
            this.setState({ filteredTopics });
        }
    }

    showTopics() {
        return this.state.filteredTopics
            .filter(item => item.group_id._id === this.props.id)
            .map(item => <AdminForumTopic
                changeMode={this.props.changeMode}
                title={item.topicTitle}
                id={item._id}
                key={item._id}
                deleteHandler={() => this.props.deleteTopic(item)}
                checkId={this.props.checkId}
                groups={this.props.groups}
                getTopics={this.props.getTopics}
                topic={item}
                showTopics={this.props.showTopics}
            />)
    }

    render() {
        return (
            <div className='forum-group-list'>
                {this.showTopics()}
            </div>
        )
    }
}
export default AdminForumTopicsList;